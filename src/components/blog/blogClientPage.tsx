"use client"

import React from "react"
import { useState, useEffect, useMemo } from "react"
import { BlogPost, Category } from "@/lib/types/Blog"
import BlogCard from "./blogCard"
import BlogSearch from "./blog-search"
import { ClientPagination } from "@/components/ui/client-pagination"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import AnimatedSection from "@/components/ui/animated-section"

interface BlogPageClientProps {
  initialPosts: BlogPost[]
  categories: Category[]
}

export default function BlogPageClient({ initialPosts, categories }: BlogPageClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  
  const postsPerPage = 6

  // Filter posts based on search query and category
  const filteredPosts = useMemo(() => {
    let filtered = initialPosts

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(post => post.category?.title === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)))
      )
    }

    return filtered
  }, [initialPosts, searchQuery, selectedCategory])

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1) // Reset to first page
  }

  const handleCategoryChange = (categoryTitle: string | null) => {
    setSelectedCategory(categoryTitle)
    setCurrentPage(1) // Reset to first page
  }

  const paginatedPosts = filteredPosts.slice(startIndex, endIndex)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  // Reset current page when filters change
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1)
    }
  }, [filteredPosts.length, totalPages, currentPage])

  return (
    <div key="blog-page" className="min-h-screen bg-white">
      {/* Simple Header Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">
                Pilates Blog
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
                Expert Insights & Tips
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover the latest in Pilates, health, and wellness with expert guidance. From beginner tips to
                advanced techniques, find everything you need for your fitness journey.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Category Filter Section */}
        <AnimatedSection delay={0.1}>
          <div className="max-w-7xl mx-auto mb-12">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start lg:items-center">
              {/* Search Section */}
              <div className="w-full lg:w-96 flex-shrink-0">
                <BlogSearch onSearch={handleSearch} />
              </div>

              {/* Category Filter Section */}
              <div className="w-full lg:flex-1">
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={() => handleCategoryChange(null)}
                    variant={selectedCategory === null ? "default" : "outline"}
                    className={`rounded-full px-6 py-2 transition-all duration-200 ${selectedCategory === null
                      ? "bg-primary text-white"
                      : "hover:bg-primary/10 hover:border-primary"
                    }`}
                  >
                    All
                  </Button>
                  
                  {categories.map((category) => (
                    <Button
                      key={category._id}
                      onClick={() => handleCategoryChange(category.title)}
                      variant={selectedCategory === category.title ? "default" : "outline"}
                      className={`rounded-full px-6 py-2 transition-all duration-200 ${selectedCategory === category.title
                        ? "bg-primary text-white"
                        : "hover:bg-primary/10 hover:border-primary"
                      }`}
                    >
                      {category.title}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Results Info */}
        <AnimatedSection delay={0.2}>
          <div className="max-w-7xl mx-auto mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-gray-600">
                {searchQuery || selectedCategory ? (
                  <>
                    Showing {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''}
                    {searchQuery && (
                      <> for &ldquo;<span className="font-medium text-primary">{searchQuery}</span>&rdquo;</>
                    )}
                    {selectedCategory && (
                      <> in <span className="font-medium text-primary">{selectedCategory}</span></>
                    )}
                  </>
                ) : (
                  <>
                    Showing {filteredPosts.length} articles in All
                  </>
                )}
              </p>
              
              {(searchQuery || selectedCategory) && (
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
                  {selectedCategory && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setSelectedCategory(null)}
                      className="text-sm"
                    >
                      Clear category
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </AnimatedSection>

        {/* Blog Posts Grid */}
        <div className="max-w-7xl mx-auto">
          {filteredPosts.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {paginatedPosts.map((post, index) => (
                  <AnimatedSection
                    key={post._id}
                    delay={index * 0.1}
                  >
                    <BlogCard post={post} />
                  </AnimatedSection>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <AnimatedSection delay={0.3}>
                  <ClientPagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </AnimatedSection>
              )}
            </>
          ) : (
            <AnimatedSection delay={0.2}>
              <div className="text-center py-16">
                <div className="max-w-md mx-auto bg-white rounded-lg border p-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                  <p className="text-gray-600 mb-6">
                    {searchQuery && selectedCategory && (
                      <>No articles match &ldquo;{searchQuery}&rdquo; in {selectedCategory}. Try different keywords or browse other categories.</>
                    )}
                    {searchQuery && !selectedCategory && (
                      <>No articles match &ldquo;{searchQuery}&rdquo;. Try different keywords or browse by category.</>
                    )}
                    {!searchQuery && selectedCategory && (
                      <>No articles found in {selectedCategory}. Try browsing other categories.</>
                    )}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    {searchQuery && (
                      <Button 
                        onClick={() => setSearchQuery("")}
                        variant="outline"
                        className="text-primary border-primary hover:bg-primary hover:text-white"
                      >
                        Clear search
                      </Button>
                    )}
                    {selectedCategory && (
                      <Button 
                        onClick={() => setSelectedCategory(null)}
                        variant="outline"
                        className="text-primary border-primary hover:bg-primary hover:text-white"
                      >
                        View all categories
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>
      </div>
    </div>
  )
}
