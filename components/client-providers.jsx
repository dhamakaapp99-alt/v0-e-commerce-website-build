"use client"

import AuthGuard from "@/components/auth-guard"

export default function ClientProviders({ children }) {
  return <AuthGuard>{children}</AuthGuard>
}
