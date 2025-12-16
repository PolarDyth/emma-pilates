"use client"

import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/emma/emma-sunset.jpeg"
          alt="Emma performing Pilates exercise at sunset beach - Professional Pilates instructor demonstrating form and technique"
          fill
          priority
          className="object-cover scale-125 -translate-x-40 object-center"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30 sm:bg-black/20"></div>
      </div>
      {/* Content Container */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="container relative z-10 py-8 sm:py-16 md:py-20 lg:py-24 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center min-h-[70vh]">
            {/* Award Badge - Mobile: Above text, Desktop: Right Side */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div 
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.3,
                  ease: [0.21, 0.47, 0.32, 0.98] 
                }}
              >
                {/* Award Badge - Responsive sizes */}
                <div className="bg-white/95 backdrop-blur-sm rounded-full p-4 sm:p-6 lg:p-8 shadow-xl border-4 border-primary/20 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 flex flex-col items-center justify-center text-center">
                  {" "}
                  {/* Laurel Wreaths - Responsive SVG */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="w-full h-full text-primary/30"
                      viewBox="0 0 200 200"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Left Laurel */}
                      <path
                        d="M60 100C50 90 45 80 50 70C55 60 65 55 75 60C85 65 90 75 85 85C80 95 70 100 60 100Z"
                        fill="currentColor"
                      />
                      <path
                        d="M50 110C40 100 35 90 40 80C45 70 55 65 65 70C75 75 80 85 75 95C70 105 60 110 50 110Z"
                        fill="currentColor"
                      />
                      <path
                        d="M45 125C35 115 30 105 35 95C40 85 50 80 60 85C70 90 75 100 70 110C65 120 55 125 45 125Z"
                        fill="currentColor"
                      />

                      {/* Right Laurel */}
                      <path
                        d="M140 100C150 90 155 80 150 70C145 60 135 55 125 60C115 65 110 75 115 85C120 95 130 100 140 100Z"
                        fill="currentColor"
                      />
                      <path
                        d="M150 110C160 100 165 90 160 80C155 70 145 65 135 70C125 75 120 85 125 95C130 105 140 110 150 110Z"
                        fill="currentColor"
                      />
                      <path
                        d="M155 125C165 115 170 105 165 95C160 85 150 80 140 85C130 90 125 100 130 110C135 120 145 125 155 125Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  {/* Badge Content - Responsive text sizes */}
                  <div className="relative z-10 space-y-0.5 sm:space-y-1">
                    <div className="text-[10px] sm:text-xs font-medium text-muted-foreground tracking-wider">
                      CERTIFIED
                    </div>
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-dark">
                      ELITE
                    </div>
                    <div className="text-[10px] sm:text-xs font-medium text-muted-foreground">
                      TRAINER
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-primary">
                      Excellence
                    </div>
                    <div className="text-sm sm:text-base lg:text-lg font-bold text-dark">
                      2024
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Main Content - Mobile: Below badge, Desktop: Left Side */}
            <div className="lg:col-span-7 flex justify-center lg:justify-end">
              <motion.div 
                className="bg-white/95 backdrop-blur-sm p-4 sm:p-6 md:p-8 lg:p-12 rounded-lg shadow-xl w-full max-w-lg sm:max-w-xl lg:max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.1,
                  ease: [0.21, 0.47, 0.32, 0.98] 
                }}
              >
                <div className="space-y-4 sm:space-y-6">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-dark leading-tight">
                    Emma&apos;s Pilates Studio
                  </h1>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                    Transform your body and mind through expert Pilates
                    instruction tailored for all ages and abilities.
                  </p>

                  <div className="pt-2 sm:pt-4">
                    <Button
                      asChild
                      size="lg"
                      className="w-full sm:w-auto text-sm sm:text-base"
                    >
                      <Link href="#contact">BOOK YOUR SESSIONS TODAY</Link>
                    </Button>
                  </div>

                  {/* Additional Info - Responsive spacing and sizing */}
                  <motion.div 
                    className="pt-4 sm:pt-6 space-y-2 sm:space-y-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.6 
                    }}
                  >
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Master trainer with 12+ years experience</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Small group classes (max 8 participants)</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>Personalized approach for ages 30-70</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* Scroll Indicator - Hidden on small screens */}
      <motion.div 
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden md:block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ 
          duration: 0.6, 
          delay: 1.2 
        }}
      >
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white rounded-full flex justify-center opacity-80 hover:opacity-100 transition-opacity">
          <div className="w-1 h-2 sm:h-3 bg-white rounded-full mt-1.5 sm:mt-2 animate-bounce"></div>
        </div>
      </motion.div>
    </section>
  );
}
