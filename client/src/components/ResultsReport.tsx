import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Download, RotateCcw, CheckCircle2, XCircle, AlertCircle, TrendingUp } from "lucide-react";
import { modules } from "@/lib/examData";

interface ModuleStats {
  moduleName: string;
  total: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  percentage: number;
}

interface ExamStats {
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unansweredQuestions: number;
  percentage: number;
  timeSpent: number;
  timeRemaining: number;
  moduleStats: Record<number, ModuleStats>;
}

interface ResultsReportProps {
  stats: ExamStats;
  onRestart: () => void;
}

export default function ResultsReport({ stats, onRestart }: ResultsReportProps) {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getPerformanceLevel = (percentage: number) => {
    if (percentage >= 80) return { level: "Mükemmel", color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-950" };
    if (percentage >= 70) return { level: "İyi", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-950" };
    if (percentage >= 60) return { level: "Orta", color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-50 dark:bg-yellow-950" };
    return { level: "Geliştirilmesi Gerekli", color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-950" };
  };

  const performance = getPerformanceLevel(stats.percentage);

  const generatePDF = () => {
    // Create a simple text-based report that can be printed as PDF
    const reportContent = `
CLAUDE ARCHITECT SERTİFİKASI
DENEME SINAVI SONUÇ RAPORU
${'='.repeat(50)}

GENEL SONUÇLAR
${'='.repeat(50)}
Başarı Oranı: ${stats.percentage}%
Doğru Cevaplar: ${stats.correctAnswers}/${stats.totalQuestions}
Yanlış Cevaplar: ${stats.incorrectAnswers}
Cevaplandırılmayan: ${stats.unansweredQuestions}

ZAMAN BİLGİSİ
${'='.repeat(50)}
Harcanan Zaman: ${formatTime(stats.timeSpent)}
Kalan Zaman: ${formatTime(stats.timeRemaining)}

MODÜL BAŞINA PERFORMANS
${'='.repeat(50)}
${modules.map(module => {
  const moduleData = stats.moduleStats[module.id];
  return `
${module.name}
  Başarı: ${moduleData.percentage}%
  Doğru: ${moduleData.correct}/${moduleData.total}
  Yanlış: ${moduleData.incorrect}
  Cevaplandırılmayan: ${moduleData.unanswered}
`;
}).join('')}

PERFORMANS DEĞERLENDİRMESİ
${'='.repeat(50)}
Seviye: ${performance.level}
${stats.percentage >= 80 ? "Tebrikler! Sınava hazırsınız." : "Daha fazla çalışma önerilir."}

Rapor Tarihi: ${new Date().toLocaleString('tr-TR')}
    `;

    // Create a blob and download
    const element = document.createElement('a');
    const file = new Blob([reportContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `claude-architect-exam-report-${new Date().getTime()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Sınav Tamamlandı
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Sonuç Raporu
          </p>
        </div>

        {/* Overall Score Card */}
        <Card className={`mb-6 border-2 ${performance.color.replace('text-', 'border-')}`}>
          <CardContent className={`pt-8 ${performance.bg}`}>
            <div className="text-center">
              <div className={`text-6xl font-bold ${performance.color} mb-2`}>
                {stats.percentage}%
              </div>
              <div className={`text-2xl font-semibold ${performance.color} mb-4`}>
                {performance.level}
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                {stats.percentage >= 80 
                  ? "Tebrikler! Claude Architect sertifikası almaya hazırsınız."
                  : stats.percentage >= 70
                  ? "İyi performans! Bazı konuları daha çalışmanız önerilir."
                  : "Daha fazla çalışma yapmanız önerilir."}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stats.correctAnswers}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Doğru</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stats.incorrectAnswers}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Yanlış</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stats.unansweredQuestions}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Cevaplandırılmayan</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stats.answeredQuestions}/{stats.totalQuestions}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Cevaplanan</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Module Performance */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Modül Başına Performans</CardTitle>
            <CardDescription>Her modülde ne kadar başarılı olduğunuzu görmek için aşağıya bakın</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {modules.map(module => {
              const moduleData = stats.moduleStats[module.id];
              const isStrong = moduleData.percentage >= 80;
              
              return (
                <div key={module.id}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {module.name}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        {moduleData.correct}/{moduleData.total} doğru
                      </p>
                    </div>
                    <Badge variant={isStrong ? "default" : "secondary"}>
                      {moduleData.percentage}%
                    </Badge>
                  </div>
                  <Progress value={moduleData.percentage} className="h-2" />
                  <div className="flex gap-4 text-xs text-slate-600 dark:text-slate-400 mt-1">
                    <span>✓ {moduleData.correct}</span>
                    <span>✗ {moduleData.incorrect}</span>
                    <span>○ {moduleData.unanswered}</span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Time Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Zaman Bilgisi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Harcanan Zaman</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {formatTime(stats.timeSpent)}
                </p>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Kalan Zaman</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {formatTime(stats.timeRemaining)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Öneriler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.percentage >= 80 ? (
                <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <p className="text-sm text-green-900 dark:text-green-100">
                    <strong>Tebrikler!</strong> Sertifikasyon sınavına hazırsınız. Resmi sınava katılmak için başvuru yapabilirsiniz.
                  </p>
                </div>
              ) : stats.percentage >= 70 ? (
                <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <p className="text-sm text-blue-900 dark:text-blue-100">
                    <strong>İyi Performans!</strong> Daha düşük puan alan modülleri tekrar çalışmanız önerilir.
                  </p>
                </div>
              ) : (
                <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <p className="text-sm text-yellow-900 dark:text-yellow-100">
                    <strong>Geliştirilmesi Gerekli:</strong> Eğitim materyalini tekrar gözden geçirin ve zayıf olan modüllere odaklanın.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4 flex-col sm:flex-row">
          <Button onClick={generatePDF} variant="outline" className="gap-2 flex-1">
            <Download className="w-4 h-4" />
            Raporu İndir
          </Button>
          <Button onClick={onRestart} className="gap-2 flex-1">
            <RotateCcw className="w-4 h-4" />
            Yeniden Başla
          </Button>
        </div>
      </div>
    </div>
  );
}
