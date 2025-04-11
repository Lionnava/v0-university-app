"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Skip auth check for public routes
    const publicRoutes = ["/auth/login", "/auth/register", "/auth/forgot-password"]
    if (publicRoutes.includes(pathname)) {
      return
    }

    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login")
    }
  }, [isAuthenticated, isLoading, router, pathname])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  // Public routes are always accessible
  const publicRoutes = ["/auth/login", "/auth/register", "/auth/forgot-password"]
  if (publicRoutes.includes(pathname)) {
    return <>{children}</>
  }

  // Protected routes are only accessible when authenticated
  return isAuthenticated ? <>{children}</> : null
}

