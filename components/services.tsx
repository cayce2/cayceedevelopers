"use client"

import React, { useState } from "react";
import { Code, Smartphone, Palette, ArrowRight, LucideIcon, Zap, LineChart, Lock, Calendar, Clock, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/use-translation"

type ServiceCardProps = {
  icon: LucideIcon
  title: string
  subtitle: string
  description: string
  color: string
  featured?: boolean
}

function ServiceCard({ icon: Icon, title, subtitle, description, color, featured = false }: ServiceCardProps) {
  const { t } = useTranslation()

  return (
    <div className={`group relative bg-[#0a0f1e]/80 backdrop-blur-sm p-6 md:p-8 ${featured ? 'border-2 border-sky-500/50 shadow-lg shadow-sky-500/20' : 'border border-sky-500/20'} hover:shadow-xl hover:shadow-sky-500/30 transition-all hover:-translate-y-2 overflow-hidden`}>
      {featured && (
        <div className="absolute top-0 right-0">
          <div className="bg-sky-500 text-white text-xs font-medium py-1 px-3 shadow-lg">{t('Popular')}</div>
        </div>
      )}
      
      <div className={`p-3 w-14 h-14 flex items-center justify-center mb-5 mx-auto transition-transform group-hover:scale-110 ${color}`}>
        <Icon className="h-6 w-6" />
      </div>
      
      <h3 className="text-xl font-bold mb-2 text-white group-hover:text-sky-400 transition-colors text-center">{title}</h3>
      <p className="text-sm font-medium text-gray-400 mb-3 text-center">{subtitle}</p>
      <p className="text-gray-300 mb-6 text-center">{description}</p>
      
      <div className="flex justify-center">
        <Button variant="ghost" className="group/btn p-0 h-auto hover:bg-transparent">
          <span className="text-sky-400 font-medium group-hover/btn:text-sky-300 flex items-center">
            {t('Learn more')} 
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
  const { t } = useTranslation()
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
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden border border-sky-500/20">
        <div className="flex justify-between items-center p-4 border-b border-sky-500/20 bg-gradient-to-r from-sky-500/10 to-blue-600/10">
          <h3 className="text-xl font-bold text-slate-900">{t('Schedule a Consultation')}</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          {/* Personal Information */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              <User className="inline h-4 w-4 mr-1" />
              {t('Your Name')}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md"
              placeholder={t('Enter your name')}
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {t('Email Address')}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md"
              placeholder={t('Enter your email')}
              required
            />
          </div>
          
          {/* Date Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              <Calendar className="inline h-4 w-4 mr-1" />
              {t('Select a Date')}
            </label>
            <div className="grid grid-cols-4 gap-2">
              {generateDates().map((date, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedDate(date)}
                  className={`text-center p-2 text-sm transition-all ${
                    selectedDate && date.toDateString() === selectedDate.toDateString()
                      ? 'bg-sky-500 text-white border border-sky-400 shadow-lg scale-105'
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
              {t('Select a Time')}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`text-center p-2 text-sm transition-all ${
                    selectedTime === time
                      ? 'bg-sky-500 text-white border border-sky-400 shadow-lg scale-105'
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
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 transition-all shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40"
              disabled={submitting}
            >
              {submitting ? t('Processing...') : t('Confirm Appointment')}
            </Button>
          </div>
          
          <p className="mt-3 text-xs text-slate-500 text-center">
            {t('Your booking details will be sent to our team and you\'ll receive a confirmation email shortly.')}
          </p>
        </form>
      </div>
    </div>
  );
}

export function ServicesSection() {
  const { t } = useTranslation()
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  
  const handleSubmitConsultation = (data: { name: string; email: string; date: string; time: string; recipientEmail?: string }) => {
    console.log("Consultation request:", data);
    alert(`Thank you, ${data.name}! Your consultation has been scheduled for ${data.date} at ${data.time}. We'll email you a confirmation shortly.`);
  };

  const serviceCards = [
    {
      icon: Code,
      title: t("Web Development"),
      subtitle: t("Custom websites and web applications"),
      description: t("Modern, responsive websites built with the latest technologies like React, Next.js, and Tailwind CSS."),
      color: "bg-sky-500/10 text-sky-400",
      featured: true
    },
    {
      icon: Smartphone,
      title: t("Mobile Apps"),
      subtitle: t("Native and cross-platform solutions"),
      description: t("Engaging mobile experiences for iOS and Android platforms using React Native and Flutter."),
      color: "bg-blue-500/10 text-blue-400"
    },
    {
      icon: Palette,
      title: t("UI/UX Design"),
      subtitle: t("User-centered design solutions"),
      description: t("Beautiful, intuitive interfaces that deliver exceptional user experiences across all devices."),
      color: "bg-cyan-500/10 text-cyan-400"
    },
    {
      icon: Zap,
      title: t("Performance Optimization"),
      subtitle: t("Speed and efficiency improvements"),
      description: t("Enhance your digital products with optimized loading times and smoother interactions."),
      color: "bg-indigo-500/10 text-indigo-400"
    },
    {
      icon: LineChart,
      title: t("Growth Strategy"),
      subtitle: t("Data-driven approach"),
      description: t("Leverage analytics and user insights to drive continuous improvement and business growth."),
      color: "bg-violet-500/10 text-violet-400"
    },
    {
      icon: Lock,
      title: t("Security Solutions"),
      subtitle: t("Protection for digital assets"),
      description: t("Implement robust security measures to safeguard your applications and user data."),
      color: "bg-purple-500/10 text-purple-400"
    }
  ];

  return (
    <section id="services" className="py-24 bg-[#0a0f1e] relative overflow-hidden">
      {/* Background design elements */}
      <div className="absolute inset-0 tech-grid"></div>
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute -top-48 -left-48 w-96 h-96 rounded-full bg-sky-500/10 blur-3xl animate-float"></div>
        <div className="absolute -bottom-48 -right-48 w-96 h-96 rounded-full bg-sky-500/10 blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
      </div>
      
      <div className="container px-4 md:px-6 mx-auto max-w-6xl">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <div className="inline-flex items-center px-3 py-1 mb-4 text-xs font-medium rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30 backdrop-blur-sm">
            {t('What We Offer')}
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            {t('Our Services').split(' ').map((word, index) => 
              index === 1 ? <span key={index} className="text-sky-400">{word}</span> : <span key={index}>{word} </span>
            )}
          </h2>
          <p className="text-lg text-gray-400">
            {t('Comprehensive solutions')}
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
        <div className="mt-16 bg-sky-500/10 backdrop-blur-sm p-8 md:p-10 text-white shadow-lg border border-sky-500/20 relative overflow-hidden hover:border-sky-400 transition-all">
  <div className="absolute inset-0 -z-10 opacity-5">
    <svg className="absolute right-0 top-0 h-full" width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="400" cy="0" r="200" fill="white" />
      <circle cx="0" cy="400" r="200" fill="white" />
    </svg>
  </div>
  
  <div className="max-w-3xl mx-auto text-center">
    <h3 className="text-2xl md:text-3xl font-bold mb-4">{t('Ready to transform')}</h3>
    <p className="text-gray-300 mb-8 max-w-lg mx-auto">
      {t('Schedule consultation')}
    </p>
    <Button 
      onClick={() => setIsCalendarOpen(true)}
      className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 font-medium shadow-lg shadow-sky-500/30 transition-all hover:shadow-sky-500/50 hover:scale-105"
    >
      {t('Book a Consultation')}
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