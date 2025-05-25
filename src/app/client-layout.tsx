"use client"

import type React from "react"
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

  return (
    <main>
      {/* Header */}
      <header className="sticky top-0 z-50 mx-auto w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <motion.span
              className="text-xl font-bold text-primary"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Emma&apos;s Pilates
            </motion.span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <NavLink href="/" active={pathname === "/"}>
              Home
            </NavLink>
            <NavLink href="/about" active={pathname === "/about"}>
              About
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
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                href="/#contact"
                className="hidden md:inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Get in Touch
              </Link>
            </motion.div>
            <motion.button className="md:hidden" whileTap={{ scale: 0.95 }}>
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </motion.button>
          </div>
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.main>
      </AnimatePresence>

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
