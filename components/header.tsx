import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, Search, Bell } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"

const menuItems = [
  { href: "/#services", label: "Services" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative h-12 w-12 rounded-full bg-white p-2 shadow-md transition-transform group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="CayceeTech Logo"
                fill
                className="object-contain p-1"
                priority
              />
            </div>
            <span className="inline-block text-xl font-bold text-white tracking-tight">
              CayceeTech
            </span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="flex gap-2">
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 items-center justify-center rounded-full px-6 text-sm font-medium text-white transition-all hover:bg-white/20 hover:text-white focus:bg-white/20 focus:text-white focus:outline-none">
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-6">
          {/* Action Icons */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <Bell className="h-5 w-5" />
            </Button>
          </div>

          <Button
            variant="secondary"
            className="hidden md:flex bg-white text-indigo-600 hover:bg-white/90 font-semibold px-8 rounded-full shadow-md transition-all hover:shadow-lg"
          >
            Get Started
          </Button>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-10 w-10 text-white hover:bg-white/20">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-gradient-to-b from-indigo-600 to-purple-600">
              <SheetHeader className="border-b border-white/20 pb-6 mb-6">
                <Link href="/" className="flex items-center space-x-3">
                  <div className="relative h-10 w-10 rounded-full bg-white p-2">
                    <Image
                      src="/logo.png"
                      alt="CayceeTech Logo"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <span className="font-bold text-xl text-white">CayceeTech</span>
                </Link>
              </SheetHeader>
              <nav className="flex flex-col gap-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-6 py-3 text-sm font-medium text-white rounded-full hover:bg-white/20 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <Button className="mt-6 w-full bg-white text-indigo-600 hover:bg-white/90 rounded-full">
                  Get Started
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader;