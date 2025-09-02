"use client"

import React, { useState } from "react"
import {
    Users,
    CheckCircle,
    ArrowUpRight,
    Target,
    Activity,
    Bell,
    Search,
    User,
    X
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// Types
interface StatCardProps {
    title: string
    value: string
    change: string
    changeType: "positive" | "negative"
    icon: React.ReactNode
}

interface Notification {
    id: number
    message: string
    time: string
    unread: boolean
}

const cardColor = "bg-black/40"

const stats: StatCardProps[] = [
    {
        title: "Total Projects",
        value: "24",
        change: "+12%",
        changeType: "positive",
        icon: <Target className="w-6 h-6" />,
    },
    {
        title: "Active Tasks",
        value: "142",
        change: "+8%",
        changeType: "positive",
        icon: <Activity className="w-6 h-6" />,
    },
    {
        title: "Team Members",
        value: "28",
        change: "+2%",
        changeType: "positive",
        icon: <Users className="w-6 h-6" />,
    },
    {
        title: "Completion Rate",
        value: "87%",
        change: "-3%",
        changeType: "negative",
        icon: <CheckCircle className="w-6 h-6" />,
    },
]

const notifications: Notification[] = [
    { id: 1, message: "New project assigned: Project Alpha", time: "30 mins ago", unread: true },
    { id: 2, message: "Task overdue: Complete UI design", time: "1 hour ago", unread: true },
    { id: 3, message: "Team meeting scheduled for tomorrow", time: "3 hours ago", unread: false },
    { id: 4, message: "Project Beta completed successfully", time: "Yesterday", unread: false },
]

// Components
const StatCard: React.FC<StatCardProps> = ({ title, value, change, changeType, icon }) => (
    <div className={`${cardColor} rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-700`}>
        <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gray-700 flex items-center justify-center">
                {icon}
            </div>
            <div
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${changeType === "positive" ? "text-green-400" : "text-red-400"
                    }`}
            >
                <ArrowUpRight
                    className={`w-3 h-3 ${changeType === "negative" ? "rotate-90" : ""}`}
                />
                {change}
            </div>
        </div>
        <div className="space-y-1">
            <h3 className="text-2xl font-bold">{value}</h3>
            <p className="text-sm text-gray-400">{title}</p>
        </div>
    </div>
)

const Dashboard: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <div className="min-h-screen text-gray-100 p-8">
            <div className="mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                        <p className="mt-1 text-gray-400">
                            Welcome back! Here's what's happening with your projects.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`pl-10 rounded-md  border-gray-700 py-2.5 w-80 focus:outline-none text-gray-100 placeholder-gray-400 ${cardColor}`}
                            />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="relative cursor-pointer">
                                    <Bell className="size-6 text-gray-400" />
                                    <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">
                                        {notifications.filter(n => n.unread).length}
                                    </Badge>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                                    <h3 className="font-semibold">Notifications</h3>
                                    <X className="w-4 h-4 text-gray-400 cursor-pointer" />
                                </div>
                                {notifications.map(notification => (
                                    <DropdownMenuItem
                                        key={notification.id}
                                        className={`p-4 m-2 flex gap-4 items-start ${notification.unread ?'bg-black/40':''}`}
                                    >
                                        
                                        {notification.unread && <div className="w-3 h-3 rounded-full mt-1 flex-shrink-0 bg-blue-500" />}
                                        <div className="flex flex-col">
                                            <span>{notification.message}</span>
                                            <span className="text-xs text-gray-400">{notification.time}</span>
                                        </div>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Avatar>
                            <AvatarImage src="/avatar.png" alt="User avatar" />
                            <AvatarFallback>
                                <User className="w-6 h-6" />
                            </AvatarFallback>
                        </Avatar>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}
                </div>

                {/* Activity Timeline */}
                <div className={`${cardColor} rounded-2xl p-6 shadow-sm border border-gray-700`}>
                    <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
                    <div className="space-y-4">
                        {[
                            { user: "Alice", action: 'completed task "Review design mockups"', time: "2 hours ago" },
                            { user: "Bob", action: "updated project timeline for Digital Ocean", time: "4 hours ago" },
                            { user: "Carol", action: "added 3 new tasks to IBM Dashboard", time: "6 hours ago" },
                            { user: "David", action: "deployed Tipit Mobile App to staging", time: "1 day ago" },
                        ].map((activity, index) => (
                            <div key={index} className="flex items-start gap-4 pb-4">
                                <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0 bg-blue-500" />
                                <div className="flex-1 min-w-0">
                                    <p>
                                        <span className="font-medium">{activity.user}</span> {activity.action}
                                    </p>
                                    <p className="text-sm text-gray-400">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard