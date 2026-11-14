import { Home, Map as MapIcon, Menu, UserRound } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type NavigationTab = 'Home' | 'Routes' | 'Profile'

type NavigationItem = {
  label: NavigationTab
  icon: LucideIcon
}

type LmnHeaderProps = {
  activeTab: NavigationTab
  onTabChange: (tab: NavigationTab) => void
}

const navigationItems: NavigationItem[] = [
  { label: 'Home', icon: Home },
  { label: 'Routes', icon: MapIcon },
  { label: 'Profile', icon: UserRound },
]

export function LmnHeader({ activeTab, onTabChange }: LmnHeaderProps) {
  return (
    <header className="prototype-header">
      <nav className="prototype-nav" aria-label="Primary navigation">
        {navigationItems.map(({ label, icon: Icon }) => (
          <button
            key={label}
            type="button"
            className={activeTab === label ? 'nav-pill active' : 'nav-pill'}
            onClick={() => onTabChange(label)}
            aria-current={activeTab === label ? 'page' : undefined}
          >
            <Icon aria-hidden="true" />
            {label}
          </button>
        ))}
      </nav>
      <button className="mobile-icon-button" type="button" aria-label="Open menu">
        <Menu aria-hidden="true" />
      </button>
    </header>
  )
}
