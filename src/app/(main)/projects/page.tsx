'use client'
import React, { useState, useMemo } from 'react'
import { Search, Grid3X3, List, Plus, X } from 'lucide-react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import ProjectsList, { Project } from './_components/ProjectsList'

// Type definitions
type SortOption = {
  label: string
  value: string
}

type SortDropdownProps = {
  selected: string
  onSelect: (value: string) => void
}

type Tab = {
  name: string
  count: number
}

type TabsProps = {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabName: string) => void
}

type SearchBarProps = {
  searchQuery: string
  onSearchChange: (query: string) => void
}

type ControlViewModeProps = {
  viewMode: 'grid' | 'list'
  onViewModeChange: (mode: 'grid' | 'list') => void
}

// Sort options
const sortOptions: SortOption[] = [
  { label: 'Time Expire', value: 'time' },
  { label: 'Progress', value: 'progress' },
  { label: 'Alphabetical', value: 'alpha' },
]

// Tabs Component
const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => (
  <div className="flex items-center gap-4 p-1 rounded-lg">
    {tabs.map((tab) => (
      <button
        key={tab.name}
        onClick={() => onTabChange(tab.name)}
        className={`
          relative text-sm font-medium flex items-center gap-2 pb-2 transition-colors
          ${activeTab === tab.name ? 'text-gray-100' : 'text-gray-50 hover:text-gray-100'}
          after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px]
          after:w-0 after:bg-gray-100 after:transition-all after:duration-300
          ${activeTab === tab.name ? 'after:w-full' : 'hover:after:w-full'}
        `}
      >
        {tab.name}
        {tab.count !== null && activeTab === tab.name && (
          <span className="bg-gray-900 text-white text-xs px-2 py-0.5 rounded-full">
            {tab.count}
          </span>
        )}
      </button>
    ))}
  </div>
)

// SearchBar Component
const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => (
  <div className="relative flex-1 max-w-md">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-4" />
    <input
      type="text"
      placeholder="Search by project name"
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      className="w-full pl-10 pr-4 py-2.5 border border-gray-700 focus:outline-none rounded-md "
    />
    {searchQuery && (
      <button 
        onClick={() => onSearchChange('')} 
        className="m-0 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:text-gray-400"
      >
        <X className="size-4" />
      </button>
    )}
  </div>
)

