"use client"
import { useState } from "react"
import Link from "next/link"
import BrightAurora from "../../components/bright-aurora"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Users,
  Target,
  Lightbulb,
  ChevronDown,
  ArrowLeft,
  Calendar,
  Shield,
  Smartphone,
  MessageCircle,
  UserCheck,
  Share2,
} from "lucide-react"

const sections = [
  {
    title: "Kik vagyunk?",
    text: "A JoinMe csapata azért dolgozik nap mint nap, hogy közelebb hozza az embereket egymáshoz. Szeretünk közösséget építeni, új barátságokat születni látni, és hiszünk abban, hogy a modern technológia segíthet abban, hogy mindenki megtalálja a társaságát.",
    icon: Users,
    gradient: "from-blue-500 to-blue-600",
  },
  {
    title: "Küldetésünk",
    text: "Az a célunk, hogy bárki könnyedén találjon magának társaságot – legyen szó egy spontán kávézásról vagy egy izgalmas eseményről. Platformunk egyszerű, biztonságos, és mindenki számára elérhető. Nálunk mindenki otthon érezheti magát!",
    icon: Target,
    gradient: "from-orange-500 to-orange-600",
  },
  {
    title: "Értékeink",
    text: "Innováció, nyitottság, közösség és biztonság – ezek a szavak határoznak meg minket. Mindennapi munkánk során ezekhez az értékekhez ragaszkodunk, hogy a JoinMe valóban egy inspiráló és biztonságos hely legyen mindenki számára.",
    icon: Lightbulb,
    gradient: "from-yellow-500 to-amber-600",
  },
]

const features = [
  {
    title: "Események létrehozása és böngészése",
    icon: Calendar,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Biztonságos felhasználói profilok",
    icon: Shield,
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "Mobilbarát, modern felület",
    icon: Smartphone,
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    title: "Közösségi élmények megosztása",
    icon: Share2,
    gradient: "from-blue-500 to-purple-500",
  },
  {
    title: "Biztonságos kommunikáció",
    icon: MessageCircle,
    gradient: "from-orange-500 to-pink-500",
  },
  {
    title: "Gyors és egyszerű regisztráció",
    icon: UserCheck,
    gradient: "from-yellow-500 to-green-500",
  },
]

const timeline = [
  {
    year: "2022",
    event: "A JoinMe ötlete megszületik egy baráti beszélgetés során.",
  },
  {
    year: "2023",
    event: "Elindul a fejlesztés, első prototípus és tesztelés.",
  },
  {
    year: "2024",
    event: "Publikus indulás, első 1000 felhasználó.",
  },
  {
    year: "2025",
    event: "Új funkciók, közösségi események szervezése.",
  },
]

