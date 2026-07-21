import React from 'react'
import {
  MenuIcon,
  SearchIcon,
  RefreshIcon,
  ListViewIcon,
  GridViewIcon,
  SettingsIcon,
  AppsIcon,
  LogoIcon,
} from './icons'

export default function Topbar({
  onMenuToggle,
  query,
  onQueryChange,
  onRefresh,
  isListView,
  onToggleListView,
}) {
  return (
    <header className="topbar">
      <div className="topbar__left">
        <button className="icon-btn" id="menuToggle" onClick={onMenuToggle} title="Menu">
          <MenuIcon />
        </button>

        <span className="topbar__logo">
          <LogoIcon />
        </span>

        <h1 className="topbar__title">Keep</h1>
      </div>

      <div className="topbar__search">
        <SearchIcon />
        <input
          type="search"
          id="searchInput"
          placeholder="Search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
        {query && (
          <button className="topbar__search-clear" onClick={() => onQueryChange('')} title="Clear search">
            ×
          </button>
        )}
      </div>

      <div className="topbar__right">
        <button className="icon-btn" id="refreshBtn" onClick={onRefresh} title="Refresh">
          <RefreshIcon />
        </button>

        <button
          className="icon-btn"
          id="viewToggleBtn"
          onClick={onToggleListView}
          title={isListView ? 'Switch to grid view' : 'Switch to list view'}
        >
          {isListView ? <GridViewIcon /> : <ListViewIcon />}
        </button>

        <button className="icon-btn" title="Settings">
          <SettingsIcon />
        </button>

        <button className="icon-btn" title="Google apps">
          <AppsIcon />
        </button>

        <span className="topbar__avatar" title="You">
          Y
        </span>
      </div>
    </header>
  )
}