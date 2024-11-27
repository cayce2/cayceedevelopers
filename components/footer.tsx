import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import Image from "next/image"


export function SiteFooter() {
  const socialLinks = [
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Github, label: "GitHub", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col items-center justify-between gap-6 py-8 md:h-28 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8">
            <Image
                src="/logo.png"
                alt="CayceeTech Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-semibold">CayceeTech</span>
          </div>
          <Separator orientation="vertical" className="hidden h-6 md:block" />
          <p className="text-center text-sm text-muted-foreground md:text-left">
            Where design meets creativity. © {currentYear}
          </p>
        </div>

        <TooltipProvider>
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <Tooltip key={label}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="transition-colors hover:bg-muted"
                    asChild
                  >
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      <Icon className="h-5 w-5" />
                      <span className="sr-only">{label}</span>
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  {label}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </div>
    </footer>
  );
}

export default SiteFooter;