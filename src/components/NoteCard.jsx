import React, { useState } from 'react'
import { COLORS, colorHex } from '../colors'

const PinIcon = ({ filled }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'}>
    <path
      d="M14.5 3 21 9.5l-2.1 2.1-1.1-.4-3.9 3.9L15 19l-1.4 1.4-4-4-4.3 4.3L4 19.4 8.3 15l-4-4L5.7 9.6l4 1.1 3.9-3.9-.4-1.1L14.5 3Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
)

const PaletteIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2a10 10 0 1 0 0 20c1.4 0 2-1 2-2 0-.6-.3-1-.6-1.4-.3-.4-.6-.8-.6-1.3 0-1 .8-1.8 1.8-1.8H16a5 5 0 0 0 5-5c0-4.4-4-8.5-9-8.5Z"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <circle cx="7.5" cy="10.5" r="1.2" fill="currentColor" />
    <circle cx="10.5" cy="7" r="1.2" fill="currentColor" />
    <circle cx="15" cy="8" r="1.2" fill="currentColor" />
  </svg>
)

const DeleteIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M6 7h12M9.5 7V5.5A1.5 1.5 0 0 1 11 4h2a1.5 1.5 0 0 1 1.5 1.5V7M7.5 7l.7 12a1.5 1.5 0 0 0 1.5 1.4h4.6a1.5 1.5 0 0 0 1.5-1.4l.7-12"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const DragHandle = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="8" cy="6" r="1.5" fill="currentColor" />
    <circle cx="16" cy="6" r="1.5" fill="currentColor" />
    <circle cx="8" cy="12" r="1.5" fill="currentColor" />
    <circle cx="16" cy="12" r="1.5" fill="currentColor" />
    <circle cx="8" cy="18" r="1.5" fill="currentColor" />
    <circle cx="16" cy="18" r="1.5" fill="currentColor" />
  </svg>
)

export default function NoteCard({
  note,
  isDark,
  onTogglePin,
  onDelete,
  onColorChange,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  isDragOver,
}) {
  const [showPalette, setShowPalette] = useState(false)

  return (
    <div
      className={`note-card ${isDragOver ? 'drag-over' : ''}`}
      style={{ background: colorHex(note.color, isDark) }}
      draggable
      onDragStart={(e) => onDragStart(e, note.id)}
      onDragOver={(e) => onDragOver(e, note.id)}
      onDrop={(e) => onDrop(e, note.id)}
      onDragEnd={onDragEnd}
    >
      <div className="note-top">
        <span className="drag-handle" title="Drag to reorder">
          <DragHandle />
        </span>
        <button
          className={`icon-btn small pin-btn ${note.pinned ? 'active' : ''}`}
          onClick={() => onTogglePin(note.id)}
          title={note.pinned ? 'Unpin note' : 'Pin note'}
        >
          <PinIcon filled={note.pinned} />
        </button>
      </div>

      {note.title && <h3 className="note-title">{note.title}</h3>}
      {note.body && <p className="note-body">{note.body}</p>}

      {note.tags?.length > 0 && (
        <div className="tag-chip-row">
          {note.tags.map((t) => (
            <span key={t} className="tag-chip static">
              #{t}
            </span>
          ))}
        </div>
      )}

      <div className="note-footer">
        <button
          className="icon-btn small"
          title="Change color"
          onClick={() => setShowPalette((s) => !s)}
        >
          <PaletteIcon />
        </button>
        <button className="icon-btn small" title="Delete note" onClick={() => onDelete(note.id)}>
          <DeleteIcon />
        </button>
      </div>

      {showPalette && (
        <div className="palette-row">
          {COLORS.map((c) => (
            <button
              key={c.id}
              className={`swatch ${note.color === c.id ? 'active' : ''}`}
              style={{ background: isDark ? c.dark : c.hex }}
              title={c.name}
              aria-label={c.name}
              onClick={() => {
                onColorChange(note.id, c.id)
                setShowPalette(false)
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
