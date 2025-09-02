import Sidebar from '@/components/dashboard/Sidebar'
import React, { ReactNode } from 'react'

const AppLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className="min-h-screen">
      <Sidebar/>
      {/* Main content area with left margin to account for fixed sidebar */}
      <div className="lg:ml-16 min-h-screen">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AppLayout