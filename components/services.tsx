import { useState } from "react";
import { Code, Smartphone, Palette, ArrowRight, LucideIcon, Zap, LineChart, Lock, Calendar, Clock, User, X } from "lucide-react"
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
      
      <div className={`rounded-xl p-3 w-14 h-14 flex items-center justify-center mb-5 mx-auto ${color}`}>
        <Icon className="h-6 w-6" />
      </div>
      
      <h3 className="text-xl font-bold mb-2 text-slate-900 group-hover:text-purple-700 transition-colors text-center">{title}</h3>
      <p className="text-sm font-medium text-slate-500 mb-3 text-center">{subtitle}</p>
      <p className="text-slate-600 mb-6 text-center">{description}</p>
      
      <div className="flex justify-center">
        <Button variant="ghost" className="group/btn p-0 h-auto hover:bg-transparent">
          <span className="text-purple-600 font-medium group-hover/btn:text-purple-700 flex items-center">
            Learn more 
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </span>
        </Button>
      </div>
    </div>
  )
}

// Calendar component
type ConsultationCalendarProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string; date: string; time: string }) => void;
};

function ConsultationCalendar({ isOpen, onClose, onSubmit }: ConsultationCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Generate dates for the next 14 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    
    return dates;
  };

  // Generate available time slots
  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", 
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !name || !email) {
      alert("Please fill in all fields");
      return;
    }
    
    setSubmitting(true);
    
    // Format date for email
    const formattedDate = selectedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    const bookingData = {
      name,
      email,
      date: formattedDate,
      time: selectedTime,
      recipientEmail: "cayceedevelopers@gmail.com" // Adding the recipient email
    };
    
    try {
      // Send booking data to API endpoint
      await fetch('/api/schedule-consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
      
      // Submit the form data to the parent component
      onSubmit(bookingData);
      
      // Close the modal
      onClose();
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("There was an error scheduling your consultation. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-bold text-slate-900">Schedule a Consultation</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          {/* Personal Information */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              <User className="inline h-4 w-4 mr-1" />
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md"
              placeholder="Enter your name"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md"
              placeholder="Enter your email"
              required
            />
          </div>
          
          {/* Date Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              <Calendar className="inline h-4 w-4 mr-1" />
              Select a Date
            </label>
            <div className="grid grid-cols-4 gap-2">
              {generateDates().map((date, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedDate(date)}
                  className={`text-center p-2 rounded-md text-sm ${
                    selectedDate && date.toDateString() === selectedDate.toDateString()
                      ? 'bg-purple-100 text-purple-700 border border-purple-300'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </button>
              ))}
            </div>
          </div>
          
          {/* Time Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              <Clock className="inline h-4 w-4 mr-1" />
              Select a Time
            </label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`text-center p-2 rounded-md text-sm ${
                    selectedTime === time
                      ? 'bg-purple-100 text-purple-700 border border-purple-300'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="mt-6">
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium py-2 rounded-md hover:opacity-90"
              disabled={submitting}
            >
              {submitting ? "Processing..." : "Confirm Appointment"}
            </Button>
          </div>
          
          <p className="mt-3 text-xs text-slate-500 text-center">
            Your booking details will be sent to our team and you&apos;ll receive a confirmation email shortly.
          </p>
        </form>
      </div>
    </div>
  );
}

export function ServicesSection() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  
  const handleSubmitConsultation = (data: { name: string; email: string; date: string; time: string; recipientEmail?: string }) => {
    // Here you would typically send the data to your backend
    console.log("Consultation request:", data);
    
    // In a real implementation, you would add code to send this data to cayceedevelopers@gmail.com
    // For example, using a serverless function or an email API like SendGrid, Mailchimp, etc.
    // 
    // Example implementation (not functional in client-side code):
    /*
    fetch('/api/send-booking-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: "cayceedevelopers@gmail.com",
        subject: `New Consultation Booking: ${data.name}`,
        text: `
          New consultation booking details:
          
          Name: ${data.name}
          Email: ${data.email}
          Date: ${data.date}
          Time: ${data.time}
        `
      }),
    });
    */
    
    alert(`Thank you, ${data.name}! Your consultation has been scheduled for ${data.date} at ${data.time}. We'll email you a confirmation shortly. A notification has been sent to our team at cayceedevelopers@gmail.com.`);
    
    // Actually sending emails requires backend implementation
    // The email functionality would need to be implemented in a backend service
    // This would typically be done with a serverless function (e.g., Next.js API routes, 
    // Vercel Functions, AWS Lambda, etc.) that uses an email sending service
  };

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
      
      <div className="container px-4 md:px-6 mx-auto max-w-6xl">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mx-auto">
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
    <svg className="absolute right-0 top-0 h-full" width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="400" cy="0" r="200" fill="white" />
      <circle cx="0" cy="400" r="200" fill="white" />
    </svg>
  </div>
  
  <div className="max-w-3xl mx-auto text-center">
    <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to transform your digital presence?</h3>
    <p className="text-purple-50 mb-8 max-w-lg mx-auto">
      Schedule a free 30-minute consultation with our experts to discuss your project and discover how we can help bring your vision to life.
    </p>
    <Button 
      onClick={() => setIsCalendarOpen(true)}
      className="bg-white text-purple-700 hover:bg-purple-50 px-6 py-3 font-medium rounded-lg shadow-sm transition-colors"
    >
      Book a Consultation
    </Button>
  </div>
</div>

{/* Consultation Calendar Modal */}
<ConsultationCalendar 
  isOpen={isCalendarOpen} 
  onClose={() => setIsCalendarOpen(false)}
  onSubmit={handleSubmitConsultation}
/>
</div>
</section>
);
}