"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Clock, Users, Dumbbell, CheckCircle2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PilatesClass, getLevelDisplay, getLevelColor } from "@/lib/types/Class"
import { formatDuration, formatPrice } from "@/lib/class-service"
import AnimatedSection from "@/components/ui/animated-section"

interface ClassDetailClientProps {
  pilatesClass: PilatesClass
}

export default function ClassDetailClient({ pilatesClass }: ClassDetailClientProps) {
  const imageUrl = pilatesClass.image?.asset?.url || "/pilates/group-standing-up.jpeg"

  return (
    <div key={`class-${pilatesClass._id}`} className="min-h-screen bg-white">
      {/* Back Navigation */}
      <AnimatedSection>
        <div className="container mx-auto px-4 py-6">
          <Button asChild variant="ghost" className="text-gray-600 hover:text-primary">
            <Link href="/services">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Classes
            </Link>
          </Button>
        </div>
      </AnimatedSection>

      {/* Hero Section with Image */}
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Image Section */}
            <AnimatedSection delay={0.1}>
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-2xl">
                  <Image
                    src={imageUrl}
                    alt={pilatesClass.image?.alt || pilatesClass.title}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
                
                {/* Floating badges */}
                <Badge 
                  className={`absolute top-6 left-6 ${getLevelColor(pilatesClass.level)} border text-sm px-4 py-1.5`}
                >
                  {getLevelDisplay(pilatesClass.level)}
                </Badge>
              </div>
            </AnimatedSection>

            {/* Content Section */}
            <div className="space-y-6">
              <AnimatedSection delay={0.2}>
                {/* Category */}
                {pilatesClass.category && (
                  <Badge variant="secondary" className="mb-2 bg-primary/10 text-primary">
                    {pilatesClass.category.title}
                  </Badge>
                )}

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  {pilatesClass.title}
                </h1>

                {/* Description */}
                {pilatesClass.description && (
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {pilatesClass.description}
                  </p>
                )}
              </AnimatedSection>

              {/* Quick Info Cards */}
              <AnimatedSection delay={0.3}>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="text-xl font-bold text-gray-900">
                          {formatDuration(pilatesClass.duration)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {pilatesClass.maxParticipants && (
                    <Card className="bg-gradient-to-br from-secondary/10 to-secondary/20 border-secondary/30">
                      <CardContent className="p-5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-secondary/30 flex items-center justify-center">
                          <Users className="h-6 w-6 text-amber-700" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Class Size</p>
                          <p className="text-xl font-bold text-gray-900">
                            Max {pilatesClass.maxParticipants}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </AnimatedSection>

              {/* Price & CTA */}
              <AnimatedSection delay={0.4}>
                <Card className="bg-gray-50 border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Price per session</p>
                        <p className="text-3xl font-bold text-primary">
                          {formatPrice(pilatesClass.price)}
                        </p>
                      </div>
                      {pilatesClass.instructor && (
                        <div className="text-right">
                          <p className="text-sm text-gray-500 mb-1">Instructor</p>
                          <div className="flex items-center gap-2">
                            {pilatesClass.instructor.image?.asset?.url && (
                              <div className="w-8 h-8 rounded-full overflow-hidden">
                                <Image
                                  src={pilatesClass.instructor.image.asset.url}
                                  alt={pilatesClass.instructor.name}
                                  width={32}
                                  height={32}
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <span className="font-medium text-gray-900">
                              {pilatesClass.instructor.name}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button 
                        size="lg" 
                        className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-xl py-6"
                        asChild
                      >
                        <Link href="/timetable">View Schedule & Book</Link>
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary hover:text-white rounded-xl py-6"
                        asChild
                      >
                        <Link href="/#contact">Contact for Info</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>

          {/* Benefits & Equipment Section */}
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            {/* Benefits */}
            {pilatesClass.benefits && pilatesClass.benefits.length > 0 && (
              <AnimatedSection delay={0.5}>
                <Card className="h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-green-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">Key Benefits</h2>
                    </div>
                    <ul className="space-y-4">
                      {pilatesClass.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedSection>
            )}

            {/* Equipment */}
            {pilatesClass.equipment && pilatesClass.equipment.length > 0 && (
              <AnimatedSection delay={0.6}>
                <Card className="h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <Dumbbell className="h-5 w-5 text-purple-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">Equipment Needed</h2>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {pilatesClass.equipment.map((item, index) => (
                        <Badge 
                          key={index}
                          variant="outline"
                          className="text-sm px-4 py-2 bg-purple-50 text-purple-700 border-purple-200"
                        >
                          {item}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-6">
                      Don&apos;t have the equipment? No worries! All equipment is provided in our studio classes.
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            )}
          </div>

          {/* What to Expect Section */}
          <AnimatedSection delay={0.7}>
            <div className="mt-16">
              <Card className="bg-gradient-to-br from-accent/30 via-primary/5 to-secondary/20 border-none">
                <CardContent className="p-10 md:p-14">
                  <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                      What to Expect
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                      Each {pilatesClass.title} session is designed to challenge and support you at your level. 
                      You&apos;ll receive personalized attention and modifications as needed to ensure a safe, 
                      effective workout that leaves you feeling stronger and more balanced.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button 
                        size="lg" 
                        className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-primary/25"
                        asChild
                      >
                        <Link href="/timetable">Find Available Times</Link>
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-6 text-lg rounded-xl"
                        asChild
                      >
                        <Link href="/services">Explore Other Classes</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  )
}

