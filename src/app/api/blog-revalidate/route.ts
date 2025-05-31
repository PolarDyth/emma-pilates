import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    // Get the webhook secret from environment variables
    const webhookSecret = process.env.SANITY_WEBHOOK_SECRET
    
    if (!webhookSecret) {
      console.error('SANITY_WEBHOOK_SECRET is not configured')
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
    }

    // Get the secret from the request headers
    const headerSecret = request.headers.get('sanity-webhook-secret')
    
    if (!headerSecret) {
      console.error('No webhook secret provided in headers')
      return NextResponse.json({ error: 'Unauthorized - No secret provided' }, { status: 401 })
    }

    // Validate the webhook secret
    if (headerSecret !== webhookSecret) {
      console.error('Invalid webhook secret provided')
      return NextResponse.json({ error: 'Unauthorized - Invalid secret' }, { status: 401 })
    }

    // Parse the webhook payload
    const body = await request.json()
    
    console.log('Sanity webhook received:', {
      documentType: body._type,
      documentId: body._id,
      operation: body._operation || 'unknown'
    })

    // Handle different document types
    const documentType = body._type
    
    if (documentType === 'blogPost') {
      // Revalidate blog-related pages
      revalidatePath('/blog')
      revalidatePath('/blog/[slug]', 'page')
      
      // If we have a slug, revalidate the specific post
      if (body.slug?.current) {
        revalidatePath(`/blog/${body.slug.current}`)
        console.log(`Revalidated blog post: /blog/${body.slug.current}`)
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
