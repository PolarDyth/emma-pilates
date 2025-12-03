"use client"

import { motion } from "framer-motion"
import { ReactNode, useEffect, useRef, useState } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  delay?: number
  className?: string
}

export default function AnimatedSection({ 
  children, 
  delay = 0, 
  className = "" 
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInInitialViewport, setIsInInitialViewport] = useState(false)

  useEffect(() => {
    // Check if element is in the top portion of viewport on mount
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      // Only consider it "initially visible" if it's in the top 50% of viewport
      const isInTopPortion = rect.top < window.innerHeight * 0.5 && rect.bottom > 0
      setIsInInitialViewport(isInTopPortion)
    }
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInInitialViewport ? { opacity: 1, y: 0 } : undefined}
      whileInView={!isInInitialViewport ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
} 