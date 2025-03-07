import Link from "next/link"
import { Twitter, Facebook, Instagram, Linkedin, Mail, ArrowRight } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-50 to-slate-100 border-t border-slate-200 py-16">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        {/* Newsletter Section */}
        <div className="mb-16 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-slate-600">Get the latest news and updates from our team.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-3 flex-1 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                Subscribe <ArrowRight className="h-4 w-4" />
              </button>  
            </div>
          </div>
        </div>
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center mb-6">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 p-[2px]">
                <div className="flex h-full w-full items-center justify-center rounded-xl bg-white">
                  <span className="font-bold text-transparent text-sm bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600">
                    C
                  </span>
                </div>
              </div>
              <span className="ml-3 text-xl font-bold">CayceeTech</span>
            </Link>
            <p className="text-slate-600 mb-6 max-w-md">
              Creating innovative digital solutions that help businesses thrive in the modern world. 
              We combine cutting-edge technology with creative thinking.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="#" aria-label="Twitter" className="bg-white p-2 rounded-full shadow-sm border border-slate-100 text-slate-500 hover:text-purple-600 hover:border-purple-200 transition-all">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="Facebook" className="bg-white p-2 rounded-full shadow-sm border border-slate-100 text-slate-500 hover:text-purple-600 hover:border-purple-200 transition-all">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="Instagram" className="bg-white p-2 rounded-full shadow-sm border border-slate-100 text-slate-500 hover:text-purple-600 hover:border-purple-200 transition-all">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="LinkedIn" className="bg-white p-2 rounded-full shadow-sm border border-slate-100 text-slate-500 hover:text-purple-600 hover:border-purple-200 transition-all">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="Email" className="bg-white p-2 rounded-full shadow-sm border border-slate-100 text-slate-500 hover:text-purple-600 hover:border-purple-200 transition-all">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-medium text-sm mb-4 text-slate-900">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-slate-600 hover:text-purple-600 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-purple-600 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-purple-600 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-purple-600 transition-colors">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-medium text-sm mb-4 text-slate-900">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-slate-600 hover:text-purple-600 transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-purple-600 transition-colors">
                  Mobile Apps
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-purple-600 transition-colors">
                  UI/UX Design
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-purple-600 transition-colors">
                  Consulting
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-medium text-sm mb-4 text-slate-900">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-slate-600 hover:text-purple-600 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-purple-600 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-purple-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-purple-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} CayceeTech. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <select className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>English (US)</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  )
}