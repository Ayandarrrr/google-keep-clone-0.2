import React, { useState, useEffect, useMemo, useCallback } from 'react'
import Topbar from './components/Topbar'
import Sidebar from './components/Sidebar'
import Composer from './components/Composer'
import NotesGrid from './components/NotesGrid'
import NoteModal from './components/NoteModal'
import Toast from './components/Toast'

const STORAGE_KEY = 'google-keep-clone'

function loadNotes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function saveNotes(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
}

function makeId() {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `note-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export default function App() {
  const [notes, setNotes] = useState(loadNotes)
  const [currentView, setCurrentView] = useState('notes')
  const [query, setQuery] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isListView, setIsListView] = useState(false)
  const [editingNote, setEditingNote] = useState(null)
  const [pendingDelete, setPendingDelete] = useState(null) // { note }

  useEffect(() => {
    saveNotes(notes)
  }, [notes])

  const createNote = useCallback(({ title, body, color }) => {
    const note = {
      id: makeId(),
      title,
      body,
      color: color || 'default',
      archived: false,
      createdAt: Date.now(),
    }
    setNotes((prev) => [note, ...prev])
  }, [])

  const archiveNote = useCallback((id) => {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, archived: true } : n)))
  }, [])

  const unarchiveNote = useCallback((id) => {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, archived: false } : n)))
  }, [])

  const deleteNote = useCallback(
    (id) => {
      const note = notes.find((n) => n.id === id)
      if (!note) return
      setNotes((prev) => prev.filter((n) => n.id !== id))
      setEditingNote(null)
      setPendingDelete(note)
    },
    [notes]
  )

  function undoDelete() {
    if (pendingDelete) {
      setNotes((prev) => [pendingDelete, ...prev])
      setPendingDelete(null)
    }
  }

  function saveModalChanges(updatedNote) {
    setNotes((prev) => prev.map((n) => (n.id === updatedNote.id ? updatedNote : n)))
    setEditingNote(null)
  }

  function toggleArchiveFromModal(id) {
    setNotes((prev) => {
      const next = prev.map((n) => (n.id === id ? { ...n, archived: !n.archived } : n))
      const updated = next.find((n) => n.id === id)
      setEditingNote(updated)
      return next
    })
  }

  const visibleNotes = useMemo(() => {
    const q = query.trim().toLowerCase()
    return notes.filter((note) => {
      const matchesView = note.archived === (currentView === 'archive')
      const matchesQuery =
        !q || note.title.toLowerCase().includes(q) || note.body.toLowerCase().includes(q)
      return matchesView && matchesQuery
    })
  }, [notes, currentView, query])

  return (
    <>
      <Topbar
        onMenuToggle={() => setSidebarOpen((s) => !s)}
        query={query}
        onQueryChange={setQuery}
        onRefresh={() => setNotes(loadNotes())}
        isListView={isListView}
        onToggleListView={() => setIsListView((v) => !v)}
      />

      <div className="layout">
        <Sidebar
          currentView={currentView}
          onSelectView={setCurrentView}
          expanded={sidebarOpen}
          mobileOpen={sidebarOpen}
        />

        <main className="board" id="board">
          {currentView === 'notes' && <Composer onCreate={createNote} />}

          <NotesGrid
            notes={visibleNotes}
            isListView={isListView}
            currentView={currentView}
            onOpen={setEditingNote}
            onArchive={archiveNote}
            onUnarchive={unarchiveNote}
            onDelete={deleteNote}
          />
        </main>
      </div>

      {editingNote && (
        <NoteModal
          note={editingNote}
          onClose={saveModalChanges}
          onArchiveToggle={toggleArchiveFromModal}
          onDelete={deleteNote}
        />
      )}

      {pendingDelete && (
        <Toast
          message="Note deleted"
          actionLabel="Undo"
          onAction={undoDelete}
          onExpire={() => setPendingDelete(null)}
        />
      )}
    </>
  )
}