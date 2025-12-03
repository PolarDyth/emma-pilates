"use client"

import React, { useState, useMemo } from "react"
import { PilatesClass, getLevelDisplay, getLevelColor } from "@/lib/types/Class"
import ClassCard from "./class-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import AnimatedSection from "@/components/ui/animated-section"
import { Search } from "lucide-react"

interface ServicesClientPageProps {
  classes: PilatesClass[]
}

const levelFilters = [
  { value: null, label: "All Levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "all-levels", label: "All Levels Classes" },
]

export default function ServicesClientPage({ classes }: ServicesClientPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)

  // Filter classes based on search query and level
  const filteredClasses = useMemo(() => {
    let filtered = classes

    // Filter by level
    if (selectedLevel) {
      filtered = filtered.filter(c => c.level === selectedLevel)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(c =>
        c.title.toLowerCase().includes(query) ||
        c.description?.toLowerCase().includes(query) ||
        c.benefits?.some(b => b.toLowerCase().includes(query)) ||
        c.category?.title.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [classes, searchQuery, selectedLevel])

  const handleLevelChange = (level: string | null) => {
    setSelectedLevel(level)
  }

  return (
    <div key="services-page" className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/5 via-accent/20 to-secondary/10 border-b">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">
                Our Classes
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900">
                Discover Your Perfect<br />
                <span className="text-primary">Pilates Class</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                From gentle beginner sessions to challenging advanced workouts, find the class 
                that matches your goals and fitness level. Every body is welcome.
              </p>
              
              {/* Quote */}
              <blockquote className="text-lg italic text-primary/80 font-medium">
                &quot;Physical fitness is the first requisite of happiness&quot;
              </blockquote>
              <cite className="text-sm text-muted-foreground mt-1 block">
                — Joseph Pilates
              </cite>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <AnimatedSection delay={0.1}>
          <div className="max-w-7xl mx-auto mb-12">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start lg:items-center">
              {/* Search Section */}
              <div className="w-full lg:w-96 flex-shrink-0">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search classes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* Level Filter Section */}
              <div className="w-full lg:flex-1">
                <div className="flex flex-wrap gap-3">
                  {levelFilters.map((filter) => (
                    <Button
                      key={filter.value || "all"}
                      onClick={() => handleLevelChange(filter.value)}
                      variant={selectedLevel === filter.value ? "default" : "outline"}
                      className={`rounded-full px-5 py-2 transition-all duration-200 ${
                        selectedLevel === filter.value
                          ? "bg-primary text-white shadow-lg shadow-primary/25"
                          : "hover:bg-primary/10 hover:border-primary"
                      }`}
                    >
                      {filter.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Results Info */}
        <AnimatedSection delay={0.2}>
          <div className="max-w-7xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-gray-600">
                {searchQuery || selectedLevel ? (
                  <>
                    Showing <span className="font-semibold text-gray-900">{filteredClasses.length}</span> class{filteredClasses.length !== 1 ? 'es' : ''}
                    {searchQuery && (
                      <> matching &ldquo;<span className="font-medium text-primary">{searchQuery}</span>&rdquo;</>
                    )}
                    {selectedLevel && (
                      <> at <Badge className={`ml-1 ${getLevelColor(selectedLevel)}`}>{getLevelDisplay(selectedLevel)}</Badge> level</>
                    )}
                  </>
                ) : (
                  <>
                    Explore all <span className="font-semibold text-gray-900">{filteredClasses.length}</span> available classes
                  </>
                )}
              </p>
              
              {(searchQuery || selectedLevel) && (
                <div className="flex gap-2">
                  {searchQuery && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setSearchQuery("")}
                      className="text-sm"
                    >
                      Clear search
                    </Button>
                  )}
                  {selectedLevel && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setSelectedLevel(null)}
                      className="text-sm"
                    >
                      Clear filter
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </AnimatedSection>

        {/* Classes Grid */}
        <div className="max-w-7xl mx-auto">
          {filteredClasses.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredClasses.map((pilatesClass, index) => (
                <AnimatedSection
                  key={pilatesClass._id}
                  delay={Math.min(index * 0.1, 0.5)}
                >
                  <ClassCard pilatesClass={pilatesClass} />
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <AnimatedSection delay={0.2}>
              <div className="text-center py-16">
                <div className="max-w-md mx-auto bg-white rounded-2xl border p-8 shadow-sm">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">No classes found</h3>
                  <p className="text-gray-600 mb-6">
                    {searchQuery && selectedLevel && (
                      <>No classes match &ldquo;{searchQuery}&rdquo; at {getLevelDisplay(selectedLevel)} level. Try different keywords or filters.</>
                    )}
                    {searchQuery && !selectedLevel && (
                      <>No classes match &ldquo;{searchQuery}&rdquo;. Try different search terms.</>
                    )}
                    {!searchQuery && selectedLevel && (
                      <>No {getLevelDisplay(selectedLevel)} classes available right now. Check out other levels!</>
                    )}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    {searchQuery && (
                      <Button 
                        onClick={() => setSearchQuery("")}
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        Clear search
                      </Button>
                    )}
                    {selectedLevel && (
                      <Button 
                        onClick={() => setSelectedLevel(null)}
                        className="bg-primary text-white hover:bg-primary/90"
                      >
                        View all classes
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>

        {/* CTA Section */}
        <AnimatedSection delay={0.4}>
          <div className="max-w-4xl mx-auto mt-20 text-center">
            <div className="bg-gradient-to-br from-primary/10 via-accent/30 to-secondary/20 rounded-3xl p-10 md:p-14">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Not sure which class is right for you?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Book a free consultation and let&apos;s discuss your goals, experience level, 
                and find the perfect class for your Pilates journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-primary/25"
                  asChild
                >
                  <a href="/#contact">Book Free Consultation</a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-6 text-lg rounded-xl"
                  asChild
                >
                  <a href="/timetable">View Timetable</a>
                </Button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  )
}

