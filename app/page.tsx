import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SiteHeader } from "@/components/header"
import { SiteFooter } from "@/components/footer"
import { ArrowRight, Code, Palette, Smartphone } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-zinc-100 to-white dark:from-zinc-900 dark:to-zinc-800">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-100 to-cyan-100 dark:from-violet-950 dark:to-cyan-950 opacity-20" />
          <div className="container relative flex flex-col items-center justify-center gap-8 py-32 md:py-40">
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 opacity-75 blur" />
                <Image
                  src="/logo.png"
                  alt="CayceeTech Logo"
                  width={120}
                  height={120}
                  className="relative rounded-full bg-white p-2"
                />
              </div>
              <h1 className="bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
                Where Design Meets Creativity
              </h1>
              <p className="max-w-[700px] text-lg text-zinc-600 dark:text-zinc-300 md:text-xl">
                We create innovative digital solutions that help businesses thrive in the modern world.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="group bg-violet-600 hover:bg-violet-700">
                  View Our Work
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button size="lg" variant="outline" className="border-violet-600 text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-950">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-zinc-50/50 dark:bg-zinc-900/50">
          <div className="container flex flex-col items-center gap-4 text-center">
            <h2 className="bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl md:text-5xl">
              Our Services
            </h2>
            <p className="max-w-[700px] text-lg text-zinc-600 dark:text-zinc-300 md:text-xl">
              Comprehensive solutions for your digital needs
            </p>
          </div>
          <div className="container grid gap-6 mt-12 md:grid-cols-2 lg:grid-cols-3">
            <Card className="group relative overflow-hidden border-0 bg-white/60 shadow-lg transition-all hover:shadow-xl dark:bg-zinc-800/60">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-cyan-600/10 opacity-0 transition-opacity group-hover:opacity-100" />
              <CardHeader>
                <Code className="h-8 w-8 text-violet-600" />
                <CardTitle className="text-xl">Web Development</CardTitle>
                <CardDescription>Custom websites and web applications</CardDescription>
              </CardHeader>
              <CardContent className="text-zinc-600 dark:text-zinc-300">
                Modern, responsive websites built with the latest technologies and best practices.
              </CardContent>
            </Card>
            <Card className="group relative overflow-hidden border-0 bg-white/60 shadow-lg transition-all hover:shadow-xl dark:bg-zinc-800/60">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-cyan-600/10 opacity-0 transition-opacity group-hover:opacity-100" />
              <CardHeader>
                <Smartphone className="h-8 w-8 text-violet-600" />
                <CardTitle className="text-xl">Mobile Apps</CardTitle>
                <CardDescription>Native and cross-platform solutions</CardDescription>
              </CardHeader>
              <CardContent className="text-zinc-600 dark:text-zinc-300">
                Engaging mobile experiences for iOS and Android platforms.
              </CardContent>
            </Card>
            <Card className="group relative overflow-hidden border-0 bg-white/60 shadow-lg transition-all hover:shadow-xl dark:bg-zinc-800/60">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-cyan-600/10 opacity-0 transition-opacity group-hover:opacity-100" />
              <CardHeader>
                <Palette className="h-8 w-8 text-violet-600" />
                <CardTitle className="text-xl">UI/UX Design</CardTitle>
                <CardDescription>User-centered design solutions</CardDescription>
              </CardHeader>
              <CardContent className="text-zinc-600 dark:text-zinc-300">
                Beautiful, intuitive interfaces that deliver exceptional user experiences.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 bg-gradient-to-b from-transparent to-zinc-50/50 dark:to-zinc-900/50">
          <div className="container flex flex-col items-center gap-4 text-center">
            <h2 className="bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl md:text-5xl">
              Our Projects
            </h2>
            <p className="max-w-[700px] text-lg text-zinc-600 dark:text-zinc-300 md:text-xl">
              Recent work we&apos;ve delivered for our clients
            </p>
          </div>
          <div className="container grid gap-6 mt-12 md:grid-cols-2">
            <Card className="group overflow-hidden border-0 bg-white/60 shadow-lg transition-all hover:shadow-xl dark:bg-zinc-800/60">
              <div className="relative">
                <Image
                  src="/placeholder.svg"
                  alt="Project 1"
                  width={600}
                  height={400}
                  className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">E-commerce Platform</CardTitle>
                <CardDescription>Full-stack web application</CardDescription>
              </CardHeader>
              <CardContent className="text-zinc-600 dark:text-zinc-300">
                A modern e-commerce solution with integrated payment processing and inventory management.
              </CardContent>
            </Card>
            <Card className="group overflow-hidden border-0 bg-white/60 shadow-lg transition-all hover:shadow-xl dark:bg-zinc-800/60">
              <div className="relative">
                <Image
                  src="/placeholder.svg"
                  alt="Project 2"
                  width={600}
                  height={400}
                  className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Healthcare App</CardTitle>
                <CardDescription>Mobile application</CardDescription>
              </CardHeader>
              <CardContent className="text-zinc-600 dark:text-zinc-300">
                Patient management system with real-time appointment scheduling and medical records.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="container py-24">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl md:text-5xl">
              Get in Touch
            </h2>
            <p className="max-w-[700px] text-lg text-zinc-600 dark:text-zinc-300 md:text-xl">
              Let&apos;s discuss your next project
            </p>
          </div>
          <Card className="max-w-2xl mx-auto mt-12 border-0 bg-white/60 shadow-lg dark:bg-zinc-800/60">
            <CardHeader>
              <CardTitle className="text-xl">Contact Us</CardTitle>
              <CardDescription>Fill out the form below and we&apos;ll get back to you soon.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-6">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Name</label>
                  <Input
                    id="name"
                    className="bg-white/60 dark:bg-zinc-900/60"
                    placeholder="Your name"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email</label>
                  <Input
                    id="email"
                    type="email"
                    className="bg-white/60 dark:bg-zinc-900/60"
                    placeholder="Your email"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="message" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Message</label>
                  <Textarea
                    id="message"
                    className="bg-white/60 dark:bg-zinc-900/60"
                    rows={4}
                    placeholder="Your message"
                  />
                </div>
                <Button size="lg" className="w-full bg-violet-600 hover:bg-violet-700">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}