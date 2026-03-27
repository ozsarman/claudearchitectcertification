export interface ExamQuestion {
  id: string;
  moduleId: number;
  moduleName: string;
  questionNumber: number;
  question: string;
  options: {
    label: string;
    value: string;
  }[];
  correctAnswer: string;
  explanation: string;
}

export const examQuestions: ExamQuestion[] = [
  // Module 1
  {
    id: "1.1",
    moduleId: 1,
    moduleName: "Claude API ve Temel Etkileşimler",
    questionNumber: 1,
    question: "Claude Messages API'nin durumsuz (stateless) yapısı göz önüne alındığında, çok turlu bir sohbet uygulamasında bağlamı korumak için aşağıdakilerden hangisi yapılmalıdır?",
    options: [
      { label: "Her istekte sadece kullanıcının son mesajı gönderilmelidir.", value: "A" },
      { label: "Her istekte tüm konuşma geçmişi (messages dizisi) API'ye yeniden gönderilmelidir.", value: "B" },
      { label: "API'nin `session_id` parametresi kullanılarak önceki oturum çağrılmalıdır.", value: "C" },
      { label: "Sistem istemine (system prompt) \"önceki mesajları hatırla\" talimatı eklenmelidir.", value: "D" }
    ],
    correctAnswer: "B",
    explanation: "Claude Messages API durumsuzdur (stateless), yani sunucu tarafında önceki konuşmaları hatırlamaz. Bu nedenle, bağlamı korumak için her yeni API isteğinde tüm konuşma geçmişi (kullanıcı ve asistan mesajları sırasıyla) `messages` dizisi içinde yeniden gönderilmelidir. API'de yerleşik bir `session_id` parametresi yoktur (C yanlış)."
  },
  {
    id: "1.2",
    moduleId: 1,
    moduleName: "Claude API ve Temel Etkileşimler",
    questionNumber: 2,
    question: "Bir ajan döngüsünde (agentic loop), modelin görevini tamamladığını ve kullanıcıya nihai yanıtı vermeye hazır olduğunu gösteren en güvenilir sinyal nedir?",
    options: [
      { label: "Modelin yanıt metninde \"İşlem tamamlandı\" veya \"İşte sonucunuz\" yazması.", value: "A" },
      { label: "Yanıttaki `stop_reason` alanının `\"end_turn\"` değerini alması.", value: "B" },
      { label: "Yanıttaki `stop_reason` alanının `\"tool_use\"` değerini alması.", value: "C" },
      { label: "Döngünün önceden belirlenmiş maksimum iterasyon sayısına (örn. 5) ulaşması.", value: "D" }
    ],
    correctAnswer: "B",
    explanation: "Ajan döngüsünde modelin bir sonraki adımına `stop_reason` karar verir. Eğer `stop_reason` `\"tool_use\"` ise model bir araç çağırmak istiyordur ve döngü devam etmelidir. Eğer `\"end_turn\"` ise, modelin araç kullanımı bitmiş ve kullanıcıya nihai metin yanıtını üretmiştir; bu, döngünün başarıyla sonlandığını gösterir."
  },
  {
    id: "1.3",
    moduleId: 1,
    moduleName: "Claude API ve Temel Etkileşimler",
    questionNumber: 3,
    question: "Sistem isteminde (system prompt) yer alan \"Her zaman müşterinin kimliğini doğrula\" gibi kesin bir talimatın, modelin araç (tool) kullanımı üzerindeki en olası yan etkisi nedir?",
    options: [
      { label: "Modelin daha hızlı yanıt vermesini sağlar.", value: "A" },
      { label: "Modelin `get_customer` gibi doğrulama araçlarını gereksiz yere ve sürekli çağırmasına (overuse) neden olabilir.", value: "B" },
      { label: "Modelin araç kullanma yeteneğini tamamen kapatır.", value: "C" },
      { label: "Modelin JSON formatında çıktı vermesini engeller.", value: "D" }
    ],
    correctAnswer: "B",
    explanation: "\"Her zaman\" gibi kesin ve kısıtlayıcı ifadeler, modelin aşırı telafi (overcompensation) yapmasına neden olabilir. Model, zaten doğrulanmış bir müşteri için bile her adımda tekrar doğrulama aracı çağırma eğilimine girebilir (overuse). Bunun yerine \"Kimliği doğrulanmamışsa doğrula\" gibi koşullu talimatlar verilmelidir."
  },
  {
    id: "1.4",
    moduleId: 1,
    moduleName: "Claude API ve Temel Etkileşimler",
    questionNumber: 4,
    question: "Uzun bir belgeyi analiz ederken modelin belgenin ortasındaki kritik bilgileri gözden kaçırması (\"lost-in-the-middle\" etkisi) riskini azaltmak için en iyi mimari yaklaşım hangisidir?",
    options: [
      { label: "En önemli talimatları ve kilit bulguları istemin en başına veya en sonuna yerleştirmek.", value: "A" },
      { label: "Belgeyi her zaman alfabetik sıraya göre sıralamak.", value: "B" },
      { label: "`max_tokens` değerini düşürerek modelin daha kısa yanıt vermesini sağlamak.", value: "C" },
      { label: "Sistem istemini tamamen boş bırakmak.", value: "D" }
    ],
    correctAnswer: "A",
    explanation: "Büyük dil modelleri, çok uzun bağlamlarda (context window) metnin en başındaki ve en sonundaki bilgileri daha iyi hatırlar, ortadaki bilgileri ise gözden kaçırabilir (lost-in-the-middle). Bu nedenle kritik talimatlar, şemalar veya sorular istemin en sonuna (belgeden sonra) eklenmelidir."
  },
  {
    id: "1.5",
    moduleId: 1,
    moduleName: "Claude API ve Temel Etkileşimler",
    questionNumber: 5,
    question: "Çok uzun süren bir ajan oturumunda bağlam penceresinin (context window) dolmasını önlemek için geçmişi özetleme (progressive summarization) yöntemi kullanıldığında karşılaşılan en büyük risk nedir?",
    options: [
      { label: "Modelin API anahtarını unutması.", value: "A" },
      { label: "Kesin tarihlerin, sayısal değerlerin ve spesifik detayların kaybolarak muğlak ifadelere (örn. \"geçen ay\", \"yaklaşık\") dönüşmesi.", value: "B" },
      { label: "Modelin dilinin aniden İngilizce'den başka bir dile geçmesi.", value: "C" },
      { label: "`stop_reason` alanının kaybolması.", value: "D" }
    ],
    correctAnswer: "B",
    explanation: "Geçmişi özetleme, token tasarrufu sağlasa da \"kayıplı bir sıkıştırma\" (lossy compression) yöntemidir. Model özet yaparken \"15 Mart 2026'da 1450 TL iade yapıldı\" bilgisini \"Geçen ay bir iade yapıldı\" şeklinde yuvarlayabilir. Bu da ilerleyen adımlarda kesin verilere ihtiyaç duyulduğunda hatalara yol açar."
  },

  // Module 2
  {
    id: "2.1",
    moduleId: 2,
    moduleName: "Araç Kullanımı (Tool Use) ve Yapılandırılmış Çıktılar",
    questionNumber: 1,
    question: "Bir aracın (tool) açıklama (description) alanını yazarken aşağıdakilerden hangisi bir \"anti-kalıp\" (anti-pattern) olarak kabul edilir?",
    options: [
      { label: "Aracın ne yaptığını ve ne döndürdüğünü detaylıca açıklamak.", value: "A" },
      { label: "Girdi formatları için örnek değerler sunmak.", value: "B" },
      { label: "\"Veritabanında arama yapar\" gibi çok kısa ve genel bir açıklama yazmak.", value: "C" },
      { label: "Aracın hangi durumlarda benzer diğer araçlara tercih edilmesi gerektiğini belirtmek.", value: "D" }
    ],
    correctAnswer: "C",
    explanation: "Model, hangi aracı ne zaman çağıracağına sadece aracın `description` (açıklama) alanına bakarak karar verir. Çok kısa ve genel açıklamalar, modelin aracı yanlış bağlamda kullanmasına veya hiç kullanmamasına neden olur. Açıklamalar detaylı olmalı, ne zaman kullanılacağı ve ne döndüreceği net belirtilmelidir."
  },
  {
    id: "2.2",
    moduleId: 2,
    moduleName: "Araç Kullanımı (Tool Use) ve Yapılandırılmış Çıktılar",
    questionNumber: 2,
    question: "Modelden kesinlikle geçerli bir JSON çıktısı almanız gerekiyor ve metin yanıtı vermesini istemiyorsunuz. API isteğinde `tool_choice` parametresini nasıl ayarlamalısınız?",
    options: [
      { label: "`{\"type\": \"auto\"}`", value: "A" },
      { label: "`{\"type\": \"none\"}`", value: "B" },
      { label: "`{\"type\": \"any\"}` veya `{\"type\": \"tool\", \"name\": \"istenen_arac\"}`", value: "C" },
      { label: "`{\"type\": \"json_only\"}`", value: "D" }
    ],
    correctAnswer: "C",
    explanation: "Modelin serbest metin üretmesini engelleyip kesinlikle bir araç çağırmasını (ve dolayısıyla JSON üretmesini) zorlamak için `tool_choice` parametresi `\"any\"` (herhangi bir aracı seçmeye zorla) veya spesifik bir araç adı verilerek `\"tool\"` olarak ayarlanmalıdır. `\"auto\"` modelin inisiyatifine bırakır."
  },
  {
    id: "2.3",
    moduleId: 2,
    moduleName: "Araç Kullanımı (Tool Use) ve Yapılandırılmış Çıktılar",
    questionNumber: 3,
    question: "Bir JSON şeması tasarlarken, belgede bulunmama ihtimali olan bir bilgi alanı için en iyi yaklaşım nedir?",
    options: [
      { label: "Alanı `required` (zorunlu) olarak işaretleyip modelin bir değer tahmin etmesini beklemek.", value: "A" },
      { label: "Alanın tipini `[\"string\", \"null\"]` olarak ayarlayıp `required` listesine eklememek.", value: "B" },
      { label: "Alanı şemadan tamamen çıkarmak.", value: "C" },
      { label: "Alanı `required` yapıp varsayılan değer olarak \"Bilinmiyor\" atamak.", value: "D" }
    ],
    correctAnswer: "B",
    explanation: "Eğer bir bilgi belgede yoksa, modeli tahmine (halüsinasyona) zorlamamak gerekir. Alanı opsiyonel yapmak (required listesine eklememek) ve tipini `null` kabul edecek şekilde ayarlamak en güvenli yoldur. Böylece model bilgi yoksa alanı boş bırakabilir."
  },
  {
    id: "2.4",
    moduleId: 2,
    moduleName: "Araç Kullanımı (Tool Use) ve Yapılandırılmış Çıktılar",
    questionNumber: 4,
    question: "Modelin ürettiği JSON sentaks olarak geçerli (geçerli parantezler, doğru tipler) ancak anlamsal olarak yanlışsa (örn. toplam tutar yanlış hesaplanmışsa), bu durumu çözmek için en iyi yöntem nedir?",
    options: [
      { label: "İsteme \"Lütfen matematiği doğru yap\" yazıp aynı isteği tekrar göndermek.", value: "A" },
      { label: "Uygulama katmanında (örn. Pydantic ile) hatayı yakalayıp, modele orijinal belgeyi, hatalı JSON'u ve spesifik hata mesajını göndererek \"geri bildirimle yeniden deneme\" (retry-with-feedback) döngüsü kurmak.", value: "B" },
      { label: "Modelin sıcaklık (temperature) değerini artırmak.", value: "C" },
      { label: "`tool_choice` parametresini `\"auto\"` olarak değiştirmek.", value: "D" }
    ],
    correctAnswer: "B",
    explanation: "Anlamsal hatalar (iş kurallarına uymayan veriler) sadece istem mühendisliği ile çözülemez. En iyi yöntem, uygulama katmanında veriyi doğrulamak, hata varsa modele \"Şu JSON'u ürettin ama şu kuralı ihlal ettin, lütfen düzelt\" şeklinde geri bildirim vererek yeniden denemesini sağlamaktır."
  },
  {
    id: "2.5",
    moduleId: 2,
    moduleName: "Araç Kullanımı (Tool Use) ve Yapılandırılmış Çıktılar",
    questionNumber: 5,
    question: "Kategorizasyon yapan bir araç şemasında `enum` kullanırken, modelin beklenmedik durumlarla karşılaştığında hata yapmasını veya halüsinasyon görmesini engellemek için şemaya ne eklenmelidir?",
    options: [
      { label: "Sadece en yaygın 3 kategoriyi içeren dar bir `enum` listesi.", value: "A" },
      { label: "`enum` listesine `\"other\"` (diğer) veya `\"unclear\"` (belirsiz) gibi kaçış seçenekleri.", value: "B" },
      { label: "`enum` yerine serbest metin (`string`) alanı.", value: "C" },
      { label: "`max_tokens` sınırını 10'a düşürmek.", value: "D" }
    ],
    correctAnswer: "B",
    explanation: "Model, verilen metni mevcut `enum` seçeneklerinden hiçbirine uyduramazsa, en yakın (ama yanlış) seçeneği zorlayabilir. `\"other\"` veya `\"unclear\"` gibi bir kaçış kapağı (escape hatch) eklemek, modelin emin olmadığı durumlarda yanlış veri üretmesini engeller ve bu kayıtların insanlar tarafından incelenmesini sağlar."
  },

  // Module 3
  {
    id: "3.1",
    moduleId: 3,
    moduleName: "Claude Agent SDK ve Ajan Mimarisi",
    questionNumber: 1,
    question: "Hub-and-Spoke (Merkez ve Uçlar) çoklu ajan mimarisinde, bir alt ajanın (subagent) görevini yapabilmesi için gereken bağlamı (context) nasıl elde etmesi beklenir?",
    options: [
      { label: "Koordinatör ajanın tüm bellek geçmişini otomatik olarak okuyarak.", value: "A" },
      { label: "Koordinatör ajanın, alt ajanı çağırırken gereken tüm bilgileri açıkça (explicitly) istemin içine eklemesiyle.", value: "B" },
      { label: "Alt ajanın kendi başına veritabanına bağlanıp eksik bilgileri çekmesiyle.", value: "C" },
      { label: "Alt ajanların kendi aralarında doğrudan mesajlaşmasıyla.", value: "D" }
    ],
    correctAnswer: "B",
    explanation: "Hub-and-Spoke mimarisinde alt ajanlar izole çalışır ve koordinatörün geçmişini otomatik olarak miras almazlar. Bu, bağlam penceresini temiz tutmak için gereklidir. Koordinatör, alt ajanı çağırırken (bir araç üzerinden), alt ajanın işini yapması için gereken spesifik bilgileri parametre olarak açıkça geçmelidir."
  },
  {
    id: "3.2",
    moduleId: 3,
    moduleName: "Claude Agent SDK ve Ajan Mimarisi",
    questionNumber: 2,
    question: "Bir e-ticaret uygulamasında, 1000 TL üzerindeki iadelerin otonom olarak yapılmasını engellemek ve işlemi bir insana devretmek istiyorsunuz. Bu kuralı en güvenilir şekilde nasıl uygularsınız?",
    options: [
      { label: "Sistem istemine \"1000 TL üzerindeki iadeleri yapma\" yazarak.", value: "A" },
      { label: "`PostToolUse` kancası (hook) kullanarak işlem yapıldıktan sonra sonucu iptal ederek.", value: "B" },
      { label: "`PreToolUse` kancası kullanarak araç çağrısını çalışmadan önce durdurup yönlendirerek.", value: "C" },
      { label: "Modelin `temperature` değerini 0 yaparak.", value: "D" }
    ],
    correctAnswer: "C",
    explanation: "Finansal veya yasal risk taşıyan kurallar asla sadece istemlere (prompt) bırakılmamalıdır, çünkü modeller talimatları ihlal edebilir. `PreToolUse` kancası, model iade aracını çağırdığında araya girer, tutarı kontrol eder ve eğer 1000 TL üzerindeyse aracın çalışmasını engelleyerek deterministik (kesin) bir güvenlik sağlar."
  },
  {
    id: "3.3",
    moduleId: 3,
    moduleName: "Claude Agent SDK ve Ajan Mimarisi",
    questionNumber: 3,
    question: "Bir veritabanı sorgusu aracı 50 farklı alan (field) döndürüyor, ancak modelin o anki görevi için sadece 3 alana ihtiyacı var. Bağlam penceresini (context window) korumak için en iyi yaklaşım nedir?",
    options: [
      { label: "Veritabanı şemasını değiştirmek.", value: "A" },
      { label: "`PostToolUse` kancası kullanarak araç sonucunu filtrelemek (trimming) ve modele sadece gerekli 3 alanı döndürmek.", value: "B" },
      { label: "Modelden 50 alanın tamamını okuyup kendisinin özetlemesini istemek.", value: "C" },
      { label: "`max_tokens` sınırını artırmak.", value: "D" }
    ],
    correctAnswer: "B",
    explanation: "Araçların döndürdüğü devasa veriler bağlam penceresini hızla doldurur. `PostToolUse` kancası, araç çalıştıktan sonra ancak sonuç modele gönderilmeden önce devreye girer. Bu aşamada veriyi filtreleyip (trimming) sadece gerekli alanları modele sunmak, token tasarrufu sağlar ve modelin odaklanmasını kolaylaştırır."
  },
  {
    id: "3.4",
    moduleId: 3,
    moduleName: "Claude Agent SDK ve Ajan Mimarisi",
    questionNumber: 4,
    question: "Ajan döngüsünde (agentic loop) \"Model Güdümlü\" (Model-driven) yaklaşım ne anlama gelir?",
    options: [
      { label: "Hangi aracın hangi sırayla çağrılacağına önceden yazılmış if/else bloklarının karar vermesi.", value: "A" },
      { label: "Modelin, mevcut bağlama ve önceki araç sonuçlarına bakarak bir sonraki adımda hangi aracı çağıracağına veya işlemi bitireceğine kendisinin karar vermesi.", value: "B" },
      { label: "Modelin sadece kullanıcıya metin yanıtı vermesi, araçları kullanıcının manuel olarak çalıştırması.", value: "C" },
      { label: "Tüm araçların aynı anda paralel olarak çalıştırılması.", value: "D" }
    ],
    correctAnswer: "B",
    explanation: "Model güdümlü yaklaşımda, katı bir karar ağacı (decision tree) yoktur. Model, kendisine verilen araç listesini ve o anki durumu analiz eder, bir araç çağırır, sonucunu okur ve bu sonuca göre bir sonraki aracı çağırmaya veya görevi sonlandırmaya tamamen otonom olarak karar verir."
  },
  {
    id: "3.5",
    moduleId: 3,
    moduleName: "Claude Agent SDK ve Ajan Mimarisi",
    questionNumber: 5,
    question: "Uzun süren bir kod inceleme görevinde, farklı bir çözüm yaklaşımını denemek istiyorsunuz ancak mevcut bağlamı da kaybetmek istemiyorsunuz. Claude Agent SDK'da hangi özellik kullanılmalıdır?",
    options: [
      { label: "`--resume` komutu ile baştan başlamak.", value: "A" },
      { label: "`fork_session` (oturumu çatallama) ile mevcut bağlamdan bağımsız yeni bir dal oluşturmak.", value: "B" },
      { label: "`PreToolUse` kancası ile oturumu silmek.", value: "C" },
      { label: "`tool_choice` değerini `\"none\"` yapmak.", value: "D" }
    ],
    correctAnswer: "B",
    explanation: "`fork_session` (oturumu çatallama), mevcut konuşma geçmişinin tam bir kopyasını alarak yeni ve bağımsız bir oturum oluşturur. Böylece ana oturumun bağlamını bozmadan (kirletmeden) farklı bir yaklaşımı veya aracı test edebilirsiniz. Git'teki branch (dal) mantığına benzer."
  },

  // Module 4
  {
    id: "4.1",
    moduleId: 4,
    moduleName: "Model Context Protocol (MCP)",
    questionNumber: 1,
    question: "MCP mimarisinde \"Araçlar\" (Tools) ve \"Kaynaklar\" (Resources) arasındaki temel fark nedir?",
    options: [
      { label: "Araçlar sadece Python ile yazılır, Kaynaklar ise JSON formatındadır.", value: "A" },
      { label: "Araçlar modelin dış dünyada bir eylem (örn. API çağrısı) gerçekleştirmesini sağlar; Kaynaklar ise modelin eylem yapmadan okuyabileceği salt okunur bağlam verileridir.", value: "B" },
      { label: "Araçlar ücretsizdir, Kaynaklar ise token tüketir.", value: "C" },
      { label: "Araçlar yerel makinede, Kaynaklar bulutta çalışır.", value: "D" }
    ],
    correctAnswer: "B",
    explanation: "MCP'de Araçlar (Tools), modelin inisiyatifiyle çağrılan ve dış dünyada bir durumu değiştiren (veya veri çeken) fonksiyonlardır. Kaynaklar (Resources) ise modelin eylem yapmasına gerek kalmadan doğrudan okuyabileceği, API dokümantasyonu veya veritabanı şeması gibi salt okunur (read-only) verilerdir."
  },
  {
    id: "4.2",
    moduleId: 4,
    moduleName: "Model Context Protocol (MCP)",
    questionNumber: 2,
    question: "Bir geliştirme ekibinin tamamının aynı Jira ve GitHub MCP sunucularını kullanmasını sağlamak için yapılandırma dosyası nereye yerleştirilmelidir?",
    options: [
      { label: "Her geliştiricinin kendi `~/.claude.json` dosyasına.", value: "A" },
      { label: "İşletim sisteminin `/etc/mcp/` dizinine.", value: "B" },
      { label: "Projenin kök dizinindeki `.mcp.json` dosyasına (versiyon kontrolüne dahil edilerek).", value: "C" },
      { label: "`CLAUDE.md` dosyasının içine.", value: "D" }
    ],
    correctAnswer: "C",
    explanation: "Ekip çalışmasında tutarlılığı sağlamak için MCP sunucu yapılandırmaları proje düzeyinde yapılmalıdır. Projenin kök dizinindeki `.mcp.json` dosyası Git gibi bir versiyon kontrol sistemine dahil edildiğinde, projeyi klonlayan her geliştirici otomatik olarak aynı araçlara sahip olur. `~/.claude.json` sadece kişisel/yerel kullanım içindir."
  },
  {
    id: "4.3",
    moduleId: 4,
    moduleName: "Model Context Protocol (MCP)",
    questionNumber: 3,
    question: "Bir MCP aracı çalışırken hata ile karşılaştığında, ajanın doğru aksiyonu alabilmesi için döndürülmesi gereken yapılandırılmış hata mesajında (isError: true) aşağıdakilerden hangisinin bulunması en faydalıdır?",
    options: [
      { label: "Sadece \"İşlem başarısız oldu\" yazan genel bir metin.", value: "A" },
      { label: "Hata türü (örn. geçici, yetki), denenen sorgu, yeniden denenebilir olup olmadığı ve alternatif yaklaşımlar.", value: "B" },
      { label: "Hataya neden olan kodun tam bellek dökümü (memory dump).", value: "C" },
      { label: "Koordinatörün çalışmasını durduracak bir `exit(1)` komutu.", value: "D" }
    ],
    correctAnswer: "B",
    explanation: "Ajanın bir hatadan kurtulabilmesi (recovery) için hatanın nedenini anlaması gerekir. Sadece \"başarısız\" demek ajana yol göstermez. Yapılandırılmış bir hata mesajı; hatanın türünü, yeniden denemenin mantıklı olup olmadığını ve ajanın deneyebileceği alternatif yolları içermelidir."
  },
  {
    id: "4.4",
    moduleId: 4,
    moduleName: "Model Context Protocol (MCP)",
    questionNumber: 4,
    question: "MCP'de \"Kaynaklar\" (Resources) kullanılmasının ajana sağladığı en büyük avantaj nedir?",
    options: [
      { label: "Ajanın internete bağlanmasını engellemesi.", value: "A" },
      { label: "Ajanın ne tür veriler olduğunu anlamak için deneme-yanılma amaçlı araç çağrıları yapmasına gerek bırakmadan doğrudan bir \"harita\" sunması.", value: "B" },
      { label: "Ajanın kod yazma hızını iki katına çıkarması.", value: "C" },
      { label: "Token maliyetlerini sıfıra indirmesi.", value: "D" }
    ],
    correctAnswer: "B",
    explanation: "Kaynaklar (Resources), modele sistemin durumu hakkında anında bağlam sağlar. Örneğin, bir veritabanı şeması kaynak olarak sunulduğunda, model \"Hangi tablolar var?\" diye sormak için gereksiz araç çağrıları (deneme-yanılma) yapmak zorunda kalmaz, doğrudan doğru SQL sorgusunu yazar."
  },
  {
    id: "4.5",
    moduleId: 4,
    moduleName: "Model Context Protocol (MCP)",
    questionNumber: 5,
    question: "Proje düzeyindeki `.mcp.json` dosyasında API anahtarları (token'lar) gibi hassas bilgileri yönetmenin en güvenli yolu nedir?",
    options: [
      { label: "Token'ları doğrudan JSON dosyasının içine açık metin olarak yazmak.", value: "A" },
      { label: "Token'ları Base64 ile şifreleyip dosyaya yazmak.", value: "B" },
      { label: "Ortam değişkenleri (environment variables) kullanarak (örn. `${GITHUB_TOKEN}`) referans vermek.", value: "C" },
      { label: "Token'ları GitHub'da herkese açık bir repoda saklamak.", value: "D" }
    ],
    correctAnswer: "C",
    explanation: "`.mcp.json` dosyası versiyon kontrolüne (Git) dahil edildiği için içine asla açık metin (plaintext) API anahtarları yazılmamalıdır. En güvenli yöntem, token'ları ortam değişkenleri (environment variables) aracılığıyla çağırmaktır (örn. `${GITHUB_TOKEN}`)."
  },

  // Module 5
  {
    id: "5.1",
    moduleId: 5,
    moduleName: "Claude Code ve İş Akışları",
    questionNumber: 1,
    question: "Yeni bir ekip üyesi projeyi klonladığında, projenin kodlama standartlarını ve test gereksinimlerini Claude Code'un otomatik olarak tanıması için bu kurallar nereye yazılmalıdır?",
    options: [
      { label: "`~/.claude/CLAUDE.md` (Kullanıcı seviyesi)", value: "A" },
      { label: "`.claude/CLAUDE.md` veya proje kök dizinindeki `CLAUDE.md` (Proje seviyesi)", value: "B" },
      { label: "İşletim sisteminin global ayarlar dosyasına", value: "C" },
      { label: "Her bir kod dosyasının en üstüne yorum satırı olarak", value: "D" }
    ],
    correctAnswer: "B",
    explanation: "Projeye özgü kurallar (kodlama standartları, mimari kararlar) proje seviyesindeki `CLAUDE.md` (veya `.claude/CLAUDE.md`) dosyasına yazılmalı ve Git'e eklenmelidir. Böylece projeyi klonlayan herkes aynı kurallarla çalışır. `~/.claude/CLAUDE.md` sadece o bilgisayardaki kullanıcının kişisel tercihlerini içerir."
  },
  {
    id: "5.2",
    moduleId: 5,
    moduleName: "Claude Code ve İş Akışları",
    questionNumber: 2,
    question: "Claude Code'da `@path` sentaksının temel kullanım amacı nedir?",
    options: [
      { label: "İnternetten dosya indirmek.", value: "A" },
      { label: "`CLAUDE.md` içinden başka dosyaları (örn. `@./standards/coding-style.md`) içe aktararak modüler bir yapılandırma sağlamak.", value: "B" },
      { label: "Dosyaların yolunu (path) değiştirmek.", value: "C" },
      { label: "Kod dosyalarını silmek.", value: "D" }
    ],
    correctAnswer: "B",
    explanation: "Büyük projelerde tek bir devasa `CLAUDE.md` dosyası yönetimi zorlaştırır. `@path` sentaksı, kuralları farklı dosyalara bölüp ana `CLAUDE.md` içinden içe aktarmayı (import) sağlar. Bu, modüler ve temiz bir yapılandırma sunar."
  },
  {
    id: "5.3",
    moduleId: 5,
    moduleName: "Claude Code ve İş Akışları",
    questionNumber: 3,
    question: "Claude Code'un \"Planlama Modu\" (Planning Mode) hangi senaryoda kullanmak için en uygundur?",
    options: [
      { label: "Tek bir dosyadaki basit bir yazım hatasını düzeltmek.", value: "A" },
      { label: "CI/CD ardışık düzeninde otomatik birim testleri çalıştırmak.", value: "B" },
      { label: "Yabancı bir kod tabanında büyük mimari değişiklikler yapmadan önce yapıyı keşfetmek ve hiçbir dosyayı değiştirmeden strateji belirlemek.", value: "C" },
      { label: "Önceki oturumların bellek geçmişini temizlemek.", value: "D" }
    ],
    correctAnswer: "C",
    explanation: "Planlama modu, modelin kodda hiçbir değişiklik yapmadan sadece okuma ve arama araçlarını kullanarak kod tabanını incelemesini sağlar. Bu, özellikle büyük ve riskli mimari değişiklikler öncesinde, modelin bir uygulama planı çıkarması ve kullanıcının bu planı onaylaması için idealdir."
  },
  {
    id: "5.4",
    moduleId: 5,
    moduleName: "Claude Code ve İş Akışları",
    questionNumber: 4,
    question: "Claude Code'u GitHub Actions gibi bir CI/CD ardışık düzeninde etkileşimsiz (non-interactive) modda çalıştırmak için hangi komut bayrağı (flag) kullanılmalıdır?",
    options: [
      { label: "`claude --ci`", value: "A" },
      { label: "`claude --headless`", value: "B" },
      { label: "`claude -p` (veya `--print`)", value: "C" },
      { label: "`claude /compact`", value: "D" }
    ],
    correctAnswer: "C",
    explanation: "CI/CD ortamlarında insan müdahalesi (onay bekleme) olamaz. `-p` veya `--print` bayrağı, Claude Code'un istemi işlemesini, sonucu standart çıktıya (stdout) yazdırmasını ve kullanıcı girdisi beklemeden kapanmasını sağlar."
  },
  {
    id: "5.5",
    moduleId: 5,
    moduleName: "Claude Code ve İş Akışları",
    questionNumber: 5,
    question: "`.claude/rules/` dizini altındaki kural dosyalarında (örn. `testing.md`) kullanılan YAML frontmatter'daki `paths` alanının işlevi nedir?",
    options: [
      { label: "Kural dosyasının nerede saklanacağını belirler.", value: "A" },
      { label: "Kuralların sadece belirtilen dosya türlerinde veya dizinlerde (örn. `**/*.test.ts`) çalışırken yüklenmesini sağlayarak bağlam penceresinden tasarruf eder.", value: "B" },
      { label: "Hangi dosyaların silineceğini belirler.", value: "C" },
      { label: "Claude'un internette arama yapacağı URL'leri tanımlar.", value: "D" }
    ],
    correctAnswer: "B",
    explanation: "Tüm kuralların her zaman yüklenmesi bağlam penceresini gereksiz yere doldurur. YAML frontmatter içindeki `paths` alanı, belirli kuralların sadece ilgili dosyalarla (örneğin test kurallarının sadece `.test.ts` dosyalarıyla) çalışırken modele sunulmasını sağlar."
  },

  // Module 6
  {
    id: "6.1",
    moduleId: 6,
    moduleName: "İleri Düzey İstem Mühendisliği",
    questionNumber: 1,
    question: "\"Few-shot prompting\" (Az örnekli istemleme) tekniğinin, sadece metinsel talimatlar vermeye kıyasla en büyük avantajı nedir?",
    options: [
      { label: "API maliyetlerini düşürmesi.", value: "A" },
      { label: "Beklenen formatı ve karar mantığını tartışmasız bir şekilde ortaya koyarak modelin muğlak talimatları yanlış yorumlamasını engellemesi.", value: "B" },
      { label: "Modelin daha hızlı çalışmasını sağlaması.", value: "C" },
      { label: "Bağlam penceresini (context window) genişletmesi.", value: "D" }
    ],
    correctAnswer: "B",
    explanation: "\"Daha kesin ol\" gibi metinsel talimatlar model tarafından farklı yorumlanabilir. Ancak girdi-çıktı örnekleri (few-shot), beklenen formatı ve mantığı somutlaştırır. Model örnekleri kopyalamaz, arkasındaki örüntüyü (pattern) öğrenerek yeni durumlara uygular."
  },
  {
    id: "6.2",
    moduleId: 6,
    moduleName: "İleri Düzey İstem Mühendisliği",
    questionNumber: 2,
    question: "15 dosyadan oluşan büyük bir Pull Request'i (PR) incelerken, tüm dosyaları tek bir büyük istemde (prompt) göndermek yerine \"İstem Zincirleme\" (Prompt Chaining) kullanmanın temel nedeni nedir?",
    options: [
      { label: "\"Dikkat dağılmasını\" (attention dilution) önleyerek her dosya için tutarlı ve derinlemesine bir analiz sağlamak.", value: "A" },
      { label: "Daha eski ve ucuz Claude modellerinin kullanılabilmesine olanak tanımak.", value: "B" },
      { label: "Kodun otomatik olarak derlenmesini sağlamak.", value: "C" },
      { label: "PR'ı otomatik olarak onaylamak (merge).", value: "D" }
    ],
    correctAnswer: "A",
    explanation: "Çok fazla veriyi tek bir istemde göndermek, modelin bazı kısımları derinlemesine incelerken diğerlerini yüzeysel geçmesine (dikkat dağılması) neden olur. İstem zincirleme ile her dosya ayrı ayrı incelenir, böylece analiz kalitesi ve tutarlılığı artar."
  },
  {
    id: "6.3",
    moduleId: 6,
    moduleName: "İleri Düzey İstem Mühendisliği",
    questionNumber: 3,
    question: "\"Röportaj\" (Interview) kalıbı hangi durumlarda en etkilidir?",
    options: [
      { label: "Çok basit ve tek adımlı matematik işlemlerinde.", value: "A" },
      { label: "Yabancı bir alanda çalışırken veya en iyi seçimin bağlama bağlı olduğu, birden fazla geçerli yaklaşımın bulunduğu mimari kararlarda.", value: "B" },
      { label: "Sadece JSON çıktısı istendiğinde.", value: "C" },
      { label: "Modelin internete erişimi olmadığında.", value: "D" }
    ],
    correctAnswer: "B",
    explanation: "Röportaj kalıbında model, bir çözümü uygulamadan önce kullanıcıya açıklayıcı sorular sorar. Bu, özellikle birden fazla doğru yolun olduğu mimari kararlarda (örn. \"Önbellek global mi olsun, kullanıcı başına mı?\") kullanıcının niyetini tam olarak anlamak için çok etkilidir."
  },
  {
    id: "6.4",
    moduleId: 6,
    moduleName: "İleri Düzey İstem Mühendisliği",
    questionNumber: 4,
    question: "Modelden alınan yapılandırılmış veriler (JSON) sentaks olarak geçerli ancak anlamsal olarak yanlışsa (örn. tarihler mantıksızsa), uygulanması gereken en iyi strateji nedir?",
    options: [
      { label: "Sistemi tamamen kapatmak.", value: "A" },
      { label: "Uygulama katmanında hatayı yakalayıp, modele orijinal belgeyi, hatalı JSON'u ve spesifik hatayı göndererek \"geri bildirimle yeniden deneme\" (retry-with-feedback) yapmak.", value: "B" },
      { label: "`tool_choice` parametresini `\"none\"` yapmak.", value: "C" },
      { label: "Sistem istemini silmek.", value: "D" }
    ],
    correctAnswer: "B",
    explanation: "Modelin ürettiği veri iş kurallarına uymuyorsa, uygulama katmanında (kod ile) bu hatayı tespit edip modele \"Şu kuralı ihlal ettin, lütfen düzelt\" şeklinde geri bildirim vererek yeniden denemesini istemek en sağlam yöntemdir."
  },
  {
    id: "6.5",
    moduleId: 6,
    moduleName: "İleri Düzey İstem Mühendisliği",
    questionNumber: 5,
    question: "Bir kod inceleme isteminde \"Açık Kriterler\" (Explicit Criteria) kullanmanın en iyi örneği aşağıdakilerden hangisidir?",
    options: [
      { label: "\"Kodu incele ve sadece önemli hataları bul.\"", value: "A" },
      { label: "\"Kodda hata varsa bana söyle.\"", value: "B" },
      { label: "\"Bir yorumu SADECE kodun gerçek davranışıyla çelişiyorsa veya var olmayan bir fonksiyona atıfta bulunuyorsa sorunlu olarak işaretle.\"", value: "C" },
      { label: "\"Kodun kalitesini artır.\"", value: "D" }
    ],
    correctAnswer: "C",
    explanation: "\"Önemli hatalar\" veya \"kaliteyi artır\" gibi ifadeler muğlaktır ve modelin gereksiz uyarılar (false positives) üretmesine neden olur. C seçeneğindeki gibi net, sınırları çizilmiş ve somut koşullara bağlanan talimatlar (açık kriterler) modelin davranışını kesinleştirir."
  },

  // Module 7
  {
    id: "7.1",
    moduleId: 7,
    moduleName: "Üretim Güvenilirliği ve İleri Konular",
    questionNumber: 1,
    question: "Message Batches API kullanmanın senkron API çağrılarına göre en büyük avantajı ve en büyük kısıtlaması sırasıyla nedir?",
    options: [
      { label: "Avantaj: %50 maliyet tasarrufu / Kısıtlama: İşlem süresinin 24 saati bulabilmesi ve çok turlu araç kullanımını desteklememesi.", value: "A" },
      { label: "Avantaj: Anında yanıt vermesi / Kısıtlama: Çok pahalı olması.", value: "B" },
      { label: "Avantaj: Sınırsız bağlam penceresi sunması / Kısıtlama: Sadece İngilizce desteklemesi.", value: "C" },
      { label: "Avantaj: Kod yazabilmesi / Kısıtlama: JSON çıktısı verememesi.", value: "D" }
    ],
    correctAnswer: "A",
    explanation: "Message Batches API, büyük hacimli verileri asenkron işlemek için kullanılır. Senkron çağrılara göre %50 daha ucuzdur. Ancak sonuçların dönmesi 24 saati bulabilir ve her istek tek bir yanıt döndürdüğü için çok turlu (multi-turn) ajan döngülerini desteklemez."
  },
  {
    id: "7.2",
    moduleId: 7,
    moduleName: "Üretim Güvenilirliği ve İleri Konular",
    questionNumber: 2,
    question: "Toplu isteklerde (Message Batches API) yer alan `custom_id` alanının temel amacı nedir?",
    options: [
      { label: "İstekleri gönderen kullanıcının şifresini tutmak.", value: "A" },
      { label: "Asenkron olarak dönen sonuçları orijinal belgelerle eşleştirmek ve sadece başarısız olan istekleri tespit edip yeniden gönderebilmek.", value: "B" },
      { label: "Kullanılacak Claude modelinin versiyonunu belirtmek.", value: "C" },
      { label: "Fatura adresini tanımlamak.", value: "D" }
    ],
    correctAnswer: "B",
    explanation: "Toplu istekler asenkron işlendiği için sonuçlar gönderiliş sırasıyla dönmeyebilir. `custom_id`, dönen her bir sonucun hangi orijinal isteğe ait olduğunu eşleştirmek ve hata alan spesifik istekleri (örn. bağlam sınırını aşanları) tespit etmek için kullanılır."
  },
  {
    id: "7.3",
    moduleId: 7,
    moduleName: "Üretim Güvenilirliği ve İleri Konular",
    questionNumber: 3,
    question: "Otonom bir müşteri destek ajanında, \"İnsana Devretme\" (Escalation) için aşağıdakilerden hangisi GÜVENİLMEZ bir tetikleyicidir (anti-kalıp)?",
    options: [
      { label: "Müşterinin açıkça \"Bir yöneticiyle görüşmek istiyorum\" demesi.", value: "A" },
      { label: "Talebin mevcut şirket politikaları tarafından kapsanmaması.", value: "B" },
      { label: "Ajanın duygu analizi (sentiment analysis) yaparak müşterinin sinirli olduğunu tespit etmesi.", value: "C" },
      { label: "Belirli bir eşiği aşan finansal iade talepleri.", value: "D" }
    ],
    correctAnswer: "C",
    explanation: "Müşterinin sinirli olması, sorunun karmaşık olduğu veya ajanın çözemeyeceği anlamına gelmez. Ajan önce empati kurup çözüm sunmalıdır. Duygu analizine dayalı otomatik devretme, insan operatörlerin gereksiz yere meşgul edilmesine (false escalation) yol açar. Diğer seçenekler ise geçerli ve kesin devretme nedenleridir."
  },
  {
    id: "7.4",
    moduleId: 7,
    moduleName: "Üretim Güvenilirliği ve İleri Konular",
    questionNumber: 4,
    question: "Görev bir insana devredildiğinde (escalation), insan operatörün işini kolaylaştırmak için ajanın yapması gereken en iyi eylem nedir?",
    options: [
      { label: "Tüm konuşma geçmişini (binlerce satır) olduğu gibi operatöre göndermek.", value: "A" },
      { label: "Müşteri ID, sorun özeti, alınan aksiyonlar ve devretme nedenini içeren yapılandırılmış kısa bir özet sunmak.", value: "B" },
      { label: "Oturumu kapatıp müşteriden tekrar aramasını istemek.", value: "C" },
      { label: "Müşteriye operatörün kişisel telefon numarasını vermek.", value: "D" }
    ],
    correctAnswer: "B",
    explanation: "İnsan operatörlerin zamanı değerlidir. Ajan, devretme işlemi sırasında tüm ham logları yığmak yerine, operatörün hemen aksiyon alabilmesi için durumu özetleyen yapılandırılmış bir bağlam (handoff summary) sunmalıdır."
  },
  {
    id: "7.5",
    moduleId: 7,
    moduleName: "Üretim Güvenilirliği ve İleri Konular",
    questionNumber: 5,
    question: "Bir arama alt ajanı (subagent) 3 konudan 2'sini bulup 1'inde zaman aşımına (timeout) uğrarsa, çoklu ajan sistemlerinde hata yönetimi açısından en doğru yaklaşım nedir?",
    options: [
      { label: "Tüm iş akışını iptal edip kullanıcıya hata mesajı göstermek.", value: "A" },
      { label: "Hatayı gizleyip (silent suppression) sadece 2 konuyu tam bir rapor gibi sunmak.", value: "B" },
      { label: "Bulduğu 2 konuyu ve \"Kapsam Dışı Kalanlar\" bilgisini (kısmi başarısızlık) koordinatöre iletmek ve nihai raporda eksik kısımları açıkça belirtmek.", value: "C" },
      { label: "Zaman aşımına uğrayan konu için sahte veriler (hallucination) üretmek.", value: "D" }
    ],
    correctAnswer: "C",
    explanation: "Kısmi başarısızlık durumlarında tüm sistemi çökertmek (A) veya hatayı gizlemek (B) yanlıştır. En iyi yaklaşım, elde edilen verileri kurtarmak ve eksik kalan kısımları koordinatöre (ve nihayetinde kullanıcıya) şeffaf bir şekilde bildirmektir (Coverage Annotations). Sahte veri üretmek (D) ise en tehlikeli anti-kalıptır."
  }
];

export const modules = [
  { id: 1, name: "Claude API ve Temel Etkileşimler" },
  { id: 2, name: "Araç Kullanımı (Tool Use) ve Yapılandırılmış Çıktılar" },
  { id: 3, name: "Claude Agent SDK ve Ajan Mimarisi" },
  { id: 4, name: "Model Context Protocol (MCP)" },
  { id: 5, name: "Claude Code ve İş Akışları" },
  { id: 6, name: "İleri Düzey İstem Mühendisliği" },
  { id: 7, name: "Üretim Güvenilirliği ve İleri Konular" }
];
