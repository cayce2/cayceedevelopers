"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const projects = [
  {
    title: "E-commerce Platform",
    description: "Full-stack web application",
    content: "A modern e-commerce solution with integrated payment processing and inventory management.",
    image: "/projects/ecomerce.png"
  },
  {
    title: "Expense Tracker",
    description: "Full-stack web application",
    content: "A modern platform to monitor your income and expenses.",
    image: "/projects/expensetracker.png"
  }
]

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-transparent to-zinc-50/50 dark:to-zinc-900/50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="container flex flex-col items-center gap-4 text-center"
      >
        <h2 className="bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl md:text-5xl">
          Our Projects
        </h2>
        <p className="max-w-[700px] text-lg text-zinc-600 dark:text-zinc-300 md:text-xl">
          Recent work we&apos;ve delivered for our clients
        </p>
      </motion.div>
      <div className="container grid gap-6 mt-12 md:grid-cols-2">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
          >
            <Card className="group overflow-hidden border-0 bg-white/60 shadow-lg transition-all hover:shadow-xl dark:bg-zinc-800/60">
              <div className="relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-zinc-600 dark:text-zinc-300">
                {project.content}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}