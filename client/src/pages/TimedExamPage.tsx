import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertCircle, Clock, ChevronRight, AlertTriangle } from "lucide-react";
import { examQuestions, modules } from "@/lib/examData";
import { useExam } from "@/contexts/ExamContext";
import ResultsReport from "@/components/ResultsReport";

export default function TimedExamPage() {
  const { isExamMode, startExam, endExam, timeRemaining, isTimeUp, userAnswers, setUserAnswers } = useExam();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showStartDialog, setShowStartDialog] = useState(!isExamMode);
  const [showEndDialog, setShowEndDialog] = useState(false);
  const [showTimeWarning, setShowTimeWarning] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);

  // Format time for display
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Show warning when 10 minutes remain
  useEffect(() => {
    if (isExamMode && timeRemaining === 600 && !showTimeWarning) {
      setShowTimeWarning(true);
      setTimeout(() => setShowTimeWarning(false), 5000);
    }
  }, [timeRemaining, isExamMode, showTimeWarning]);

  // Auto-end exam when time is up
  useEffect(() => {
    if (isTimeUp && isExamMode) {
      endExam();
      setExamCompleted(true);
    }
  }, [isTimeUp, isExamMode, endExam]);

  const handleStartExam = () => {
    startExam();
    setShowStartDialog(false);
  };

  const handleEndExam = () => {
    endExam();
    setExamCompleted(true);
    setShowEndDialog(false);
  };

  const currentQuestion = examQuestions[currentQuestionIndex];
  const currentAnswer = userAnswers[currentQuestion?.id] || "";

  // Calculate exam statistics
  const examStats = useMemo(() => {
    const totalQuestions = examQuestions.length;
    const answeredQuestions = examQuestions.filter(q => userAnswers[q.id]).length;
    const correctAnswers = examQuestions.filter(q => userAnswers[q.id] === q.correctAnswer).length;
    const incorrectAnswers = answeredQuestions - correctAnswers;
    const unansweredQuestions = totalQuestions - answeredQuestions;
    const percentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

    // Module-specific stats
    const moduleStats: Record<number, any> = {};
    modules.forEach(module => {
      const moduleQuestions = examQuestions.filter(q => q.moduleId === module.id);
      const moduleAnswered = moduleQuestions.filter(q => userAnswers[q.id]).length;
      const moduleCorrect = moduleQuestions.filter(q => userAnswers[q.id] === q.correctAnswer).length;
      const moduleIncorrect = moduleAnswered - moduleCorrect;
      const moduleUnanswered = moduleQuestions.length - moduleAnswered;
      const modulePercentage = moduleQuestions.length > 0 ? Math.round((moduleCorrect / moduleQuestions.length) * 100) : 0;

      moduleStats[module.id] = {
        moduleName: module.name,
        total: moduleQuestions.length,
        correct: moduleCorrect,
        incorrect: moduleIncorrect,
        unanswered: moduleUnanswered,
        percentage: modulePercentage
      };
    });

    return {
      totalQuestions,
      answeredQuestions,
      correctAnswers,
      incorrectAnswers,
      unansweredQuestions,
      percentage,
      timeSpent: (120 * 60) - timeRemaining,
      timeRemaining,
      moduleStats
    };
  }, [userAnswers, timeRemaining]);

  const handleAnswerChange = (value: string) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestion.id]: value
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < examQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Show results report if exam is completed
  if (examCompleted) {
    return <ResultsReport stats={examStats} onRestart={() => {
      setExamCompleted(false);
      setCurrentQuestionIndex(0);
      setShowStartDialog(true);
    }} />;
  }

  // Show start dialog
  if (showStartDialog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4">
        <Dialog open={showStartDialog} onOpenChange={setShowStartDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl">Sınava Başlamaya Hazır mısınız?</DialogTitle>
              <DialogDescription className="text-base mt-2">
                Claude Architect Sertifikası Deneme Sınavı
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900 dark:text-blue-100">
                    <p className="font-semibold mb-1">Sınav Kuralları:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Toplam 35 soru vardır</li>
                      <li>Sınav süresi 120 dakikadır</li>
                      <li>Sınavı başladıktan sonra modül seçimi yapılamaz</li>
                      <li>Tüm sorular cevaplandırılmalıdır</li>
                      <li>Sınav bitiminde otomatik sonuç raporu oluşturulur</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowStartDialog(false)} className="flex-1">
                İptal Et
              </Button>
              <Button onClick={handleStartExam} className="flex-1 gap-2">
                Sınava Başla
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with Timer */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Claude Architect Sertifikası
            </h1>
            <p className="text-slate-600 dark:text-slate-300">Zamanlanmış Deneme Sınavı</p>
          </div>
          <div className={`flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-lg font-bold ${
            timeRemaining < 600 
              ? "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 border-2 border-red-500"
              : "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white"
          }`}>
            <Clock className="w-5 h-5" />
            {formatTime(timeRemaining)}
          </div>
        </div>

        {/* Time Warning */}
        {showTimeWarning && (
          <div className="mb-4 p-4 bg-yellow-100 dark:bg-yellow-950 border-l-4 border-yellow-500 rounded flex gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-yellow-900 dark:text-yellow-100">Zaman Uyarısı</p>
              <p className="text-sm text-yellow-800 dark:text-yellow-200">Sınavınızda 10 dakika kaldı!</p>
            </div>
          </div>
        )}

        {/* Progress Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {currentQuestionIndex + 1}/{examQuestions.length}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Soru</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {examStats.answeredQuestions}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Cevaplanan</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {examStats.correctAnswers}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Doğru</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {examStats.percentage}%
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Başarı</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Question Card */}
        {currentQuestion && (
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {currentQuestion.moduleName}
                  </Badge>
                  <CardTitle className="text-lg">
                    Soru {currentQuestionIndex + 1}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Question Text */}
              <div>
                <p className="text-base font-medium text-slate-900 dark:text-white mb-4">
                  {currentQuestion.question}
                </p>
              </div>

              {/* Answer Options */}
              <RadioGroup value={currentAnswer} onValueChange={handleAnswerChange}>
                <div className="space-y-3">
                  {currentQuestion.options.map((option, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-all cursor-pointer ${
                        currentAnswer === option.value
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                          : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                      }`}
                    >
                      <RadioGroupItem value={option.value} id={`option-${idx}`} />
                      <Label
                        htmlFor={`option-${idx}`}
                        className="flex-1 cursor-pointer font-medium text-slate-900 dark:text-white"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Önceki
          </Button>

          <Button
            variant="destructive"
            onClick={() => setShowEndDialog(true)}
          >
            Sınavı Bitir
          </Button>

          <Button
            onClick={handleNext}
            disabled={currentQuestionIndex === examQuestions.length - 1}
          >
            Sonraki
          </Button>
        </div>

        {/* Question Progress */}
        <div className="mt-6">
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div
              className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / examQuestions.length) * 100}%`
              }}
            />
          </div>
        </div>
      </div>

      {/* End Exam Dialog */}
      <Dialog open={showEndDialog} onOpenChange={setShowEndDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sınavı Bitirmek İstiyor musunuz?</DialogTitle>
            <DialogDescription>
              Bu işlem geri alınamaz. Sınav sonlandırılacak ve sonuç raporu oluşturulacaktır.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 text-sm text-amber-900 dark:text-amber-100">
            <p className="font-semibold mb-1">Cevaplandırılmayan Sorular:</p>
            <p>{examStats.unansweredQuestions} soru henüz cevaplandırılmamıştır.</p>
          </div>
          <div className="flex gap-3 mt-6">
            <Button variant="outline" onClick={() => setShowEndDialog(false)} className="flex-1">
              Devam Et
            </Button>
            <Button variant="destructive" onClick={handleEndExam} className="flex-1">
              Sınavı Bitir
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
