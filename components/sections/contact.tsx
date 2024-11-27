"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formState)
  }

  return (
    <section id="contact" className="container py-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center gap-4 text-center"
      >
        <h2 className="bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl md:text-5xl">
          Get in Touch
        </h2>
        <p className="max-w-[700px] text-lg text-zinc-600 dark:text-zinc-300 md:text-xl">
          Let&apos;s discuss your next project
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <Card className="max-w-2xl mx-auto mt-12 border-0 bg-white/60 shadow-lg dark:bg-zinc-800/60">
          <CardHeader>
            <CardTitle className="text-xl">Contact Us</CardTitle>
            <CardDescription>Fill out the form below and we&apos;ll get back to you soon.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-6" onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Name
                </label>
                <Input
                  id="name"
                  className="bg-white/60 dark:bg-zinc-900/60"
                  placeholder="Your name"
                  value={formState.name}
                  onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  className="bg-white/60 dark:bg-zinc-900/60"
                  placeholder="Your email"
                  value={formState.email}
                  onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="message" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Message
                </label>
                <Textarea
                  id="message"
                  className="bg-white/60 dark:bg-zinc-900/60"
                  rows={4}
                  placeholder="Your message"
                  value={formState.message}
                  onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                  required
                />
              </div>
              <Button size="lg" className="w-full bg-violet-600 hover:bg-violet-700">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}