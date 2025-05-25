import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/placeholder.svg"
              alt="Sophia's Pilates Studio"
              fill
              priority
              className="object-cover"
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          {/* Content Container */}
          <div className="container relative z-10 py-16 md:py-24">
            <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[70vh]">
              {/* Main Content - Left Side */}
              <div className="lg:col-span-7">
                <div className="bg-white/95 backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-xl max-w-2xl">
                  <div className="space-y-6">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-dark leading-tight">
                      Emma&apos;s Pilates Studio
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                      Transform your body and mind through expert Pilates instruction tailored for all ages and
                      abilities.
                    </p>

                    <div className="pt-4">
                      <Button
                        asChild
                        size="lg"
                      >
                        <Link href="#contact">BOOK YOUR SESSIONS TODAY</Link>
                      </Button>
                    </div>

                    {/* Additional Info */}
                    <div className="pt-6 space-y-3">
                      <div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          <span>Master trainer with 12+ years experience</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          <span>Small group classes (max 8 participants)</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          <span>Personalized approach for ages 30-70</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Award Badge - Right Side */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="relative">
                  {/* Award Badge */}
                  <div className="bg-white/95 backdrop-blur-sm rounded-full p-8 shadow-xl border-4 border-primary/20 w-48 h-48 flex flex-col items-center justify-center text-center">
                    {/* Laurel Wreaths */}
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

                    {/* Badge Content */}
                    <div className="relative z-10 space-y-1">
                      <div className="text-xs font-medium text-muted-foreground tracking-wider">CERTIFIED</div>
                      <div className="text-2xl font-bold text-dark">ELITE</div>
                      <div className="text-xs font-medium text-muted-foreground">TRAINER</div>
                      <div className="text-sm font-semibold text-primary">Excellence</div>
                      <div className="text-lg font-bold text-dark">2024</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          >
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
            </div>
          </div>
        </section>
  );
}
