"use client"
import { useState } from "react"
import Link from "next/link"
import ModernAurora from "../../components/modern-aurora"
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
  },
  {
    title: "Küldetésünk",
    text: "Az a célunk, hogy bárki könnyedén találjon magának társaságot – legyen szó egy spontán kávézásról vagy egy izgalmas eseményről. Platformunk egyszerű, biztonságos, és mindenki számára elérhető. Nálunk mindenki otthon érezheti magát!",
    icon: Target,
  },
  {
    title: "Értékeink",
    text: "Innováció, nyitottság, közösség és biztonság – ezek a szavak határoznak meg minket. Mindennapi munkánk során ezekhez az értékekhez ragaszkodunk, hogy a JoinMe valóban egy inspiráló és biztonságos hely legyen mindenki számára.",
    icon: Lightbulb,
  },
]

const features = [
  {
    title: "Események létrehozása és böngészése",
    icon: Calendar,
  },
  {
    title: "Biztonságos felhasználói profilok",
    icon: Shield,
  },
  {
    title: "Mobilbarát, modern felület",
    icon: Smartphone,
  },
  {
    title: "Közösségi élmények megosztása",
    icon: Share2,
  },
  {
    title: "Biztonságos kommunikáció",
    icon: MessageCircle,
  },
  {
    title: "Gyors és egyszerű regisztráció",
    icon: UserCheck,
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
    <main className="min-h-screen flex flex-col bg-slate-950">
      <ModernAurora colorScheme="purple" />

      {/* Header */}
      <header className="w-full py-4 px-6 flex items-center justify-between z-10">
        <Link href="/" className="flex items-center gap-3 text-white hover:text-purple-300 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <h1 className="text-2xl font-bold">JoinMe</h1>
        </Link>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
        <div className="max-w-4xl w-full space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">Rólunk</h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
              A JoinMe egy modern közösségi platform, ahol könnyedén találhatsz társaságot bármilyen programhoz. Ismerj
              meg minket közelebbről!
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="w-full max-w-6xl mx-auto px-6 pb-16 space-y-16">
        {/* About Sections */}
        <section className="grid md:grid-cols-3 gap-8">
          {sections.map((section, index) => {
            const IconComponent = section.icon
            return (
              <Card key={section.title} className="bg-slate-900/50 backdrop-blur-sm border-slate-700/50">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 leading-relaxed">{section.text}</p>
                </CardContent>
              </Card>
            )
          })}
        </section>

        {/* Features Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-white">Az oldal célja és funkciói</h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto">
              A JoinMe célja, hogy megkönnyítse a közös programok szervezését és új emberek megismerését. Platformunk
              lehetőséget ad események létrehozására, csatlakozásra, valamint biztonságos és egyszerű kommunikációra.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={feature.title}
                  className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-lg border border-slate-700/30"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-slate-300 font-medium">{feature.title}</span>
                </div>
              )
            })}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Történetünk</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-blue-500"></div>

              {timeline.map((item, index) => (
                <div key={item.year} className="relative flex items-start gap-6 pb-8 last:pb-0">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="text-lg font-semibold text-purple-300 mb-1">{item.year}</div>
                    <p className="text-slate-300">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Gyakori kérdések</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Collapsible
                key={index}
                open={openFaq === index}
                onOpenChange={(isOpen) => setOpenFaq(isOpen ? index : null)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-6 h-auto bg-slate-800/30 hover:bg-slate-800/50 border border-slate-700/30 text-left"
                  >
                    <span className="text-white font-medium">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === index ? "rotate-180" : ""}`}
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-6 pb-4">
                  <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center space-y-6">
          <h2 className="text-2xl font-bold text-white">Készen állsz a csatlakozásra?</h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Fedezd fel a JoinMe világát, és találj új barátokat, izgalmas programokat és felejthetetlen élményeket!
          </p>
          <Link href="/">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0 shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            >
              Fedezd fel a JoinMe-t!
            </Button>
          </Link>
        </section>
      </div>

      {/* Footer */}
      <footer className="w-full py-8 px-6 bg-slate-900/60 backdrop-blur-sm border-t border-slate-700/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white text-sm">© {new Date().getFullYear()} JoinMe. Minden jog fenntartva.</div>
          <div className="flex gap-6">
            <a href="/terms" className="text-sm text-slate-300 hover:text-white transition-colors">
              Felhasználási feltételek
            </a>
            <a href="/privacy" className="text-sm text-slate-300 hover:text-white transition-colors">
              Adatvédelem
            </a>
            <a href="/contact" className="text-sm text-slate-300 hover:text-white transition-colors">
              Kapcsolat
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
