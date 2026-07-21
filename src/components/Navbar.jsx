import React from 'react'

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2" />
    <path
      d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8L6 18M18 6l1.8-1.8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)

const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
)

const GridIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
  </svg>
)

export default function Navbar({ query, onQueryChange, isDark, onToggleDark, noteCount }) {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="icon-btn" aria-label="Menu">
          <MenuIcon />
        </button>
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            <svg width="30" height="30" viewBox="0 0 24 24">
              <path fill="#FBBC04" d="M12 2 L21 8.5 L21 15.5 L12 22 L3 15.5 L3 8.5 Z" />
              <path fill="#EA4335" d="M12 2 L21 8.5 L12 12 Z" opacity="0.85" />
              <path fill="#34A853" d="M3 8.5 L12 12 L12 22 L3 15.5 Z" opacity="0.85" />
            </svg>
          </span>
          <span className="brand-name">Keep</span>
        </div>
      </div>

      <div className="navbar-search">
        <span className="search-icon">
          <SearchIcon />
        </span>
        <input
          type="text"
          placeholder={`Search ${noteCount} note${noteCount === 1 ? '' : 's'}`}
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          aria-label="Search notes"
        />
        {query && (
          <button className="clear-search" onClick={() => onQueryChange('')} aria-label="Clear search">
            ×
          </button>
        )}
      </div>

      <div className="navbar-right">
        <button className="icon-btn hide-on-mobile" aria-label="View toggle">
          <GridIcon />
        </button>
        <button
          className="icon-btn"
          onClick={onToggleDark}
          aria-label="Toggle dark mode"
          title="Toggle dark mode"
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>
        <div className="avatar" title="You">
          Y
        </div>
      </div>
    </header>
  )
}
