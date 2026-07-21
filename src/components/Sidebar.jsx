import React from 'react'
import { NotesIcon, RemindersIcon, EditIcon, ArchiveIcon, TrashIcon } from './icons'

const ITEMS = [
  { view: 'notes', label: 'Notes', icon: NotesIcon, disabled: false },
  { view: null, label: 'Reminders', icon: RemindersIcon, disabled: true },
  { view: null, label: 'Edit Labels', icon: EditIcon, disabled: true },
  { view: 'archive', label: 'Archive', icon: ArchiveIcon, disabled: false },
  { view: null, label: 'Trash', icon: TrashIcon, disabled: true },
]

export default function Sidebar({ currentView, onSelectView, expanded, mobileOpen }) {
  return (
    <nav
      className={`sidebar ${expanded ? 'is-expanded' : ''} ${mobileOpen ? 'is-open' : ''}`}
      id="sidebar"
    >
      {ITEMS.map(({ view, label, icon: Icon, disabled }) => (
        <button
          key={label}
          className={`sidebar__item ${!disabled && view === currentView ? 'is-active' : ''} ${
            disabled ? 'is-disabled' : ''
          }`}
          data-view={view || undefined}
          disabled={disabled}
          onClick={() => view && onSelectView(view)}
          title={disabled ? `${label} (coming soon)` : label}
        >
          <Icon />
          <span className="sidebar__label">{label}</span>
        </button>
      ))}
    </nav>
  )
}