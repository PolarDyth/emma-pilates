import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'

export async function POST(request: NextRequest) {
  try {
    // Get the webhook secret from environment variables
    const webhookSecret = process.env.SANITY_WEBHOOK_SECRET
    
    if (!webhookSecret) {
      console.error('SANITY_WEBHOOK_SECRET is not configured')
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
    }

    // Get the raw body as text for signature validation
    const body = await request.text()
    const signature = request.headers.get(SIGNATURE_HEADER_NAME)

    if (!signature) {
      console.error('No webhook signature provided')
      return NextResponse.json({ error: 'Unauthorized - No signature provided' }, { status: 401 })
    }

    // Validate the webhook using Sanity's official package
    const isValid = await isValidSignature(body, signature, webhookSecret)

    if (!isValid) {
      console.error('Invalid webhook signature')
      return NextResponse.json({ error: 'Unauthorized - Invalid signature' }, { status: 401 })
    }

    // Parse the validated body
    const parsedBody = JSON.parse(body)

    console.log('Sanity webhook received:', {
      documentType: parsedBody._type,
      documentId: parsedBody._id,
      operation: parsedBody._operation || 'unknown'
    })

    // Handle different document types
    const documentType = parsedBody._type
    
    if (documentType === 'blogPost') {
      // Revalidate blog-related pages
      revalidatePath('/blog')
      revalidatePath('/blog/[slug]', 'page')
      
      // If we have a slug, revalidate the specific post
      if (parsedBody.slug?.current) {
        revalidatePath(`/blog/${parsedBody.slug.current}`)
        console.log(`Revalidated blog post: /blog/${parsedBody.slug.current}`)
      }
      
      console.log('Revalidated blog pages')
    } 
    else if (documentType === 'category') {
      // Revalidate blog pages when categories change
      revalidatePath('/blog')
      console.log('Revalidated blog pages for category change')
    }
    else if (documentType === 'author') {
      // Revalidate all blog pages when author info changes
      revalidatePath('/blog')
      revalidatePath('/blog/[slug]', 'page')
      console.log('Revalidated blog pages for author change')
    }
    else {
      console.log(`Webhook received for unhandled document type: ${documentType}`)
    }

    // Return success response
    return NextResponse.json({ 
      success: true, 
      revalidated: true,
      documentType,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json({ message: 'Sanity webhook endpoint - POST only' }, { status: 405 })
}
