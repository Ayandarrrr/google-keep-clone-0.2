import { useState } from "react";
import {
  Sun,
  Moon,
  Pin,
  Trash2,
  Plus,
  X,
  Palette,
  Menu,
  Lightbulb,
  Bell,
  Tag,
  Archive,
} from "lucide-react";

const NAV_ITEMS = [
  { key: "notes", label: "Notes", icon: Lightbulb },
  { key: "reminders", label: "Reminders", icon: Bell },
  { key: "labels", label: "Edit labels", icon: Tag },
  { key: "archive", label: "Archive", icon: Archive },
  { key: "trash", label: "Trash", icon: Trash2 },
];

const LIGHT_COLORS = [
  { name: "default", bg: "bg-white", border: "border-gray-300" },
  { name: "red", bg: "bg-red-100", border: "border-red-200" },
  { name: "orange", bg: "bg-orange-100", border: "border-orange-200" },
  { name: "yellow", bg: "bg-yellow-100", border: "border-yellow-200" },
  { name: "green", bg: "bg-green-100", border: "border-green-200" },
  { name: "teal", bg: "bg-teal-100", border: "border-teal-200" },
  { name: "blue", bg: "bg-blue-100", border: "border-blue-200" },
  { name: "purple", bg: "bg-purple-100", border: "border-purple-200" },
  { name: "pink", bg: "bg-pink-100", border: "border-pink-200" },
];

const DARK_COLORS = [
  { name: "default", bg: "bg-gray-800", border: "border-gray-600" },
  { name: "red", bg: "bg-red-950", border: "border-red-800" },
  { name: "orange", bg: "bg-orange-950", border: "border-orange-800" },
  { name: "yellow", bg: "bg-yellow-950", border: "border-yellow-800" },
  { name: "green", bg: "bg-green-950", border: "border-green-800" },
  { name: "teal", bg: "bg-teal-950", border: "border-teal-800" },
  { name: "blue", bg: "bg-blue-950", border: "border-blue-800" },
  { name: "purple", bg: "bg-purple-950", border: "border-purple-800" },
  { name: "pink", bg: "bg-pink-950", border: "border-pink-800" },
];

const initialNotes = [
  { id: 1, title: "Groceries", body: "Milk, eggs, spinach, coffee", color: "yellow", pinned: true },
  { id: 2, title: "Trip ideas", body: "Kyoto in autumn, Cape Town in summer", color: "teal", pinned: true },
  { id: 3, title: "", body: "Call the dentist about rescheduling", color: "default", pinned: false },
  { id: 4, title: "Book list", body: "Piranesi, Klara and the Sun", color: "purple", pinned: false },
];

