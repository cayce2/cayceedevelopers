import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send, MessageSquare } from "lucide-react";
import Link from "next/link";

export function ContactSection() {
  return (
    <section id="contacts" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-2">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600">
              Let&apos;s discuss your next project
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-center mb-8">
                <div className="bg-purple-100 p-3 rounded-full">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 ml-3">
                  Contact Us
                </h3>
              </div>
              
              <p className="text-gray-600 text-center mb-8">
                Fill out the form below or email us directly.
              </p>
              
              <form className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    className="w-full focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="w-full focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="How can we help you?"
                    className="w-full h-32 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center gap-2 py-6"
                >
                  <Send className="h-4 w-4" />
                  Send Message
                </Button>
              </form>
              
              <div className="mt-10 pt-8 border-t border-gray-100">
                <p className="text-sm text-gray-600 text-center">Or reach us directly at:</p>
                <div className="flex justify-center mt-3">
                  <Link
                    href="mailto:cayceedevelopers@gmail.com"
                    className="inline-flex items-center px-4 py-2 rounded-full bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
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