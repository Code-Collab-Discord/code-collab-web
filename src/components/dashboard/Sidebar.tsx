'use client'
import React from 'react'
import {
    Settings,
    List,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MdDashboard, MdLeaderboard, MdPeople } from "react-icons/md";

const Sidebar = () => {
    const pathname = usePathname()

    const menuItems = [
        { path: '/dashboard', id: 'projects', icon: MdDashboard, label: 'Projects', active: true },
        { path: '/projects', id: 'team', icon: List, label: 'Team' },
        { path: '/leaderboard', id: 'tasks', icon: MdLeaderboard, label: 'Tasks' },
    ]
   
    return (
        <>
            {/* Desktop Sidebar */}
            <div className="flex flex-col w-max h-screen fixed left-0 top-0 z-40 bg-black/40">
                <div className="flex-1 flex flex-col pt-10 pb-4 overflow-y-auto">
                    {/* Navigation */}
                    <nav className="flex-1 space-y-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon
                            const isActive = pathname === item.path
                            return (
                                <Link
                                    key={item.id}
                                    href={item.path}
                                    className={`group flex items-center justify-center px-3 m-0 py-3  w-full transition-colors ${isActive
                                            ? ' text-white bg-background'
                                            : 'text-gray-500 hover:bg-black/50'
                                        }`}
                                >
                                    <Icon
                                        className={`h-6 w-6`}
                                    />
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Bottom Actions */}
                    <div className="px-2 pb-4 space-y-1">
                        <button
                            className="group flex items-center justify-center px-3 py-3 rounded-lg w-full text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
                        >
                            <Settings className="h-6 w-6 text-gray-500 group-hover:text-gray-700" />
                        </button>

                        {/* team info button */}
                        <div className="flex items-center justify-center px-3 py-2">
                            <button className="size-8 bg-gray-300 rounded-full flex items-center justify-center">
                                <MdPeople className="size-4 text-gray-600" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Sidebar