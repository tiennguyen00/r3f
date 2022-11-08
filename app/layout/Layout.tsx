"use client"

import React, { ReactNode } from "react"
interface LayoutProps {
  children: ReactNode
}

const DashboardLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <h1>This is a common layout</h1>
      {children}
    </>
  )
}

const Layout = ({ children }: LayoutProps) => {
  return <DashboardLayout>{children}</DashboardLayout>
}

export default Layout
