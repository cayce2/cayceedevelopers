import { Code, Smartphone, Palette, ArrowRight, LucideIcon, Zap, LineChart, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

type ServiceCardProps = {
  icon: LucideIcon
  title: string
  subtitle: string
  description: string
  color: string
  featured?: boolean
}

function ServiceCard({ icon: Icon, title, subtitle, description, color, featured = false }: ServiceCardProps) {
  return (
    <div className={`group relative bg-white rounded-xl p-6 md:p-8 ${featured ? 'border-2 border-purple-200' : 'border border-slate-200'} hover:shadow-md transition-all overflow-hidden`}>
      {featured && (
        <div className="absolute top-0 right-0">
          <div className="bg-purple-100 text-purple-700 text-xs font-medium py-1 px-3 rounded-bl-lg">Popular</div>
        </div>
      )}
      
      <div className={`rounded-xl p-3 w-14 h-14 flex items-center justify-center mb-5 ${color}`}>
        <Icon className="h-6 w-6" />
      </div>
      
      <h3 className="text-xl font-bold mb-2 text-slate-900 group-hover:text-purple-700 transition-colors">{title}</h3>
      <p className="text-sm font-medium text-slate-500 mb-3">{subtitle}</p>
      <p className="text-slate-600 mb-6">{description}</p>
      
      <Button variant="ghost" className="group/btn p-0 h-auto hover:bg-transparent">
        <span className="text-purple-600 font-medium group-hover/btn:text-purple-700 flex items-center">
          Learn more 
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </span>
      </Button>
    </div>
  )
}

export function ServicesSection() {
  const serviceCards = [
    {
      icon: Code,
      title: "Web Development",
      subtitle: "Custom websites and web applications",
      description: "Modern, responsive websites built with the latest technologies like React, Next.js, and Tailwind CSS.",
      color: "bg-purple-50 text-purple-600",
      featured: true
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      subtitle: "Native and cross-platform solutions",
      description: "Engaging mobile experiences for iOS and Android platforms using React Native and Flutter.",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      subtitle: "User-centered design solutions",
      description: "Beautiful, intuitive interfaces that deliver exceptional user experiences across all devices.",
      color: "bg-indigo-50 text-indigo-600"
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      subtitle: "Speed and efficiency improvements",
      description: "Enhance your digital products with optimized loading times and smoother interactions.",
      color: "bg-amber-50 text-amber-600"
    },
    {
      icon: LineChart,
      title: "Growth Strategy",
      subtitle: "Data-driven approach",
      description: "Leverage analytics and user insights to drive continuous improvement and business growth.",
      color: "bg-emerald-50 text-emerald-600"
    },
    {
      icon: Lock,
      title: "Security Solutions",
      subtitle: "Protection for digital assets",
      description: "Implement robust security measures to safeguard your applications and user data.",
      color: "bg-rose-50 text-rose-600"
    }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Background design elements */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute -top-48 -left-48 w-96 h-96 rounded-full bg-purple-100 blur-3xl"></div>
        <div className="absolute -bottom-48 -right-48 w-96 h-96 rounded-full bg-indigo-100 blur-3xl"></div>
      </div>
      
      <div className="container px-4 md:px-6">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <div className="inline-flex items-center px-3 py-1 mb-4 text-xs font-medium rounded-full bg-purple-50 text-purple-700 border border-purple-100">
            What We Offer
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Services</span>
          </h2>
          <p className="text-lg text-slate-600">
            Comprehensive solutions tailored to your unique digital needs, delivered with expertise and precision.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {serviceCards.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              subtitle={service.subtitle}
              description={service.description}
              color={service.color}
              featured={service.featured}
            />
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-8 md:p-10 text-white shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 -z-10 opacity-10">
            <svg className="absolute right-0 top-0 h-full" width="400" height="400" viewBox="0 0 400 400" fill="none">
              <g opacity="0.5">
                <circle cx="300" cy="150" r="100" stroke="white" strokeWidth="2" />
                <circle cx="350" cy="150" r="50" stroke="white" strokeWidth="2" />
                <circle cx="300" cy="100" r="50" stroke="white" strokeWidth="2" />
              </g>
            </svg>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to transform your digital presence?</h3>
              <p className="text-white/80 mb-0 md:pr-10">
                Let&apos;s discuss how our services can help you achieve your business goals and create exceptional digital experiences.
              </p>
            </div>
            <div className="flex justify-start md:justify-end">
              <Button className="bg-white text-purple-700 hover:bg-white/90 shadow-lg rounded-lg px-6 py-6 h-auto">
                Schedule a Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}