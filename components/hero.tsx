import { ArrowRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 -z-10"></div>
      <div className="absolute inset-0 opacity-30 -z-10">
        <div className="absolute -top-48 -right-48 w-96 h-96 bg-purple-200 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-48 w-80 h-80 bg-blue-200 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="mx-auto max-w-4xl text-center">
          {/* Eyebrow text */}
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 text-xs font-medium rounded-full bg-purple-50 text-purple-700 border border-purple-100">
            <span className="relative px-2">New Services Available</span>
          </div>
          
          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight md:leading-tight mb-6 text-center">
            Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500">Design</span> Meets{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600">Creativity</span>
          </h1>
          
          {/* Subheading with enhanced typography */}
          <p className="mt-6 text-lg md:text-xl text-slate-600 mx-auto max-w-2xl leading-relaxed text-center">
            We create innovative digital solutions that help businesses thrive in the modern world, combining cutting-edge technology with exceptional design.
          </p>
          
          {/* CTA buttons with enhanced styling */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="#projects">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all px-6 py-6 h-auto rounded-xl">
                View Our Work <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#contacts">
              <Button size="lg" variant="outline" className="border-2 border-slate-200 hover:border-purple-200 hover:bg-white text-slate-700 shadow-sm hover:shadow-md transition-all px-6 py-6 h-auto rounded-xl">
                Contact Us
              </Button>
            </Link>
          </div>
          
          {/* Social proof or stats section */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto">
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
              <p className="font-bold text-2xl md:text-3xl text-purple-600 text-center">50+</p>
              <p className="text-slate-600 text-sm text-center">Projects Completed</p>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
              <p className="font-bold text-2xl md:text-3xl text-purple-600 text-center">100%</p>
              <p className="text-slate-600 text-sm text-center">Client Satisfaction</p>
            </div>
            <div className="col-span-2 md:col-span-1 bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
              <p className="font-bold text-2xl md:text-3xl text-purple-600 text-center">15+</p>
              <p className="text-slate-600 text-sm text-center">Industry Awards</p>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-12 flex justify-center hidden md:flex">
          <button className="flex flex-col items-center text-slate-400 hover:text-purple-600 transition-colors">
            <span className="text-xs font-medium mb-2">Scroll Down</span>
            <ChevronDown className="animate-bounce h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}