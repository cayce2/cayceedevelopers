import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/header"
import { SiteFooter } from "@/components/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container flex flex-col items-center justify-center gap-4 py-24 md:py-32">
          <div className="flex flex-col items-center gap-4 text-center">
            <Image
              src="/logo.png"
              alt="CayceeTech Logo"
              width={120}
              height={120}
              className="mb-4"
            />
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-secondary">
              Where Design Meets Creativity
            </h1>
            <p className="max-w-[700px] text-muted md:text-xl">
              We create innovative digital solutions that help businesses thrive in the modern world.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">View Our Work</Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">Contact Us</Button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-secondary/10">
          <div className="container flex flex-col items-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">Our Services</h2>
            <p className="max-w-[700px] text-muted md:text-xl">
              Comprehensive solutions for your digital needs
            </p>
          </div>
          <div className="container grid gap-6 mt-12 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <CardHeader>
                <CardTitle className="text-primary">Web Development</CardTitle>
                <CardDescription>Custom websites and web applications</CardDescription>
              </CardHeader>
              <CardContent>
                Modern, responsive websites built with the latest technologies and best practices.
              </CardContent>
            </Card>
            <Card className="bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <CardHeader>
                <CardTitle className="text-primary">Mobile Apps</CardTitle>
                <CardDescription>Native and cross-platform solutions</CardDescription>
              </CardHeader>
              <CardContent>
                Engaging mobile experiences for iOS and Android platforms.
              </CardContent>
            </Card>
            <Card className="bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <CardHeader>
                <CardTitle className="text-primary">UI/UX Design</CardTitle>
                <CardDescription>User-centered design solutions</CardDescription>
              </CardHeader>
              <CardContent>
                Beautiful, intuitive interfaces that deliver exceptional user experiences.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 bg-accent/20">
          <div className="container flex flex-col items-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">Our Projects</h2>
            <p className="max-w-[700px] text-muted md:text-xl">
              Recent work we&apos;ve delivered for our clients
            </p>
          </div>
          <div className="container grid gap-6 mt-12 md:grid-cols-2">
            <Card className="overflow-hidden bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <Image
                src="/placeholder.svg"
                alt="Project 1"
                width={600}
                height={400}
                className="object-cover w-full h-48"
              />
              <CardHeader>
                <CardTitle className="text-primary">E-commerce Platform</CardTitle>
                <CardDescription>Full-stack web application</CardDescription>
              </CardHeader>
              <CardContent>
                A modern e-commerce solution with integrated payment processing and inventory management.
              </CardContent>
            </Card>
            <Card className="overflow-hidden bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <Image
                src="/placeholder.svg"
                alt="Project 2"
                width={600}
                height={400}
                className="object-cover w-full h-48"
              />
              <CardHeader>
                <CardTitle className="text-primary">Healthcare App</CardTitle>
                <CardDescription>Mobile application</CardDescription>
              </CardHeader>
              <CardContent>
                Patient management system with real-time appointment scheduling and medical records.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="container py-24">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">Get in Touch</h2>
            <p className="max-w-[700px] text-muted md:text-xl">
              Let&apos;s discuss your next project
            </p>
          </div>
          <Card className="max-w-2xl mx-auto mt-12 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <CardHeader>
              <CardTitle className="text-primary">Contact Us</CardTitle>
              <CardDescription>Fill out the form below and we&apos;ll get back to you soon.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    className="w-full p-2 border rounded-md bg-background"
                    placeholder="Your name"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    className="w-full p-2 border rounded-md bg-background"
                    placeholder="Your email"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    className="w-full p-2 border rounded-md bg-background"
                    rows={4}
                    placeholder="Your message"
                  />
                </div>
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
