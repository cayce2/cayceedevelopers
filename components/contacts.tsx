"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/lib/use-translation"

export function ContactSection() {
  const { t } = useTranslation()
  
  return (
    <section id="contacts" className="py-16 bg-[#050a14] relative overflow-hidden">
      <div className="absolute inset-0 tech-grid"></div>
      <div className="absolute top-20 right-20 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl animate-float"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-2">
              {t('Get in Touch')}
            </h2>
            <p className="text-lg text-gray-400">
              {t('Lets discuss')}
            </p>
          </div>
          
          <div className="bg-[#0a0f1e]/80 backdrop-blur-sm shadow-xl border border-sky-500/20 overflow-hidden hover:border-sky-400 transition-all">
            <div className="p-8">
              <div className="flex items-center justify-center mb-8">
                <div className="bg-sky-500/10 p-3 border border-sky-500/30 animate-glow">
                  <MessageSquare className="h-6 w-6 text-sky-400" />
                </div>
                <h3 className="text-xl font-medium text-white ml-3">
                  {t('Contact Us')}
                </h3>
              </div>
              
              <p className="text-gray-400 text-center mb-8">
                {t('Fill out the form')}
              </p>
              
              <form className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    {t('Name')}
                  </label>
                  <Input
                    id="name"
                    placeholder={t('Your name')}
                    className="w-full bg-[#0a0f1e] border-sky-500/30 text-white placeholder:text-gray-500 focus:ring-sky-500 focus:border-sky-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    {t('Email')}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('your.email@example.com')}
                    className="w-full bg-[#0a0f1e] border-sky-500/30 text-white placeholder:text-gray-500 focus:ring-sky-500 focus:border-sky-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    {t('Message')}
                  </label>
                  <Textarea
                    id="message"
                    placeholder={t('How can we help')}
                    className="w-full h-32 bg-[#0a0f1e] border-sky-500/30 text-white placeholder:text-gray-500 focus:ring-sky-500 focus:border-sky-500"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center gap-2 py-6 shadow-lg shadow-sky-500/20 transition-all hover:shadow-sky-500/40 hover:scale-105"
                >
                  <Send className="h-4 w-4" />
                  {t('Send Message')}
                </Button>
              </form>
              
              <div className="mt-10 pt-8 border-t border-sky-500/20">
                <p className="text-sm text-gray-400 text-center">{t('Or reach us directly')}:</p>
                <div className="flex justify-center mt-3">
                  <Link
                    href="mailto:cayceedevelopers@gmail.com"
                    className="inline-flex items-center px-4 py-2 bg-sky-500/10 text-sky-400 border border-sky-500/30 hover:bg-sky-500/20 transition-all hover:scale-105"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    cayceedevelopers@gmail.com
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}