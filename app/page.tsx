"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import OrangeAurora from "../components/orange-aurora"
import { FormCard } from "../components/form-card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Dialog, DialogContent } from "../components/ui/dialog"
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Menu,
  LogIn,
  UserPlus,
  Sparkles,
  Heart,
  Users,
  Zap,
} from "lucide-react"
import { Alert, AlertDescription } from "../components/ui/alert"

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<string>("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [birthYear, setBirthYear] = useState("")
  const [birthMonth, setBirthMonth] = useState("")
  const [birthDay, setBirthDay] = useState("")
  const [gender, setGender] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")
    setSuccessMessage("")

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const result = await response.json()

      if (!response.ok) {
        setErrorMessage(result.error || "Sikertelen bejelentkezés.")
        return
      }

      setSuccessMessage("Sikeres bejelentkezés!")
      localStorage.setItem("token", result.token)
      router.push("/Home")
    } catch (error) {
      setErrorMessage("Hiba történt a bejelentkezés során.")
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")
    setSuccessMessage("")

    if (password !== confirmPassword) {
      setErrorMessage("A jelszavak nem egyeznek.")
      return
    }

    try {
      const birthdate = `${birthYear}-${birthMonth.padStart(2, "0")}-${birthDay.padStart(2, "0")}`
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, birthdate, gender }),
      })

      const result = await response.json()

      if (!response.ok) {
        setErrorMessage(result.error || "Sikertelen regisztráció.")
        return
      }

      setSuccessMessage("Sikeres regisztráció!")
      setActiveTab("login")
    } catch (error) {
      setErrorMessage("Hiba történt a regisztráció során.")
    }
  }

  const renderLoginForm = () => (
    <form onSubmit={handleLogin} className="space-y-6">
      {errorMessage && (
        <Alert variant="destructive" className="bg-red-950/80 border-red-500/50 text-red-200 backdrop-blur-sm">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="font-medium">{errorMessage}</AlertDescription>
        </Alert>
      )}
      {successMessage && (
        <Alert className="bg-green-950/80 border-green-500/50 text-green-200 backdrop-blur-sm">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription className="font-medium">{successMessage}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-orange-100">
          Email cím
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="pelda@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-11 bg-white/10 border-orange-300/30 text-white placeholder:text-orange-200/70 focus:border-orange-400 focus:ring-orange-400/30 transition-all duration-200 backdrop-blur-sm"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-orange-100">
          Jelszó
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="h-11 bg-white/10 border-orange-300/30 text-white placeholder:text-orange-200/70 focus:border-orange-400 focus:ring-orange-400/30 transition-all duration-200 backdrop-blur-sm"
        />
      </div>

      <Button
        type="submit"
        className="w-full h-11 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white font-semibold border-0 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25 hover:scale-105"
      >
        <LogIn className="w-4 h-4 mr-2" />
        Bejelentkezés
        <Sparkles className="w-4 h-4 ml-2" />
      </Button>

      <div className="text-center pt-2">
        <button
          type="button"
          className="text-sm text-orange-200 hover:text-orange-100 transition-colors duration-200"
          onClick={() => setActiveTab("register")}
        >
          Még nincs fiókod? <span className="text-orange-300 hover:text-orange-200 font-medium">Regisztrálj itt</span>
        </button>
      </div>
    </form>
  )

  const renderRegisterForm = () => (
    <form onSubmit={handleRegister} className="space-y-5">
      {errorMessage && (
        <Alert variant="destructive" className="bg-red-950/80 border-red-500/50 text-red-200 backdrop-blur-sm">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="font-medium">{errorMessage}</AlertDescription>
        </Alert>
      )}
      {successMessage && (
        <Alert className="bg-green-950/80 border-green-500/50 text-green-200 backdrop-blur-sm">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription className="font-medium">{successMessage}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium text-orange-100">
          Teljes név
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Teljes név"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="h-11 bg-white/10 border-orange-300/30 text-white placeholder:text-orange-200/70 focus:border-yellow-400 focus:ring-yellow-400/30 transition-all duration-200 backdrop-blur-sm"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="register-email" className="text-sm font-medium text-orange-100">
          Email cím
        </Label>
        <Input
          id="register-email"
          type="email"
          placeholder="pelda@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-11 bg-white/10 border-orange-300/30 text-white placeholder:text-orange-200/70 focus:border-yellow-400 focus:ring-yellow-400/30 transition-all duration-200 backdrop-blur-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="register-password" className="text-sm font-medium text-orange-100">
            Jelszó
          </Label>
          <Input
            id="register-password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-11 bg-white/10 border-orange-300/30 text-white placeholder:text-orange-200/70 focus:border-yellow-400 focus:ring-yellow-400/30 transition-all duration-200 backdrop-blur-sm"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password" className="text-sm font-medium text-orange-100">
            Megerősítés
          </Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="h-11 bg-white/10 border-orange-300/30 text-white placeholder:text-orange-200/70 focus:border-yellow-400 focus:ring-yellow-400/30 transition-all duration-200 backdrop-blur-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-orange-100">Születési dátum</Label>
        <div className="grid grid-cols-3 gap-3">
          <Input
            type="text"
            placeholder="Év"
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
            required
            className="h-11 bg-white/10 border-orange-300/30 text-white placeholder:text-orange-200/70 focus:border-yellow-400 focus:ring-yellow-400/30 transition-all duration-200 backdrop-blur-sm"
          />
          <Input
            type="text"
            placeholder="Hónap"
            value={birthMonth}
            onChange={(e) => setBirthMonth(e.target.value)}
            required
            className="h-11 bg-white/10 border-orange-300/30 text-white placeholder:text-orange-200/70 focus:border-yellow-400 focus:ring-yellow-400/30 transition-all duration-200 backdrop-blur-sm"
          />
          <Input
            type="text"
            placeholder="Nap"
            value={birthDay}
            onChange={(e) => setBirthDay(e.target.value)}
            required
            className="h-11 bg-white/10 border-orange-300/30 text-white placeholder:text-orange-200/70 focus:border-yellow-400 focus:ring-yellow-400/30 transition-all duration-200 backdrop-blur-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="gender" className="text-sm font-medium text-orange-100">
          Nem
        </Label>
        <Select value={gender} onValueChange={setGender} required>
          <SelectTrigger
            id="gender"
            className="h-11 bg-white/10 border-orange-300/30 text-white focus:border-yellow-400 focus:ring-yellow-400/30 backdrop-blur-sm"
          >
            <SelectValue placeholder="Válassz nemet" className="text-orange-200/70" />
          </SelectTrigger>
          <SelectContent className="bg-slate-900/95 border-orange-300/30 backdrop-blur-sm">
            <SelectItem value="male" className="text-white hover:bg-orange-500/20">
              Férfi
            </SelectItem>
            <SelectItem value="female" className="text-white hover:bg-orange-500/20">
              Nő
            </SelectItem>
            <SelectItem value="other" className="text-white hover:bg-orange-500/20">
              Egyéb
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        className="w-full h-11 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-white font-semibold border-0 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/25 hover:scale-105"
      >
        <UserPlus className="w-4 h-4 mr-2" />
        Regisztráció
        <Heart className="w-4 h-4 ml-2" />
      </Button>

      <div className="text-center pt-2">
        <button
          type="button"
          className="text-sm text-orange-200 hover:text-orange-100 transition-colors duration-200"
          onClick={() => setActiveTab("login")}
        >
          Van már fiókod? <span className="text-yellow-300 hover:text-yellow-200 font-medium">Jelentkezz be</span>
        </button>
      </div>
    </form>
  )

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      <OrangeAurora colorScheme="orange" />

      {/* Floating decorative elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-4 h-4 bg-yellow-400 rounded-full animate-pulse opacity-70"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-orange-400 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute bottom-32 left-20 w-3 h-3 bg-red-400 rounded-full animate-ping opacity-50"></div>
        <div className="absolute bottom-20 right-10 w-5 h-5 bg-pink-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-1/2 left-5 w-2 h-2 bg-white rounded-full animate-bounce opacity-80"></div>
        <div className="absolute top-1/3 right-5 w-3 h-3 bg-amber-400 rounded-full animate-ping opacity-70"></div>
      </div>

      {/* Header */}
      <header className="w-full py-4 px-6 flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-300 via-yellow-300 to-red-300 bg-clip-text text-transparent drop-shadow-lg">
            JoinMe
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 hover:text-orange-200 font-medium px-6 py-2 transition-all duration-200 backdrop-blur-sm border border-white/20"
            onClick={() => {
              setActiveTab("login")
              setIsAuthDialogOpen(true)
            }}
          >
            <LogIn className="w-4 h-4 mr-2" />
            Bejelentkezés
          </Button>
          <Button
            className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white border-0 font-medium px-6 py-2 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            onClick={() => {
              setActiveTab("register")
              setIsAuthDialogOpen(true)
            }}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Regisztráció
            <Sparkles className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-slate-900/95 backdrop-blur-xl border-orange-500/30">
            <div className="flex flex-col gap-4 pt-8">
              <Button
                variant="ghost"
                className="justify-start text-white hover:bg-orange-500/20"
                onClick={() => {
                  setActiveTab("login")
                  setIsAuthDialogOpen(true)
                  setIsMenuOpen(false)
                }}
              >
                <LogIn className="w-4 h-4 mr-2" />
                Bejelentkezés
              </Button>
              <Button
                variant="ghost"
                className="justify-start text-white hover:bg-orange-500/20"
                onClick={() => {
                  setActiveTab("register")
                  setIsAuthDialogOpen(true)
                  setIsMenuOpen(false)
                }}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Regisztráció
              </Button>
              <Button
                variant="ghost"
                className="justify-start text-white hover:bg-orange-500/20"
                onClick={() => (window.location.href = "/about")}
              >
                Rólunk
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-12 md:py-0 relative z-10">
        <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 text-center md:text-left">
            <div className="space-y-4">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <Users className="w-8 h-8 text-orange-300" />
                <Zap className="w-6 h-6 text-yellow-300" />
                <Heart className="w-7 h-7 text-red-300" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-2xl">
                Közösség.{" "}
                <span className="bg-gradient-to-r from-orange-300 via-yellow-300 to-red-300 bg-clip-text text-transparent">
                  Élmény.
                </span>{" "}
                <span className="bg-gradient-to-r from-pink-300 via-red-300 to-orange-300 bg-clip-text text-transparent">
                  Kapcsolódás.
                </span>
              </h2>
            </div>
            <p className="text-lg text-orange-100 leading-relaxed drop-shadow-lg">
              Fedezd fel a JoinMe világát, ahol új barátokra lelhetsz, közös programokat szervezhetsz, és részese
              lehetsz egy inspiráló közösségnek!
            </p>
            <ul className="text-orange-200 space-y-3 list-none">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
                  <ChevronRight className="h-3 w-3 text-white" />
                </div>
                <span className="font-medium">Villámgyors regisztráció</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gradient-to-r from-red-400 to-pink-400 rounded-full flex items-center justify-center">
                  <ChevronRight className="h-3 w-3 text-white" />
                </div>
                <span className="font-medium">Programok böngészése és szervezése</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                  <ChevronRight className="h-3 w-3 text-white" />
                </div>
                <span className="font-medium">Biztonságos, támogató közösség</span>
              </li>
            </ul>
            <div className="pt-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 font-semibold"
                onClick={() => (window.location.href = "/about")}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Tudj meg többet
                <Heart className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

          {/* Mobile Auth Tabs */}
          <div className="md:hidden w-full">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-slate-900/70 backdrop-blur-xl border border-orange-300/30 p-1 h-12 shadow-2xl">
                <TabsTrigger
                  value="login"
                  className="font-medium text-orange-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white transition-all duration-200 h-10"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Bejelentkezés
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="font-medium text-orange-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white transition-all duration-200 h-10"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Regisztráció
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="mt-0 space-y-0">
                <FormCard title="Bejelentkezés" variant="login">
                  {renderLoginForm()}
                </FormCard>
              </TabsContent>
              <TabsContent value="register" className="mt-0 space-y-0">
                <FormCard title="Regisztráció" variant="register">
                  {renderRegisterForm()}
                </FormCard>
              </TabsContent>
            </Tabs>
          </div>

          {/* Desktop Image or Illustration */}
          <div className="hidden md:block">
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=400"
                alt="JoinMe közösség illusztráció"
                className="w-full max-w-md mx-auto opacity-90 drop-shadow-2xl"
              />
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-red-400 to-pink-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop Auth Dialog */}
      <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
        <DialogContent className="sm:max-w-md p-0 bg-transparent border-0 shadow-none">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-slate-900/70 backdrop-blur-xl border border-orange-300/30 p-1 h-12 shadow-2xl">
              <TabsTrigger
                value="login"
                className="font-medium text-orange-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white transition-all duration-200 h-10"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Bejelentkezés
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="font-medium text-orange-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white transition-all duration-200 h-10"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Regisztráció
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="mt-0 space-y-0">
              <FormCard title="Bejelentkezés" variant="login" onClose={() => setIsAuthDialogOpen(false)}>
                {renderLoginForm()}
              </FormCard>
            </TabsContent>
            <TabsContent value="register" className="mt-0 space-y-0">
              <FormCard title="Regisztráció" variant="register" onClose={() => setIsAuthDialogOpen(false)}>
                {renderRegisterForm()}
              </FormCard>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="w-full py-6 px-6 bg-slate-900/80 backdrop-blur-xl border-t border-orange-300/30 z-10 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-orange-100 text-sm font-medium">
            © {new Date().getFullYear()} JoinMe. Minden jog fenntartva.
          </div>
          <div className="flex gap-6">
            <a href="/terms" className="text-sm text-orange-200 hover:text-orange-100 transition-colors font-medium">
              Felhasználási feltételek
            </a>
            <a href="/privacy" className="text-sm text-orange-200 hover:text-yellow-200 transition-colors font-medium">
              Adatvédelem
            </a>
            <a href="/contact" className="text-sm text-orange-200 hover:text-red-200 transition-colors font-medium">
              Kapcsolat
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
