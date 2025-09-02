import { MiddlewareConfig, NextResponse } from "next/server"
import NextAuth from "next-auth"
import authConfig from "./auth.config"

// Define route categories
const publicRoutes = ['/']
const authRoutes = ['/auth/login', '/auth/register']
const protectedRoutes = ['/dashboard', '/team-setup']
const apiAuthPrefix = '/api/auth'
const DEFAULT_LOGIN_REDIRECT = '/dashboard'


const { auth } = NextAuth(authConfig);
export default auth((req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)
    const isProtectedRoute = protectedRoutes.some(route => 
        nextUrl.pathname === route || nextUrl.pathname.startsWith(`${route}/`)
    )

    // Allow API auth routes
    if (isApiAuthRoute) {
        return null
    }

    // Handle auth routes
    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return null
    }

    // Handle protected routes
    if (!isLoggedIn && isProtectedRoute) {
        return NextResponse.redirect(new URL('/auth/login', nextUrl))
    }

    // Redirect authenticated users away from public routes
    if (isLoggedIn && isPublicRoute) {
        return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }

    return null
})

export const config: MiddlewareConfig = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}




