import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowRight } from "lucide-react"
import Link from 'next/link';

export function ProjectsSection() {
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
      image: "/placeholder.svg?height=300&width=600",
      tags: ["React Native", "GraphQL", "AWS", "Firebase"],
      featured: false
    }
  ]

  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="container px-4 md:px-6 mx-auto max-w-6xl">
        {/* Section Header with centered styling */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <div className="inline-flex items-center px-3 py-1 mb-4 text-xs font-medium rounded-full bg-purple-50 text-purple-700 border border-purple-100">
            Featured Work
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Projects</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl">
            Recent work we&apos;ve delivered for our clients that showcase our expertise and creativity.
          </p>
          <div className="mt-6">
            <Button variant="ghost" className="group text-slate-700 hover:text-purple-700 hover:bg-purple-50">
              View All Projects <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        {/* Featured Project - Centered */}
        <div className="mb-12">
          {projects.filter(p => p.featured).map((project, index) => (
            <div key={index} className="group relative bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition-all hover:shadow-md mx-auto">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="order-2 md:order-1 p-8 md:p-10 flex flex-col justify-center">
                  <div className="space-y-4">
                    <div className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-indigo-50 text-indigo-700">
                      {project.category}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900">{project.title}</h3>
                    <p className="text-slate-600">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="pt-4">
  <Link href="https://www.drunkbycaycee.co.ke/" target="_blank" rel="noopener noreferrer">
    <Button className="group bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-sm">
      View Case Study
      <ArrowUpRight className="ml-2 h-4 w-4 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Button>
  </Link>
</div>
                  </div>
                </div>
                
                <div className="order-1 md:order-2 relative aspect-[4/3] md:aspect-auto">
                  <Image
                    src={project.image}
                    fill
                    alt={project.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Regular Projects Grid - Centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mx-auto">
          {projects.filter(p => !p.featured).map((project, index) => (
            <div key={index} className="group bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all">
              <div className="aspect-[16/10] relative overflow-hidden">
                <Image
                  src={project.image}
                  fill
                  alt={project.title}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-indigo-50 text-indigo-700 mb-2">
                      {project.category}
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900">{project.title}</h3>
                  </div>
                  <div className="p-1 rounded-full bg-slate-50 border border-slate-100 group-hover:bg-purple-50 group-hover:border-purple-100 transition-colors">
                    <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-purple-600 transition-colors" />
                  </div>
                </div>
                
                <p className="text-sm text-slate-600 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-2 py-0.5 text-xs font-medium rounded-full bg-slate-100 text-slate-700">
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