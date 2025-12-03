"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import "./globals.css"
import { motion, AnimatePresence } from "framer-motion"
import Footer from "@/components/ui/footer"

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <main>
      {/* Header */}
      <header className="sticky top-0 z-50 mx-auto w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <motion.span
              className="text-lg sm:text-xl font-bold text-primary"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Emma&apos;s Pilates
            </motion.span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-4 lg:gap-6">
            <NavLink href="/" active={pathname === "/"}>
              Home
            </NavLink>
            <NavLink href="/blog" active={pathname === "/about"}>
              Blog
            </NavLink>
            <NavLink href="/#services" active={pathname.includes("#services")}>
              Services
            </NavLink>
            <NavLink href="/timetable" active={pathname === "/timetable"}>
              Timetable
            </NavLink>
            <NavLink href="/videos" active={pathname === "/videos"}>
              Videos
            </NavLink>
            <NavLink href="/#contact" active={pathname.includes("#contact")}>
              Contact
            </NavLink>
          </nav>
          
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Desktop CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden lg:block"
            >
              <Link
                href="/#contact"
                className="inline-flex h-8 lg:h-9 items-center justify-center rounded-md bg-primary px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Get in Touch
              </Link>
            </motion.div>
            
            {/* Mobile Menu Button */}
            <motion.button 
              className="md:hidden p-2 -m-2" 
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={mobileMenuOpen ? "open" : "closed"}
                className="w-6 h-6 relative"
              >
                <motion.span
                  className="absolute h-0.5 w-6 bg-current transform origin-center"
                  style={{ top: "8px" }}
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 4 }
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="absolute h-0.5 w-6 bg-current transform origin-center"
                  style={{ top: "12px" }}
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="absolute h-0.5 w-6 bg-current transform origin-center"
                  style={{ top: "16px" }}
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -4 }
                  }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            </motion.button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="md:hidden border-t bg-background/95 backdrop-blur"
            >
              <nav className="container mx-auto px-4 py-4 space-y-3">
                <MobileNavLink 
                  href="/" 
                  active={pathname === "/"} 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </MobileNavLink>
                <MobileNavLink 
                  href="/about" 
                  active={pathname === "/about"}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </MobileNavLink>
                <MobileNavLink 
                  href="/#services" 
                  active={pathname.includes("#services")}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Services
                </MobileNavLink>
                <MobileNavLink 
                  href="/timetable" 
                  active={pathname === "/timetable"}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Timetable
                </MobileNavLink>
                <MobileNavLink 
                  href="/videos" 
                  active={pathname === "/videos"}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Videos
                </MobileNavLink>
                <MobileNavLink 
                  href="/#contact" 
                  active={pathname.includes("#contact")}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </MobileNavLink>
                
                {/* Mobile CTA Button */}
                <div className="pt-2">
                  <Link
                    href="/#contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    Get in Touch
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}        </AnimatePresence>
      </header>

      <div
        className="relative z-0"
        onClick={() => mobileMenuOpen && setMobileMenuOpen(false)}
      >
        {children}
      </div>

      {/* Footer */}
      <Footer />
    </main>
  )
}

interface NavLinkProps {
  href: string
  active: boolean
  children: React.ReactNode
}

function NavLink({ href, active, children }: NavLinkProps) {
  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ 
        scale: 1.1,
        transition: { 
          duration: 0.2, 
          ease: [0.4, 0, 0.2, 1] 
        }
      }}
      whileTap={{ 
        scale: 0.95,
        transition: { 
          duration: 0.1, 
          ease: [0.4, 0, 0.2, 1] 
        }
      }}
      className="relative"
    >
      <Link href={href} className={`text-sm font-medium relative block ${active ? "text-primary" : "hover:text-primary transition-colors duration-200"}`}>
        {children}
        {active && (
          <motion.span
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
            layoutId="activeNavIndicator"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ 
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1]
            }}
          />
        )}
      </Link>
    </motion.div>
  )
}

interface MobileNavLinkProps {
  href: string
  active: boolean
  children: React.ReactNode
  onClick: () => void
}

function MobileNavLink({ href, active, children, onClick }: MobileNavLinkProps) {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      whileTap={{ scale: 0.98 }}
      className="relative"
    >
      <Link 
        href={href} 
        onClick={onClick}
        className={`block py-2 px-3 rounded-md text-base font-medium transition-colors duration-200 ${
          active 
            ? "text-primary bg-primary/10" 
            : "text-foreground hover:text-primary hover:bg-primary/5"
        }`}
      >
        {children}
        {active && (
          <motion.span
            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full"
            layoutId="activeMobileNavIndicator"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ 
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1]
            }}
          />
        )}
      </Link>
    </motion.div>
  )
}
