import React, { useMemo, useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import CreateNote from './components/CreateNote'
import NotesGrid from './components/NotesGrid'
import { useLocalStorage } from './hooks/useLocalStorage'

const SEED_NOTES = [
  {
    id: 'seed-1',
    title: 'Welcome to Keep Clone 👋',
    body: 'Click the box above to add a note. Drag the dot-grid handle to reorder, pin your favourites, and tap the palette icon to recolour a note.',
    color: 'sand',
    pinned: true,
    tags: ['welcome'],
  },
  {
    id: 'seed-2',
    title: 'Groceries',
    body: 'Eggs, spinach, oat milk, coffee, and something for dinner Friday.',
    color: 'mint',
    pinned: false,
    tags: ['home'],
  },
  {
    id: 'seed-3',
    title: '',
    body: 'Everything here is saved to localStorage, so it survives a refresh.',
    color: 'fog',
    pinned: false,
    tags: [],
  },
]

function uid() {
  return `note-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export default function App() {
  const [notes, setNotes] = useLocalStorage('keep-clone:notes', SEED_NOTES)
  const [isDark, setIsDark] = useLocalStorage('keep-clone:dark-mode', false)
  const [query, setQuery] = useLocalStorage('keep-clone:search', '')

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentView, setCurrentView] = useState('notes')

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light'
  }, [isDark])

  function addNote({ title, body, color, pinned, tags }) {
    const newNote = {
      id: uid(),
      title,
      body,
      color: color || 'default',
      pinned: !!pinned,
      tags: tags || [],
    }
    setNotes((prev) => [newNote, ...prev])
  }

  function deleteNote(id) {
    setNotes((prev) => prev.filter((n) => n.id !== id))
  }

  function togglePin(id) {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, pinned: !n.pinned } : n
      )
    )
  }

  function changeColor(id, color) {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, color } : n
      )
    )
  }

  function reorderNotes(draggingId, targetId) {
    setNotes((prev) => {
      const draggingNote = prev.find((n) => n.id === draggingId)
      const targetNote = prev.find((n) => n.id === targetId)

      if (!draggingNote || !targetNote) return prev
      if (draggingNote.pinned !== targetNote.pinned) return prev

      const withoutDragging = prev.filter((n) => n.id !== draggingId)
      const targetIndex = withoutDragging.findIndex(
        (n) => n.id === targetId
      )

      withoutDragging.splice(targetIndex, 0, draggingNote)
      return withoutDragging
    })
  }

  const filteredNotes = useMemo(() => {
    const q = query.trim().toLowerCase()

    if (!q) return notes

    return notes.filter((n) => {
      const haystack = [n.title, n.body, ...(n.tags || [])]
        .join(' ')
        .toLowerCase()

      return haystack.includes(q)
    })
  }, [notes, query])

  return (
    <div className="app">
      <Navbar
        query={query}
        onQueryChange={setQuery}
        isDark={isDark}
        onToggleDark={() => setIsDark((d) => !d)}
        noteCount={notes.length}
      />

      <div className="layout">
        <Sidebar
          currentView={currentView}
          onSelectView={setCurrentView}
          expanded={sidebarOpen}
          mobileOpen={sidebarOpen}
        />

        <main className="board" id="board">
          <CreateNote onAdd={addNote} isDark={isDark} />

          <NotesGrid
            notes={filteredNotes}
            isDark={isDark}
            onTogglePin={togglePin}
            onDelete={deleteNote}
            onColorChange={changeColor}
            onReorder={reorderNotes}
            emptyMessage={
              query
                ? `No notes match "${query}"`
                : 'Notes you add will show up here'
            }
          />
        </main>
      </div>
    </div>
  )
}