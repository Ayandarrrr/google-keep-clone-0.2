import React, { useState, useRef, useEffect } from 'react'
import { COLORS, colorHex } from '../colors'

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

const TagIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M20 12.5 12.5 20a1.5 1.5 0 0 1-2.1 0l-6.4-6.4a1.5 1.5 0 0 1 0-2.1L11.5 4H19a1 1 0 0 1 1 1v7.5Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <circle cx="15" cy="8" r="1.3" fill="currentColor" />
  </svg>
)

export default function CreateNote({ onAdd, isDark }) {
  const [expanded, setExpanded] = useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [color, setColor] = useState(COLORS[0].id)
  const [pinned, setPinned] = useState(false)
  const [tags, setTags] = useState([])
  const [tagInput, setTagInput] = useState('')
  const [showPalette, setShowPalette] = useState(false)
  const [showTagBox, setShowTagBox] = useState(false)
  const wrapRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        submit()
      }
    }
    if (expanded) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded, title, body, color, pinned, tags])

  function reset() {
    setTitle('')
    setBody('')
    setColor(COLORS[0].id)
    setPinned(false)
    setTags([])
    setTagInput('')
    setShowPalette(false)
    setShowTagBox(false)
    setExpanded(false)
  }

  function submit() {
    if (title.trim() || body.trim()) {
      onAdd({ title: title.trim(), body: body.trim(), color, pinned, tags })
    }
    reset()
  }

  function addTagFromInput() {
    const clean = tagInput.trim().replace(/^#/, '')
    if (clean && !tags.includes(clean)) {
      setTags([...tags, clean])
    }
    setTagInput('')
  }

  return (
    <div className="create-note-wrap">
      <div
        ref={wrapRef}
        className={`create-note ${expanded ? 'expanded' : ''}`}
        style={{ background: colorHex(color, isDark) }}
      >
        {expanded && (
          <input
            className="create-title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
        )}
        <textarea
          className="create-body"
          placeholder="Take a note..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          onFocus={() => setExpanded(true)}
          rows={expanded ? 3 : 1}
        />

        {expanded && tags.length > 0 && (
          <div className="tag-chip-row">
            {tags.map((t) => (
              <span key={t} className="tag-chip">
                #{t}
                <button onClick={() => setTags(tags.filter((x) => x !== t))} aria-label={`Remove tag ${t}`}>
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        {expanded && showTagBox && (
          <div className="tag-input-row">
            <input
              autoFocus
              placeholder="Add a tag, press Enter"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  addTagFromInput()
                }
              }}
            />
          </div>
        )}

        {expanded && showPalette && (
          <div className="palette-row">
            {COLORS.map((c) => (
              <button
                key={c.id}
                className={`swatch ${color === c.id ? 'active' : ''}`}
                style={{ background: colorHex(c.id, isDark) }}
                title={c.name}
                aria-label={c.name}
                onClick={() => setColor(c.id)}
              />
            ))}
          </div>
        )}

        {expanded && (
          <div className="create-toolbar">
            <div className="create-toolbar-left">
              <button
                className={`icon-btn small ${pinned ? 'active' : ''}`}
                title="Pin note"
                onClick={() => setPinned((p) => !p)}
              >
                <PinIcon filled={pinned} />
              </button>
              <button
                className="icon-btn small"
                title="Add tag"
                onClick={() => setShowTagBox((s) => !s)}
              >
                <TagIcon />
              </button>
              <button
                className="icon-btn small"
                title="Choose color"
                onClick={() => setShowPalette((s) => !s)}
              >
                <PaletteIcon />
              </button>
            </div>
            <button className="done-btn" onClick={submit}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
