import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, BookOpen, Zap, Target, Award } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3">
            Claude Architect Sertifikası
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Deneme Sınavı Platformu
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <CardTitle className="text-lg">35 Soru</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                7 modülde toplam 35 senaryo tabanlı çoktan seçmeli soru
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                <CardTitle className="text-lg">Detaylı Açıklamalar</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Her soru için doğru cevabın açıklaması ve neden diğerleri yanlış
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <CardTitle className="text-lg">Sonuç Raporu</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Modül başına performans analizi ve detaylı istatistikler
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Mode Selection */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
            Başlamak İçin Bir Mod Seçin
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Practice Mode */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-500 dark:hover:border-blue-400">
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <CardTitle className="text-2xl mb-2">Pratik Modu</CardTitle>
                    <CardDescription className="text-base">
                      Kendi hızınızda çalışın
                    </CardDescription>
                  </div>
                  <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span>Modül seçerek çalışın</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span>Cevapları kontrol edin</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span>Açıklamaları okuyun</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span>Zaman sınırı yok</span>
                  </div>
                </div>
                <Button 
                  onClick={() => setLocation("/practice")}
                  className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  Pratik Moduna Başla
                </Button>
              </CardContent>
            </Card>

            {/* Timed Exam Mode */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-purple-500 dark:hover:border-purple-400">
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <CardTitle className="text-2xl mb-2">Zamanlanmış Sınav</CardTitle>
                    <CardDescription className="text-base">
                      Gerçek sınava benzer deneyim
                    </CardDescription>
                  </div>
                  <Clock className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span>120 dakikalık sınav süresi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span>Gerçek zamanlı sayaç</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span>Tüm 35 soru</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span>Otomatik sonuç raporu</span>
                  </div>
                </div>
                <Button 
                  onClick={() => setLocation("/exam")}
                  className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
                >
                  Sınava Başla
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Özellikler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Kapsamlı İçerik</h3>
                <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                  <li>• Claude API ve Temel Etkileşimler</li>
                  <li>• Araç Kullanımı ve Yapılandırılmış Çıktılar</li>
                  <li>• Claude Agent SDK ve Ajan Mimarisi</li>
                  <li>• Model Context Protocol (MCP)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Daha Fazla Modül</h3>
                <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                  <li>• Claude Code ve İş Akışları</li>
                  <li>• İleri Düzey İstem Mühendisliği</li>
                  <li>• Üretim Güvenilirliği ve İleri Konular</li>
                  <li>• Gerçek dünya senaryoları ve best practices</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
