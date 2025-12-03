"use client"

import { motion, useInView } from "framer-motion"
import { ReactNode, useRef, useState, useEffect } from "react"

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
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [hasAnimated, setHasAnimated] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Track mount state to handle initial render
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Track when animation should trigger
  useEffect(() => {
    if (isMounted && isInView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isMounted, isInView, hasAnimated])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.6,
        delay: hasAnimated ? delay : 0,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
} 