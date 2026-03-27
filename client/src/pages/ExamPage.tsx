import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { examQuestions, modules } from "@/lib/examData";

export default function ExamPage() {
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);

  // Filter questions by selected module
  const filteredQuestions = useMemo(() => {
    if (selectedModule === null) return examQuestions;
    return examQuestions.filter(q => q.moduleId === selectedModule);
  }, [selectedModule]);

  const currentQuestion = filteredQuestions[currentQuestionIndex];
  const currentAnswer = userAnswers[currentQuestion?.id] || "";
  const isAnswered = currentAnswer !== "";
  const isCorrect = currentAnswer === currentQuestion?.correctAnswer;

  // Calculate statistics
  const stats = useMemo(() => {
    const totalQuestions = filteredQuestions.length;
    const answeredQuestions = filteredQuestions.filter(q => userAnswers[q.id]).length;
    const correctAnswers = filteredQuestions.filter(q => userAnswers[q.id] === q.correctAnswer).length;
    const percentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
    
    return { totalQuestions, answeredQuestions, correctAnswers, percentage };
  }, [filteredQuestions, userAnswers]);

  const handleAnswerChange = (value: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
    setShowExplanation(false);
  };

  const handleNext = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowExplanation(false);
    }
  };

  const handleReset = () => {
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setShowExplanation(false);
  };

  const handleModuleChange = (moduleId: number | null) => {
    setSelectedModule(moduleId);
    setCurrentQuestionIndex(0);
    setShowExplanation(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Claude Architect Sertifikası
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Deneme Sınavı Platformu
          </p>
        </div>

        {/* Module Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">Modül Seçin</CardTitle>
            <CardDescription>
              Çalışmak istediğiniz modülü seçerek başlayın veya tüm modülleri birlikte çalışın
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
              <Button
                variant={selectedModule === null ? "default" : "outline"}
                onClick={() => handleModuleChange(null)}
                className="justify-start"
              >
                Tüm Modüller ({examQuestions.length})
              </Button>
              {modules.map(module => {
                const moduleQuestionCount = examQuestions.filter(q => q.moduleId === module.id).length;
                return (
                  <Button
                    key={module.id}
                    variant={selectedModule === module.id ? "default" : "outline"}
                    onClick={() => handleModuleChange(module.id)}
                    className="justify-start text-xs"
                  >
                    Modül {module.id} ({moduleQuestionCount})
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {stats.totalQuestions}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Toplam Soru</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {stats.answeredQuestions}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Cevaplanan</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  {stats.correctAnswers}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Doğru</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {stats.percentage}%
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Başarı</div>
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
                    Soru {currentQuestionIndex + 1} / {filteredQuestions.length}
                  </CardTitle>
                </div>
                {isAnswered && (
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="text-sm font-semibold">Doğru</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
                        <XCircle className="w-5 h-5" />
                        <span className="text-sm font-semibold">Yanlış</span>
                      </div>
                    )}
                  </div>
                )}
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
                      } ${
                        isAnswered && option.value === currentQuestion.correctAnswer
                          ? "border-green-500 bg-green-50 dark:bg-green-950"
                          : ""
                      } ${
                        isAnswered && currentAnswer === option.value && !isCorrect
                          ? "border-red-500 bg-red-50 dark:bg-red-950"
                          : ""
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

              {/* Show Explanation Button */}
              {isAnswered && (
                <Button
                  variant="outline"
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="w-full"
                >
                  {showExplanation ? "Açıklamayı Gizle" : "Açıklamayı Göster"}
                </Button>
              )}

              {/* Explanation */}
              {showExplanation && isAnswered && (
                <div
                  className={`p-4 rounded-lg border-l-4 ${
                    isCorrect
                      ? "bg-green-50 dark:bg-green-950 border-green-500"
                      : "bg-yellow-50 dark:bg-yellow-950 border-yellow-500"
                  }`}
                >
                  <div className="flex gap-3">
                    <AlertCircle
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        isCorrect
                          ? "text-green-600 dark:text-green-400"
                          : "text-yellow-600 dark:text-yellow-400"
                      }`}
                    />
                    <div>
                      <p
                        className={`font-semibold mb-2 ${
                          isCorrect
                            ? "text-green-900 dark:text-green-100"
                            : "text-yellow-900 dark:text-yellow-100"
                        }`}
                      >
                        {isCorrect ? "Tebrikler! Doğru cevap." : "Yanlış cevap."}
                      </p>
                      <p
                        className={`text-sm leading-relaxed ${
                          isCorrect
                            ? "text-green-800 dark:text-green-200"
                            : "text-yellow-800 dark:text-yellow-200"
                        }`}
                      >
                        <strong>Doğru Cevap:</strong> {currentQuestion.correctAnswer}
                      </p>
                      <p
                        className={`text-sm leading-relaxed mt-2 ${
                          isCorrect
                            ? "text-green-800 dark:text-green-200"
                            : "text-yellow-800 dark:text-yellow-200"
                        }`}
                      >
                        <strong>Açıklama:</strong> {currentQuestion.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Önceki
          </Button>

          <Button
            variant="outline"
            onClick={handleReset}
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Sıfırla
          </Button>

          <Button
            onClick={handleNext}
            disabled={currentQuestionIndex === filteredQuestions.length - 1}
            className="gap-2"
          >
            Sonraki
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Question Progress */}
        <div className="mt-6 text-center">
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div
              className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / filteredQuestions.length) * 100}%`
              }}
            />
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            {currentQuestionIndex + 1} / {filteredQuestions.length}
          </p>
        </div>
      </div>
    </div>
  );
}
