import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Tag,
  Calendar,
  Star,
  MoreVertical,
  Edit,
  Trash2,
  X,
} from "lucide-react";
import { Note, useDeleteNote, useFavoriteNote } from "../hooks/useNotes";
import { useState, useEffect } from "react";
import NoteFormModal from "./noteFormModal";

interface NoteCardListProps {
  notes: Note[];
  onEdit?: (noteId: string) => void;
  onDelete?: (noteId: string) => void;
}

export default function NoteCardList({ notes, onDelete }: NoteCardListProps) {
  const { mutate: favoriteNote } = useFavoriteNote();
  const { mutate: deleteNote } = useDeleteNote();

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [editNoteId, setEditNoteId] = useState<string | null>(null);

  const handleFavorite = (noteId: string) => {
    favoriteNote({ id: noteId });
  };
  const handleDelete = (noteId: string) => {
    {
      deleteNote({ id: noteId });
      onDelete?.(noteId);
      setActiveMenu(null);
    }
  };

  const handleMenuToggle = (noteId: string) => {
    setActiveMenu(activeMenu === noteId ? null : noteId);
  };

  const handleEdit = (noteId: string) => {
    setEditNoteId(noteId);
    setActiveMenu(null);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (activeMenu && !(e.target as HTMLElement).closest(".action-menu")) {
        setActiveMenu(null);
      }
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeMenu) {
        setActiveMenu(null);
      }
    };

    if (activeMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [activeMenu]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 mb-20 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-6 px-2 sm:px-4 md:px-6">
        {notes.map((note) => {
          const formattedDate = format(
            new Date(note.createdAt),
            "MMM dd, yyyy"
          );

          return (
            <motion.div
              key={`${note._id}-${note.createdAt}-${note.tags}`}
              className="relative cursor-pointer bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border-l-4 border-b-2 border-t-2 border-blue-500 border-r-2 hover:shadow-xl transition-all duration-300 p-4 sm:p-6 flex flex-col justify-between group"
              whileHover={{ scale: 1.02, y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200/20 to-indigo-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

              <div className="space-y-3 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 flex-1">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <h2 className="text-base sm:text-lg font-bold text-gray-900 line-clamp-2 tracking-tight">
                      {note.title}
                    </h2>
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFavorite(note._id);
                      }}
                      className="flex items-center space-x-1 bg-yellow-500/10 text-yellow-600 hover:text-yellow-700 text-xs font-medium px-2 py-1 rounded-full hover:bg-yellow-500/20 transition-colors duration-200"
                      title={
                        note.isFavorite
                          ? "Remove from Favorites"
                          : "Add to Favorites"
                      }
                    >
                      <Star
                        className="h-3 w-3"
                        fill={note.isFavorite ? "currentColor" : "none"}
                      />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMenuToggle(note._id);
                      }}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                      title="More options"
                    >
                      <MoreVertical className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                  {note.content}
                </p>
              </div>

              <div className="mt-4 sm:mt-5 flex flex-wrap gap-2 relative z-10">
                {note.tags.map((tag) => (
                  <span
                    key={tag._id}
                    className="flex items-center space-x-1 bg-blue-500/10 text-blue-700 text-xs font-medium px-2 sm:px-3 py-0.5 sm:py-1 rounded-full hover:bg-blue-500/20 transition-colors duration-200"
                  >
                    <Tag className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>#{tag.name}</span>
                  </span>
                ))}
              </div>

              <div className="mt-4 sm:mt-5 flex items-center space-x-2 relative z-10">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                <p className="text-xs text-gray-500">
                  Created on:{" "}
                  <span className="font-medium">{formattedDate}</span>
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {activeMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
              className="action-menu bg-white rounded-xl shadow-2xl border border-gray-200 p-1 min-w-[200px] max-w-[90vw]"
            >
              <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
                <h3 className="text-sm font-medium text-gray-900">
                  What would you like to do?
                </h3>
                <button
                  onClick={() => setActiveMenu(null)}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              </div>

              <div className="py-1">
                <button
                  onClick={() => handleEdit(activeMenu)}
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors duration-200 rounded-lg mx-1"
                >
                  <Edit className="h-4 w-4 text-blue-600" />
                  <span>Edit Note</span>
                </button>
                <button
                  onClick={() => handleDelete(activeMenu)}
                  className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-3 transition-colors duration-200 rounded-lg mx-1"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                  <span>Delete Note</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {editNoteId && (
          <NoteFormModal
            mode="edit"
            noteId={editNoteId}
            onClose={() => setEditNoteId(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