const faqs = [
  {
    question: "Hogyan működik a JoinMe?",
    answer:
      "Csak regisztrálsz, létrehozol vagy csatlakozol eseményekhez, és máris új emberekkel találkozhatsz. Pár kattintás, és indulhat a közös élmény!",
  },
  {
    question: "Biztonságos a platform?",
    answer:
      "Igen! Minden felhasználót ellenőrzünk, és folyamatosan fejlesztjük a biztonsági rendszereinket, hogy te nyugodtan élvezhesd a közösségi élményeket.",
  },
  {
    question: "Mennyibe kerül a JoinMe használata?",
    answer:
      "Az alap funkciók teljesen ingyenesek, így bátran kipróbálhatod a platformot bármilyen kötelezettség nélkül.",
  },
  {
    question: "Hogyan tudok eseményt létrehozni?",
    answer:
      "Regisztráció után a főoldalon kattints az 'Esemény létrehozása' gombra, add meg a részleteket, és máris meghívhatod a többieket!",
  },
  {
    question: "Csatlakozhatok több eseményhez is?",
    answer: "Természetesen! Nincs korlátozás, annyi eseményhez csatlakozhatsz, amennyihez csak szeretnél.",
  },
  {
    question: "Törölhetem a profilomat?",
    answer: "Igen, bármikor törölheted a fiókodat a profilbeállításoknál – nálunk te döntesz a saját adataidról.",
  },
  {
    question: "Van mobilalkalmazásotok?",
    answer:
      "Jelenleg webes felületünk teljesen mobilbarát, de már dolgozunk a natív mobilalkalmazáson is. Hamarosan érkezik!",
  },
  {
    question: "Hogyan léphetek kapcsolatba az esemény szervezőjével?",
    answer:
      "Az esemény oldalán privát üzenetben vagy a nyilvános esemény chatben is könnyedén felveheted a kapcsolatot a szervezővel.",
  },
]

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-white via-blue-50 to-orange-50">
      <BrightAurora colorScheme="vibrant" />

      {/* Header */}
      <header className="w-full py-3 md:py-4 px-4 md:px-6 flex items-center justify-between z-10 relative">
        <Link href="/" className="flex items-center gap-2 md:gap-3 text-gray-800 hover:text-blue-600 transition-colors">
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
            JoinMe
          </h1>
        </Link>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 md:px-6 py-8 md:py-12 text-center relative z-10">
        <div className="max-w-4xl w-full space-y-4 md:space-y-8">
          <div className="space-y-3 md:space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Rólunk
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
              A JoinMe egy modern közösségi platform, ahol könnyedén találhatsz társaságot bármilyen programhoz. Ismerj
              meg minket közelebbről!
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 pb-12 md:pb-16 space-y-12 md:space-y-16 relative z-10">
        {/* About Sections */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {sections.map((section, index) => {
            const IconComponent = section.icon
            return (
              <Card
                key={section.title}
                className="bg-white/80 backdrop-blur-sm border-2 border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 bg-gradient-to-r ${section.gradient} rounded-xl flex items-center justify-center shadow-lg`}
                  >
                    <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg md:text-xl text-gray-800">{section.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">{section.text}</p>
                </CardContent>
              </Card>
            )
          })}
        </section>

        {/* Features Section */}
        <section className="space-y-6 md:space-y-8">
          <div className="text-center space-y-3 md:space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              Az oldal célja és funkciói
            </h2>
            <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              A JoinMe célja, hogy megkönnyítse a közös programok szervezését és új emberek megismerését. Platformunk
              lehetőséget ad események létrehozására, csatlakozásra, valamint biztonságos és egyszerű kommunikációra.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={feature.title}
                  className="flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-white/70 backdrop-blur-sm rounded-xl border-2 border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div
                    className={`w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center flex-shrink-0 shadow-md`}
                  >
                    <IconComponent className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <span className="text-sm md:text-base text-gray-700 font-medium">{feature.title}</span>
                </div>
              )
            })}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="space-y-6 md:space-y-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent mb-4">
              Történetünk
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-3 md:left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-orange-500 to-yellow-500 rounded-full shadow-sm"></div>

              {timeline.map((item, index) => (
                <div key={item.year} className="relative flex items-start gap-4 md:gap-6 pb-6 md:pb-8 last:pb-0">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 shadow-lg">
                    <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="flex-1 pt-0.5 md:pt-1 bg-white/60 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/50 shadow-md">
                    <div className="text-base md:text-lg font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent mb-1">
                      {item.year}
                    </div>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="space-y-6 md:space-y-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent mb-4">
              Gyakori kérdések
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3 md:space-y-4">
            {faqs.map((faq, index) => (
              <Collapsible
                key={index}
                open={openFaq === index}
                onOpenChange={(isOpen) => setOpenFaq(isOpen ? index : null)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-4 md:p-6 h-auto bg-white/70 hover:bg-white/90 border-2 border-white/50 text-left shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <span className="text-sm md:text-base text-gray-800 font-semibold text-left pr-2">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 md:w-5 md:h-5 text-orange-500 transition-transform flex-shrink-0 ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 md:px-6 pb-3 md:pb-4">
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">{faq.answer}</p>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center space-y-4 md:space-y-6">
          <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
            Készen állsz a csatlakozásra?
          </h2>
          <p className="text-sm md:text-base text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Fedezd fel a JoinMe világát, és találj új barátokat, izgalmas programokat és felejthetetlen élményeket!
          </p>
          <Link href="/">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 via-orange-500 to-yellow-500 hover:from-blue-600 hover:via-orange-600 hover:to-yellow-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto font-semibold"
            >
              Fedezd fel a JoinMe-t!
            </Button>
          </Link>
        </section>
      </div>

      {/* Footer */}
      <footer className="w-full py-6 md:py-8 px-4 md:px-6 bg-white/80 backdrop-blur-sm border-t-2 border-white/50 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
          <div className="text-gray-700 text-xs md:text-sm text-center md:text-left font-medium">
            © {new Date().getFullYear()} JoinMe. Minden jog fenntartva.
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <a
              href="/terms"
              className="text-xs md:text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Felhasználási feltételek
            </a>
            <a
              href="/privacy"
              className="text-xs md:text-sm text-gray-600 hover:text-orange-500 transition-colors font-medium"
            >
              Adatvédelem
            </a>
            <a
              href="/contact"
              className="text-xs md:text-sm text-gray-600 hover:text-yellow-600 transition-colors font-medium"
            >
              Kapcsolat
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
