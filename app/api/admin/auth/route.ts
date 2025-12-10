import { NextRequest, NextResponse } from 'next/server'

const ADMIN_USER = process.env.ADMIN_USER
const ADMIN_PASS = process.env.ADMIN_PASS

export async function GET(request: NextRequest) {
  const authCookie = request.cookies.get('admin-auth')
  
  if (authCookie?.value === 'authenticated') {
    const response = NextResponse.json({ authenticated: true })
    // Prevent caching
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    return response
  }
  
  const response = NextResponse.json({ authenticated: false }, { status: 401 })
  // Prevent caching
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
  response.headers.set('Pragma', 'no-cache') 
  response.headers.set('Expires', '0')
  return response
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()
    
    if (!ADMIN_USER || !ADMIN_PASS) {
      return NextResponse.json(
        { error: 'Admin credentials not configured' }, 
        { status: 500 }
      )
    }
    
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      const response = NextResponse.json({ authenticated: true })
      
      // Set HTTP-only cookie for security
      response.cookies.set('admin-auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      })
      
      return response
    }
    
    return NextResponse.json(
      { error: 'Invalid credentials' }, 
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' }, 
      { status: 400 }
    )
  }
}