// Sort Dropdown Component
const SortDropdown: React.FC<SortDropdownProps> = ({ selected, onSelect }) => (
  <DropdownMenu>
    <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black/40">
      <span className="text-sm">Sort by:</span>
      <span className="text-sm font-medium">{selected}</span>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="bg-black text-gray-200 border border-gray-700 rounded-lg shadow-lg">
      {sortOptions.map(option => (
        <DropdownMenuItem
          key={option.value}
          onClick={() => onSelect(option.label)}
          className="hover:bg-gray-700 hover:text-white cursor-pointer px-4 py-2"
        >
          {option.label}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
)

// View Mode Control Component
const ControlViewMode: React.FC<ControlViewModeProps> = ({ viewMode, onViewModeChange }) => (
  <div className="flex items-center gap-1 p-1 rounded-lg bg-black/40">
    <button
      onClick={() => onViewModeChange('grid')}
      className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : ''}`}
    >
      <Grid3X3 className="w-4 h-4" />
    </button>
    <button
      onClick={() => onViewModeChange('list')}
      className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : ''}`}
    >
      <List className="w-4 h-4" />
    </button>
  </div>
)

// Main ProjectsPage Component
const ProjectsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('Time Expire')

  // Updated projects with status field for filtering
  const projects: Project[] = useMemo(() => [
    {
      id: 1,
      title: 'Digital Ocean',
      description: ['Social Media Strategy', 'Social Media Branding'],
      progress: 56,
      daysLeft: 3,
      date: '23.03.2019',
      members: ['/api/placeholder/32/32', '/api/placeholder/32/32', '/api/placeholder/32/32'],
      color: 'bg-gray-900',
      icon: '🌊',
      featured: true,
      status: 'Current'
    },
    {
      id: 2,
      title: 'IBM',
      subtitle: 'IBM',
      description: ['Branding IBM Lab Company', 'Social Media Strategy', 'Website Concept'],
      progress: 67,
      date: '23.03.2019',
      members: ['/api/placeholder/32/32', '/api/placeholder/32/32', '/api/placeholder/32/32'],
      color: 'bg-white',
      border: true,
      status: 'Current'
    },
    {
      id: 3,
      title: 'Tipit',
      description: ['Branding Strategy', 'Social Media Strategy'],
      progress: 34,
      date: '02.05.2019',
      members: ['/api/placeholder/32/32', '/api/placeholder/32/32'],
      color: 'bg-green-100',
      icon: '+',
      iconBg: 'bg-green-500',
      status: 'Finished'
    },
    {
      id: 4,
      title: 'AskNed',
      description: ['Application Concept', 'Website Concept'],
      progress: 87,
      date: '07.03.2019',
      members: ['/api/placeholder/32/32', '/api/placeholder/32/32'],
      color: 'bg-white',
      icon: 'N',
      iconBg: 'bg-blue-500',
      border: true,
      status: 'On Hold'
    },
    {
      id: 5,
      title: 'Space 10',
      description: ['Space 10 XXX project', 'Social Media Posts'],
      progress: 23,
      date: '23.03.2019',
      members: ['/api/placeholder/32/32', '/api/placeholder/32/32', '/api/placeholder/32/32'],
      color: 'bg-white',
      icon: '⊞',
      border: true,
      status: 'Archive'
    },
    {
      id: 6,
      title: 'Flash',
      description: ['Magazine Concept', 'Flyer Concept'],
      progress: 78,
      date: '23.03.2019',
      members: ['/api/placeholder/32/32', '/api/placeholder/32/32'],
      color: 'bg-white',
      icon: 'F',
      iconBg: 'bg-purple-500',
      border: true,
      status: 'Current'
    },
    {
      id: 7,
      title: 'Chorus',
      description: ['Social Media Strategy', 'Social Media Branding'],
      progress: 45,
      date: '23.03.2019',
      members: ['/api/placeholder/32/32', '/api/placeholder/32/32'],
      color: 'bg-white',
      icon: 'C',
      iconBg: 'bg-orange-500',
      border: true,
      status: 'Finished'
    }
  ], [])

  // Compute tab counts dynamically
  const tabCounts = useMemo(() => {
    const counts = {
      All: projects.length,
      Current: projects.filter(p => p.status === 'Current').length,
      Finished: projects.filter(p => p.status === 'Finished').length,
      'On Hold': projects.filter(p => p.status === 'On Hold').length,
      Archive: projects.filter(p => p.status === 'Archive').length,
    }
    return counts
  }, [projects])

  const tabs: Tab[] = [
    { name: 'All', count: tabCounts.All },
    { name: 'Current', count: tabCounts.Current },
    { name: 'Finished', count: tabCounts.Finished },
    { name: 'On Hold', count: tabCounts['On Hold'] },
    { name: 'Archive', count: tabCounts.Archive },
  ]

  // Filter and sort projects based on activeTab, searchQuery, and sortBy
  const filteredProjects = useMemo(() => {
    let filtered = projects
    
    // Filter by tab
    if (activeTab !== 'All') {
      filtered = filtered.filter(project => project.status === activeTab)
    }
    
    // Filter by search query
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase()
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(lowerQuery) ||
        project.description.some(desc => desc.toLowerCase().includes(lowerQuery))
      )
    }
    
    // Sort projects
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'Time Expire':
          // Sort by days left (projects with fewer days left come first)
          const aDays = a.daysLeft || Infinity
          const bDays = b.daysLeft || Infinity
          return aDays - bDays
        case 'Progress':
          // Sort by progress (highest progress first)
          return b.progress - a.progress
        case 'Alphabetical':
          // Sort alphabetically by title
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })
    
    return sorted
  }, [projects, activeTab, searchQuery, sortBy])

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-gray-700">
        <div className="px-6 py-6 ">
          <div className="flex flex-col border-b pb-4 lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Left side */}
            <div className="flex items-center gap-6">
              <h1 className="text-2xl font-bold">Projects</h1>
            </div>
            {/* Tabs */}
            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Right side */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm">Timothée</span>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
              </div>
            </div>
          </div>

          {/* Search and Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mt-6">
            {/* Search Bar */}
            <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

            {/* Controls */}
            <div className="flex gap-4">
              <SortDropdown selected={sortBy} onSelect={setSortBy} />
              <ControlViewMode viewMode={viewMode} onViewModeChange={setViewMode} />
            </div>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="p-6">
        <ProjectsList projects={filteredProjects} viewMode={viewMode} />
      </div>

      {/* Floating Add Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-gray-900 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center group">
        <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
      </button>
    </div>
  )
}

export default ProjectsPage