"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowRight } from "lucide-react"
import Link from 'next/link';
import { useTranslation } from "@/lib/use-translation"

export function ProjectsSection() {
  const { t } = useTranslation()
  const projects = [
    {
      title: "E-commerce Platform",
      category: "Full-stack web application",
      description: "A modern e-commerce solution with integrated payment processing and inventory management.",
      image: "/ecommerce.png?height=300&width=600",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      featured: true
    },
    {
      title: "Expense Tracker",
      category: "Full-stack web application",
      description: "A modern platform to monitor your income and expenses with intelligent insights.",
      image: "/expense.png?height=300&width=600",
      tags: ["React", "Firebase", "ChartJS", "Tailwind"],
      featured: false
    },
    {
      title: "Empowerher App",
      category: "Mobile application",
      description: "Personalized workout plans and nutrition tracking to help users reach their goals.",
      image: "/empower.png?height=300&width=600",
      tags: ["React Native", "GraphQL", "AWS", "Firebase"],
      featured: false
    },
    {
      title: "AB-SITE Technologies",
      category: "Ecommerce Website",
      description: "Networking and security solutions provider with a comprehensive online store.",
      image: "/absite.png?height=300&width=600",
      tags: ["React Native"],
      featured: false
      
    },
    {
      title: "Stocks Management System",
      category: "Website",
      description: "Stock management system for tracking inventory levels, orders, sales, and deliveries.",
      image: "/absite.png?height=300&width=600",
      tags: ["React Native"],
      featured: false
    }
  ]

  return (
    <section id="projects" className="py-24 bg-[#0a0f1e]">
      <div className="container px-4 md:px-6 mx-auto max-w-6xl">
        {/* Section Header with centered styling */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <div className="inline-flex items-center px-3 py-1 mb-4 text-xs font-medium bg-sky-500/10 text-sky-400 border border-sky-500/30 backdrop-blur-sm animate-slide-up">
            {t('Featured Work')}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight animate-slide-up" style={{animationDelay: '0.1s'}}>
            {t('Our Projects').split(' ').map((word, index) => 
              index === 1 ? <span key={index} className="text-sky-400">{word}</span> : <span key={index}>{word} </span>
            )}
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl animate-slide-up" style={{animationDelay: '0.2s'}}>
            {t('Recent work showcase')}
          </p>
          <div className="mt-6 animate-slide-up" style={{animationDelay: '0.3s'}}>
            <Button variant="ghost" className="group text-gray-300 hover:text-sky-400 hover:bg-sky-500/10 transition-all">
              {t('View All Projects')} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        {/* Featured Project - Centered */}
        <div className="mb-12">
          {projects.filter(p => p.featured).map((project, index) => (
            <div key={index} className="group relative bg-[#050a14]/80 backdrop-blur-sm shadow-lg border border-sky-500/20 overflow-hidden transition-all hover:shadow-xl hover:shadow-sky-500/30 hover:border-sky-400 hover:-translate-y-1 mx-auto">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="order-2 md:order-1 p-8 md:p-10 flex flex-col justify-center">
                  <div className="space-y-4">
                    <div className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30">
                      {project.category}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white">{project.title}</h3>
                    <p className="text-gray-400">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-3 py-1 text-xs font-medium rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="pt-4">
                      <Link href="https://www.drunkbycaycee.co.ke/" target="_blank" rel="noopener noreferrer">
                        <Button className="group bg-sky-500 hover:bg-sky-600 text-white shadow-lg shadow-sky-500/20 transition-all hover:shadow-sky-500/40 hover:scale-105">
                          {t('View Case Study')}
                           <ArrowUpRight className="ml-2 h-4 w-4 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="order-1 md:order-2 relative aspect-[4/3] md:aspect-auto border-l border-sky-500/20">
                  <Image
                    src={project.image}
                    fill
                    alt={project.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Regular Projects Grid - Centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mx-auto">
          {projects.filter(p => !p.featured).map((project, index) => (
            <div key={index} className="group bg-[#050a14]/80 backdrop-blur-sm shadow-lg border border-sky-500/20 overflow-hidden hover:shadow-xl hover:shadow-sky-500/30 transition-all hover:border-sky-400 hover:-translate-y-2">
              <div className="aspect-[16/10] relative overflow-hidden border-b border-sky-500/20">
                <Image
                  src={project.image}
                  fill
                  alt={project.title}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="inline-flex px-2 py-0.5 text-xs font-medium bg-sky-500/10 text-sky-400 border border-sky-500/30 mb-2">
                      {project.category}
                    </div>
                    <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  </div>
                  <div className="p-1 bg-sky-500/10 border border-sky-500/20 group-hover:bg-sky-500/20 group-hover:border-sky-400 transition-all group-hover:scale-110">
                    <ArrowUpRight className="h-4 w-4 text-sky-400 group-hover:text-sky-300 transition-colors" />
                  </div>
                </div>
                
                <p className="text-sm text-gray-400 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-2 py-0.5 text-xs font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}