export default function GoogleKeepClone() {
  const [dark, setDark] = useState(false);
  const [notes, setNotes] = useState(initialNotes);
  const [draft, setDraft] = useState({ title: "", body: "" });
  const [composerOpen, setComposerOpen] = useState(false);
  const [colorPickerId, setColorPickerId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState("notes");

  const colors = dark ? DARK_COLORS : LIGHT_COLORS;
  const colorFor = (name) => colors.find((c) => c.name === name) || colors[0];

  const addNote = () => {
    if (!draft.title.trim() && !draft.body.trim()) {
      setComposerOpen(false);
      return;
    }
    setNotes([{ id: Date.now(), title: draft.title, body: draft.body, color: "default", pinned: false }, ...notes]);
    setDraft({ title: "", body: "" });
    setComposerOpen(false);
  };

  const deleteNote = (id) => setNotes(notes.filter((n) => n.id !== id));
  const togglePin = (id) => setNotes(notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)));
  const setColor = (id, color) => {
    setNotes(notes.map((n) => (n.id === id ? { ...n, color } : n)));
    setColorPickerId(null);
  };

  const pinned = notes.filter((n) => n.pinned);
  const others = notes.filter((n) => !n.pinned);

  const bgPage = dark ? "bg-gray-900" : "bg-gray-50";
  const textPrimary = dark ? "text-gray-100" : "text-gray-900";
  const textSecondary = dark ? "text-gray-400" : "text-gray-500";
  const headerBorder = dark ? "border-gray-700" : "border-gray-200";
  const inputBg = dark ? "bg-gray-800" : "bg-white";

  const NoteCard = ({ note }) => {
    const c = colorFor(note.color);
    return (
      <div
        className={`group relative rounded-xl border ${c.border} ${c.bg} p-4 break-inside-avoid mb-4 transition-colors`}
      >
        <button
          onClick={() => togglePin(note.id)}
          className={`absolute top-2 right-2 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${
            dark ? "hover:bg-gray-700" : "hover:bg-black/5"
          } ${note.pinned ? "opacity-100" : ""}`}
        >
          <Pin
            size={16}
            className={note.pinned ? (dark ? "fill-gray-200 text-gray-200" : "fill-gray-700 text-gray-700") : textSecondary}
          />
        </button>

        {note.title && <h3 className={`font-medium mb-1 pr-8 ${textPrimary}`}>{note.title}</h3>}
        <p className={`text-sm whitespace-pre-wrap pr-8 ${textPrimary}`}>{note.body}</p>

        <div
          className={`flex items-center justify-between mt-3 pt-1 opacity-0 group-hover:opacity-100 transition-opacity`}
        >
          <div className="relative">
            <button
              onClick={() => setColorPickerId(colorPickerId === note.id ? null : note.id)}
              className={`p-1.5 rounded-full ${dark ? "hover:bg-gray-700" : "hover:bg-black/5"}`}
            >
              <Palette size={16} className={textSecondary} />
            </button>
            {colorPickerId === note.id && (
              <div
                className={`absolute z-10 bottom-9 left-0 flex gap-1 p-2 rounded-lg border shadow-lg flex-wrap w-40 ${headerBorder} ${inputBg}`}
              >
                {colors.map((col) => (
                  <button
                    key={col.name}
                    onClick={() => setColor(note.id, col.name)}
                    className={`w-6 h-6 rounded-full border ${col.border} ${col.bg} ${
                      note.color === col.name ? "ring-2 ring-offset-1 ring-blue-400" : ""
                    }`}
                    title={col.name}
                  />
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => deleteNote(note.id)}
            className={`p-1.5 rounded-full ${dark ? "hover:bg-gray-700" : "hover:bg-black/5"}`}
          >
            <Trash2 size={16} className={textSecondary} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${bgPage} transition-colors`}>
      <header className={`sticky top-0 z-20 border-b ${headerBorder} ${bgPage} px-4 py-3 flex items-center justify-between gap-4`}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-2 rounded-full ${dark ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
            aria-label="Toggle sidebar"
          >
            <Menu size={20} className={textSecondary} />
          </button>
          <h1 className={`text-xl font-medium ${textPrimary}`}>Keep</h1>
        </div>
        <button
          onClick={() => setDark(!dark)}
          className={`p-2 rounded-full border ${headerBorder} ${dark ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
          aria-label="Toggle theme"
        >
          {dark ? <Sun size={18} className="text-yellow-300" /> : <Moon size={18} className="text-gray-600" />}
        </button>
      </header>

      <div className="flex">
        <aside
          className={`shrink-0 border-r ${headerBorder} transition-all duration-200 overflow-hidden ${
            sidebarOpen ? "w-56" : "w-0"
          }`}
        >
          <nav className="w-56 py-2">
            {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
              const active = activeView === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveView(key)}
                  className={`w-full flex items-center gap-4 pl-6 pr-4 py-2.5 rounded-r-full text-sm transition-colors ${
                    active
                      ? dark
                        ? "bg-yellow-900/40 text-yellow-200 font-medium"
                        : "bg-yellow-100 text-yellow-900 font-medium"
                      : `${textSecondary} ${dark ? "hover:bg-gray-800" : "hover:bg-gray-100"}`
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 max-w-3xl mx-auto px-6 py-8 w-full">
        {/* Composer */}
        <div className={`rounded-xl border ${headerBorder} ${inputBg} p-3 mb-8 shadow-sm`}>
          {!composerOpen ? (
            <button
              onClick={() => setComposerOpen(true)}
              className={`w-full text-left ${textSecondary}`}
            >
              Take a note...
            </button>
          ) : (
            <div>
              <input
                autoFocus
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                placeholder="Title"
                className={`w-full bg-transparent outline-none font-medium mb-2 ${textPrimary}`}
              />
              <textarea
                value={draft.body}
                onChange={(e) => setDraft({ ...draft, body: e.target.value })}
                placeholder="Take a note..."
                rows={3}
                className={`w-full bg-transparent outline-none text-sm resize-none ${textPrimary}`}
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => {
                    setDraft({ title: "", body: "" });
                    setComposerOpen(false);
                  }}
                  className={`px-3 py-1.5 rounded text-sm ${textSecondary} ${dark ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                >
                  <X size={14} className="inline mr-1" />
                  Close
                </button>
                <button
                  onClick={addNote}
                  className={`px-3 py-1.5 rounded text-sm font-medium ${
                    dark ? "bg-blue-600 hover:bg-blue-500 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  <Plus size={14} className="inline mr-1" />
                  Add
                </button>
              </div>
            </div>
          )}
        </div>

        {pinned.length > 0 && (
          <section className="mb-6">
            <h2 className={`text-xs font-medium uppercase tracking-wide mb-2 ${textSecondary}`}>Pinned</h2>
            <div className="columns-2 md:columns-3 gap-4">
              {pinned.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          </section>
        )}

        {others.length > 0 && (
          <section>
            {pinned.length > 0 && (
              <h2 className={`text-xs font-medium uppercase tracking-wide mb-2 ${textSecondary}`}>Others</h2>
            )}
            <div className="columns-2 md:columns-3 gap-4">
              {others.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          </section>
        )}

        {notes.length === 0 && (
          <p className={`text-center mt-16 ${textSecondary}`}>Notes you add appear here.</p>
        )}
        </main>
      </div>
    </div>
  );
}
