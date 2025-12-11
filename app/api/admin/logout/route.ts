import { NextResponse } from 'next/server'

// Disable caching for admin logout
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function POST() {
  const response = NextResponse.json({ success: true })
  
  // Clear the HTTP-only cookie by setting it to expire immediately
  response.cookies.set('admin-auth', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0, // Expire immediately
    path: '/',
  })
  
  return response
}







