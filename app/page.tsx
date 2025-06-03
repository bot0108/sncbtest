"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import ModernAurora from "../components/modern-aurora"
import { FormCard } from "../components/form-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle2, ChevronRight, Menu, LogIn, UserPlus } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

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
        <Alert variant="destructive" className="bg-red-950/50 border-red-800/50 text-red-200">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="font-medium">{errorMessage}</AlertDescription>
        </Alert>
      )}
      {successMessage && (
        <Alert className="bg-green-950/50 border-green-800/50 text-green-200">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription className="font-medium">{successMessage}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-slate-300">
          Email cím
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="pelda@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-11 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all duration-200"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-slate-300">
          Jelszó
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="h-11 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all duration-200"
        />
      </div>

      <Button
        type="submit"
        className="w-full h-11 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold border-0 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
      >
        <LogIn className="w-4 h-4 mr-2" />
        Bejelentkezés
      </Button>

      <div className="text-center pt-2">
        <button
          type="button"
          className="text-sm text-slate-400 hover:text-purple-400 transition-colors duration-200"
          onClick={() => setActiveTab("register")}
        >
          Még nincs fiókod? <span className="text-purple-400 hover:text-purple-300">Regisztrálj itt</span>
        </button>
      </div>
    </form>
  )

  const renderRegisterForm = () => (
    <form onSubmit={handleRegister} className="space-y-5">
      {errorMessage && (
        <Alert variant="destructive" className="bg-red-950/50 border-red-800/50 text-red-200">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="font-medium">{errorMessage}</AlertDescription>
        </Alert>
      )}
      {successMessage && (
        <Alert className="bg-green-950/50 border-green-800/50 text-green-200">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription className="font-medium">{successMessage}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium text-slate-300">
          Teljes név
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Teljes név"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="h-11 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all duration-200"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="register-email" className="text-sm font-medium text-slate-300">
          Email cím
        </Label>
        <Input
          id="register-email"
          type="email"
          placeholder="pelda@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-11 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all duration-200"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="register-password" className="text-sm font-medium text-slate-300">
            Jelszó
          </Label>
          <Input
            id="register-password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-11 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all duration-200"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password" className="text-sm font-medium text-slate-300">
            Megerősítés
          </Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="h-11 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all duration-200"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-slate-300">Születési dátum</Label>
        <div className="grid grid-cols-3 gap-3">
          <Input
            type="text"
            placeholder="Év"
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
            required
            className="h-11 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all duration-200"
          />
          <Input
            type="text"
            placeholder="Hónap"
            value={birthMonth}
            onChange={(e) => setBirthMonth(e.target.value)}
            required
            className="h-11 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all duration-200"
          />
          <Input
            type="text"
            placeholder="Nap"
            value={birthDay}
            onChange={(e) => setBirthDay(e.target.value)}
            required
            className="h-11 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all duration-200"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="gender" className="text-sm font-medium text-slate-300">
          Nem
        </Label>
        <Select value={gender} onValueChange={setGender} required>
          <SelectTrigger
            id="gender"
            className="h-11 bg-slate-800/50 border-slate-600/50 text-white focus:border-blue-500/50 focus:ring-blue-500/20"
          >
            <SelectValue placeholder="Válassz nemet" className="text-slate-400" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-600">
            <SelectItem value="male" className="text-white hover:bg-slate-700">
              Férfi
            </SelectItem>
            <SelectItem value="female" className="text-white hover:bg-slate-700">
              Nő
            </SelectItem>
            <SelectItem value="other" className="text-white hover:bg-slate-700">
              Egyéb
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        className="w-full h-11 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold border-0 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
      >
        <UserPlus className="w-4 h-4 mr-2" />
        Regisztráció
      </Button>

      <div className="text-center pt-2">
        <button
          type="button"
          className="text-sm text-slate-400 hover:text-blue-400 transition-colors duration-200"
          onClick={() => setActiveTab("login")}
        >
          Van már fiókod? <span className="text-blue-400 hover:text-blue-300">Jelentkezz be</span>
        </button>
      </div>
    </form>
  )

  return (
    <main className="min-h-screen flex flex-col">
      <ModernAurora colorScheme="purple" />

      {/* Header */}
      <header className="w-full py-4 px-6 flex items-center justify-between z-10">
        <h1 className="text-2xl font-bold text-white">JoinMe</h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 font-medium px-6 py-2 transition-all duration-200"
            onClick={() => {
              setActiveTab("login")
              setIsAuthDialogOpen(true)
            }}
          >
            <LogIn className="w-4 h-4 mr-2" />
            Bejelentkezés
          </Button>
          <Button
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0 font-medium px-6 py-2 shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            onClick={() => {
              setActiveTab("register")
              setIsAuthDialogOpen(true)
            }}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Regisztráció
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-slate-900 border-slate-700">
            <div className="flex flex-col gap-4 pt-8">
              <Button
                variant="ghost"
                className="justify-start text-white hover:bg-slate-800"
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
                className="justify-start text-white hover:bg-slate-800"
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
                className="justify-start text-white hover:bg-slate-800"
                onClick={() => (window.location.href = "/about")}
              >
                Rólunk
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-12 md:py-0">
        <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              Közösség. Élmény. <span className="text-purple-300">Kapcsolódás.</span>
            </h2>
            <p className="text-lg text-slate-300">
              Fedezd fel a JoinMe világát, ahol új barátokra lelhetsz, közös programokat szervezhetsz, és részese
              lehetsz egy inspiráló közösségnek!
            </p>
            <ul className="text-slate-300 space-y-2 list-none md:list-disc md:pl-5">
              <li className="flex items-center md:block">
                <ChevronRight className="h-5 w-5 mr-1 md:hidden text-purple-300" />
                Villámgyors regisztráció
              </li>
              <li className="flex items-center md:block">
                <ChevronRight className="h-5 w-5 mr-1 md:hidden text-purple-300" />
                Programok böngészése és szervezése
              </li>
              <li className="flex items-center md:block">
                <ChevronRight className="h-5 w-5 mr-1 md:hidden text-purple-300" />
                Biztonságos, támogató közösség
              </li>
            </ul>
            <div className="pt-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white border-0 shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                onClick={() => (window.location.href = "/about")}
              >
                Tudj meg többet
              </Button>
            </div>
          </div>

          {/* Mobile Auth Tabs - Shown directly on the landing page for mobile */}
          <div className="md:hidden w-full">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-1 h-12">
                <TabsTrigger
                  value="login"
                  className="font-medium text-slate-300 data-[state=active]:bg-slate-700 data-[state=active]:text-white transition-all duration-200 h-10"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Bejelentkezés
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="font-medium text-slate-300 data-[state=active]:bg-slate-700 data-[state=active]:text-white transition-all duration-200 h-10"
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
            <img
              src="/placeholder.svg?height=400&width=400"
              alt="JoinMe közösség illusztráció"
              className="w-full max-w-md mx-auto opacity-80"
            />
          </div>
        </div>
      </section>

      {/* Desktop Auth Dialog */}
      <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
        <DialogContent className="sm:max-w-md p-0 bg-transparent border-0 shadow-none">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-1 h-12">
              <TabsTrigger
                value="login"
                className="font-medium text-slate-300 data-[state=active]:bg-slate-700 data-[state=active]:text-white transition-all duration-200 h-10"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Bejelentkezés
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="font-medium text-slate-300 data-[state=active]:bg-slate-700 data-[state=active]:text-white transition-all duration-200 h-10"
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
      <footer className="w-full py-6 px-6 bg-slate-900/60 backdrop-blur-sm z-10">
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
