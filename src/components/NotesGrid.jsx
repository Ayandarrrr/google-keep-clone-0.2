import React, { useState } from 'react'
import NoteCard from './NoteCard'

// AI-assisted feature: drag-and-drop reordering.
// Uses the native HTML5 drag events (no extra library) to let a note be
// picked up and dropped into a new position within its own section
// (pinned notes only reorder among pinned notes, others among others).
export default function NotesGrid({
  notes,
  isDark,
  onTogglePin,
  onDelete,
  onColorChange,
  onReorder,
  emptyMessage,
}) {
  const [draggingId, setDraggingId] = useState(null)
  const [overId, setOverId] = useState(null)

  const pinned = notes.filter((n) => n.pinned)
  const others = notes.filter((n) => !n.pinned)

  function handleDragStart(e, id) {
    setDraggingId(id)
    e.dataTransfer.effectAllowed = 'move'
  }

  function handleDragOver(e, id) {
    e.preventDefault()
    if (id !== draggingId) setOverId(id)
  }

  function handleDrop(e, targetId) {
    e.preventDefault()
    if (draggingId && draggingId !== targetId) {
      onReorder(draggingId, targetId)
    }
    setDraggingId(null)
    setOverId(null)
  }

  function handleDragEnd() {
    setDraggingId(null)
    setOverId(null)
  }

  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" opacity="0.35">
          <path
            d="M6 3h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M8 12h8M8 15.5h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <p>{emptyMessage}</p>
      </div>
    )
  }

  function renderSection(list) {
    return (
      <div className="notes-masonry">
        {list.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            isDark={isDark}
            onTogglePin={onTogglePin}
            onDelete={onDelete}
            onColorChange={onColorChange}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragEnd={handleDragEnd}
            isDragOver={overId === note.id}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="notes-sections">
      {pinned.length > 0 && (
        <section>
          <h2 className="section-label">Pinned</h2>
          {renderSection(pinned)}
        </section>
      )}
      {others.length > 0 && (
        <section>
          {pinned.length > 0 && <h2 className="section-label">Others</h2>}
          {renderSection(others)}
        </section>
      )}
    </div>
  )
}
