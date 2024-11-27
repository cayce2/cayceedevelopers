import React from 'react';
import { Github, Twitter, Linkedin, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export function SiteFooter() {
  const socialLinks = [
    { icon: Twitter, label: "Twitter", href: "#", color: "text-blue-400" },
    { icon: Github, label: "GitHub", href: "#", color: "text-purple-400" },
    { icon: Linkedin, label: "LinkedIn", href: "#", color: "text-sky-400" }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full border-t">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-100 via-pink-100 to-cyan-100 opacity-50" />
      
      {/* Glass effect container */}
      <div className="relative backdrop-blur-sm">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center justify-between gap-8 py-12 md:flex-row md:py-8">
            {/* Logo and branding section */}
            <div className="flex flex-col items-center gap-6 md:flex-row md:gap-8">
              <div className="group flex items-center gap-3 transition-transform hover:scale-105">
                <div className="relative h-10 w-10 overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src="/logo.png"
                    alt="CayceeTech Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-xl font-bold text-transparent">
                  CayceeTech
                </span>
              </div>
              
              <Separator orientation="vertical" className="hidden h-8 md:block" />
              
              <p className="text-center text-sm text-gray-600 md:text-left">
                Where design meets creativity.
                <br className="md:hidden" />
                <span className="mt-1 block text-xs md:inline md:ml-1">
                  © {currentYear} All rights reserved.
                </span>
              </p>
            </div>

            {/* Social links section */}
            <TooltipProvider>
              <div className="flex items-center gap-4">
                {socialLinks.map(({ icon: Icon, label, href, color }) => (
                  <Tooltip key={label}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="group relative overflow-hidden rounded-xl bg-white/50 transition-all hover:scale-110 hover:bg-white hover:shadow-lg"
                      >
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <Icon className={`h-5 w-5 transition-colors group-hover:${color}`} />
                          <span className="sr-only">{label}</span>
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="bg-white/80 backdrop-blur-sm">
                      <span className="flex items-center gap-1">
                        {label}
                        <ExternalLink className="h-3 w-3" />
                      </span>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;