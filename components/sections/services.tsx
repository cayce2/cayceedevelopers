"use client"

import { motion } from "framer-motion"
import { Code, Palette, Smartphone } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Custom websites and web applications",
    content: "Modern, responsive websites built with the latest technologies and best practices."
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Native and cross-platform solutions",
    content: "Engaging mobile experiences for iOS and Android platforms."
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "User-centered design solutions",
    content: "Beautiful, intuitive interfaces that deliver exceptional user experiences."
  }
]

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-zinc-50/50 dark:bg-zinc-900/50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container flex flex-col items-center gap-4 text-center"
      >
        <h2 className="bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl md:text-5xl">
          Our Services
        </h2>
        <p className="max-w-[700px] text-lg text-zinc-600 dark:text-zinc-300 md:text-xl">
          Comprehensive solutions for your digital needs
        </p>
      </motion.div>
      <div className="container grid gap-6 mt-12 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
          >
            <Card className="group relative overflow-hidden border-0 bg-white/60 shadow-lg transition-all hover:shadow-xl dark:bg-zinc-800/60 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-cyan-600/10 opacity-0 transition-opacity group-hover:opacity-100" />
              <CardHeader>
                <service.icon className="h-8 w-8 text-violet-600" />
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-zinc-600 dark:text-zinc-300">
                {service.content}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}