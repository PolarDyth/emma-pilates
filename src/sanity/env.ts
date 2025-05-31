export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION

if (!dataset) {
  throw new Error(
    "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET"
  )
}

if (!projectId) {
  throw new Error(
    "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID"
  )
}