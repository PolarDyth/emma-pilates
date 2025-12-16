import { client } from "@/sanity/client"
import { PilatesClass } from "@/lib/types/Class"
import { allClassesQuery, classBySlugQuery } from "@/sanity/queries"

// Fetch all classes from Sanity
export async function getClasses(): Promise<PilatesClass[]> {
  try {
    const classes: PilatesClass[] = await client.fetch(allClassesQuery)
    return classes
  } catch (error) {
    console.error("Error fetching classes:", error)
    return []
  }
}

// Fetch a single class by slug from Sanity
export async function getClassBySlug(slug: string): Promise<PilatesClass | null> {
  try {
    const pilatesClass: PilatesClass = await client.fetch(classBySlugQuery, { slug })
    return pilatesClass || null
  } catch (error) {
    console.error("Error fetching class:", error)
    return null
  }
}

// Format duration for display
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`
  }
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  if (remainingMinutes === 0) {
    return `${hours} hr`
  }
  return `${hours} hr ${remainingMinutes} min`
}

// Format price for display
export function formatPrice(price?: number): string {
  if (!price) return "Contact for pricing"
  return `£${price.toFixed(2)}`
}

