"use client"

import type React from "react"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Home, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 relative overflow-hidden bg-gradient-to-b from-accent/30 to-white">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl"
            animate={{
              x: [0, 20, 0],
              y: [0, 15, 0],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] rounded-full bg-secondary/10 blur-3xl"
            animate={{
              x: [0, -20, 0],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 18,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </div>

        <div className="container mx-auto relative z-10 py-16 md:py-24 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link href="/" className="inline-block">
              <span className="text-3xl font-bold text-primary">Emma&apos;s Pilates</span>
            </Link>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6 mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
            >
              404 Error
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-dark"
            >
              Page Not Found
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground"
            >
              Oops! The page you&apos;re looking for seems to have stretched a bit too far.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative w-full max-w-md h-[300px] rounded-2xl overflow-hidden shadow-xl mb-12"
          >
            <Image
              src="/placeholder.svg?height=600&width=800&query=person doing pilates stretch looking confused"
              alt="Page Not Found"
              fill
              priority
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-md w-full space-y-6"
          >

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" className="flex items-center gap-2">
                <Link href="/">
                  <Home className="h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
              <Button asChild className="flex items-center gap-2">
                <Link href="/timetable">
                  <ArrowLeft className="h-4 w-4" />
                  View Class Schedule
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 p-6 bg-accent/20 rounded-lg max-w-2xl"
          >
            <h3 className="font-bold text-lg mb-2">Looking for something specific?</h3>
            <p className="mb-4">Here are some helpful links to get you back on track:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <Link href="/about" className="text-primary hover:underline">
                About Emma
              </Link>
              <Link href="/services" className="text-primary hover:underline">
                Our Services
              </Link>
              <Link href="/timetable" className="text-primary hover:underline">
                Class Schedule
              </Link>
              <Link href="/videos" className="text-primary hover:underline">
                Video Gallery
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
