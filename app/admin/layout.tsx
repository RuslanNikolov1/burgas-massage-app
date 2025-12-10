'use client'

import { useEffect, useState } from 'react'

// Disable caching for admin routes
export const dynamic = 'force-dynamic'
export const revalidate = 0
import { useRouter } from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Reset authentication state on component mount
    setIsAuthenticated(false)
    setIsLoading(true)
    
    const checkAuth = async () => {
      try {
        // Add cache busting to prevent cached responses
        const response = await fetch('/api/admin/auth?' + Date.now(), {
          method: 'GET',
          credentials: 'include',
          cache: 'no-store', // Prevent caching
        })
        
        if (response.ok) {
          setIsAuthenticated(true)
        } else if (response.status === 401) {
          // Trigger browser basic auth
          const credentials = prompt('Enter admin credentials (username:password):')
          if (credentials) {
            const [username, password] = credentials.split(':')
            const authResponse = await fetch('/api/admin/auth', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username, password }),
              credentials: 'include',
            })
            
            if (authResponse.ok) {
              setIsAuthenticated(true)
            } else {
              router.push('/')
            }
          } else {
            router.push('/')
          }
        } else {
          router.push('/')
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        router.push('/')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div style={{ padding: 20, textAlign: 'center' }}>
        <p>Checking authentication...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div style={{ padding: 20, textAlign: 'center' }}>
        <p>Access denied. Redirecting...</p>
      </div>
    )
  }

  return (
    <div>
      <div style={{ padding: '10px 20px', background: '#f0f0f0', marginBottom: 20 }}>
        <strong>Admin Area</strong>
        <button 
          onClick={async () => {
            try {
              await fetch('/api/admin/logout', {
                method: 'POST',
                credentials: 'include',
              });
              // Clear local state and redirect
              setIsAuthenticated(false);
              router.push('/');
            } catch (error) {
              console.error('Logout failed:', error);
              // Force redirect anyway
              setIsAuthenticated(false);
              router.push('/');
            }
          }}
          style={{ float: 'right', padding: '5px 10px' }}
        >
          Logout
        </button>
      </div>
      {children}
    </div>
  )
}




