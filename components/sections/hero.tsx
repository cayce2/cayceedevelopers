"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-100 to-cyan-100 dark:from-violet-950 dark:to-cyan-950 opacity-20" />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container relative flex flex-col items-center justify-center gap-8 py-32 md:py-40"
      >
        <div className="flex flex-col items-center gap-6 text-center">
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 opacity-75 blur" />
            <Image
              src="logo.png"
              alt="Tech Logo"
              width={120}
              height={120}
              className="relative rounded-full bg-white p-2"
              priority
            />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Where Design Meets Creativity
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-[700px] text-lg text-zinc-600 dark:text-zinc-300 md:text-xl"
          >
            We create innovative digital solutions that help businesses thrive in the modern world.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button size="lg" className="group bg-violet-600 hover:bg-violet-700">
              View Our Work
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-violet-600 text-violet-600 hover:bg-violet-50 dark:hover:bg-violet-950"
            >
              Contact Us
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}