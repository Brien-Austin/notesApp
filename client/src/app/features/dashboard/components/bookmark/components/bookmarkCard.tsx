import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Tag,
  Calendar,
  Copy,
  Star,
  MoreVertical,
  Edit,
  Trash2,
  X,
} from "lucide-react";
import {
  Bookmark,
  useFavoriteBookmark,
  useDeleteBookmark,
} from "../../notes/hooks/useBookMark";
import { useState, useEffect } from "react";
import BookmarkFormModal from "./bookFormModal";

interface BookMarkCardListProps {
  bookMarks: Bookmark[];
  onEdit?: (bookmarkId: string) => void;
  onDelete?: (bookmarkId: string) => void;
}

export default function BookMarkCardList({
  bookMarks,
  onEdit,
  onDelete,
}: BookMarkCardListProps) {
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [editBookmarkId, setEditBookmarkId] = useState<string | null>(null);

  const { mutate: favoriteBookmark } = useFavoriteBookmark();
  const { mutate: deleteBookmark } = useDeleteBookmark();

  const handleCopy = async (url: string, uniqueId: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedStates((prev) => ({ ...prev, [uniqueId]: true }));
      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [uniqueId]: false }));
      }, 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  const handleFavorite = (bookmarkId: string) => {
    favoriteBookmark({ id: bookmarkId });
  };

  const handleMenuToggle = (bookmarkId: string) => {
    setActiveMenu(activeMenu === bookmarkId ? null : bookmarkId);
  };

  const handleEdit = (bookmarkId: string) => {
    setEditBookmarkId(bookmarkId);
    setActiveMenu(null);
    onEdit?.(bookmarkId);
  };

  const handleDelete = (bookmarkId: string) => {
    deleteBookmark({ id: bookmarkId });
    onDelete?.(bookmarkId);
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
      <div className="space-y-4 mt-6 px-2 sm:px-4 md:px-32 mb-20">
        {bookMarks.map((bookMark) => {
          const uniqueId = `${bookMark._id}-${bookMark.createdAt}`;
          const formattedDate = format(
            new Date(bookMark.createdAt),
            "MMM dd, yyyy"
          );
          const isCopied = copiedStates[uniqueId] || false;

          return (
            <motion.div
              key={uniqueId}
              className="relative cursor-pointer bg-gradient-to-br from-white to-gray-50 rounded shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between overflow-hidden group"
              whileHover={{ scale: 1.01, y: -3 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200/20 to-indigo-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded" />

              <div className="relative z-10 flex-1 space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <h2 className="text-base sm:text-lg font-bold text-gray-900 line-clamp-1 tracking-tight">
                      {bookMark.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => handleMenuToggle(bookMark._id)}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                    title="More options"
                  >
                    <MoreVertical className="h-4 w-4 text-gray-500" />
                  </button>
                </div>

                <a
                  href={bookMark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 line-clamp-1 transition-colors duration-200"
                >
                  {bookMark.url}
                </a>

                <div className="flex flex-wrap gap-2">
                  {bookMark.tags.map((tag) => (
                    <span
                      key={tag._id}
                      className="flex items-center space-x-1 bg-blue-500/10 text-blue-700 text-xs font-medium px-2 sm:px-3 py-0.5 sm:py-1 rounded-full hover:bg-blue-500/20 transition-colors duration-200"
                    >
                      <Tag className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>{tag.name}</span>
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                  <p className="text-xs text-gray-500">
                    Created on:{" "}
                    <span className="font-medium">{formattedDate}</span>
                  </p>
                </div>
              </div>

              <div className="relative z-10 mt-4 sm:mt-0 sm:ml-4 flex items-center space-x-3">
                <button
                  onClick={() => handleFavorite(bookMark._id)}
                  className="flex items-center space-x-2 bg-yellow-500/10 text-yellow-600 hover:text-yellow-700 text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:bg-yellow-500/20 transition-colors duration-200"
                  title={
                    bookMark.isFavorite
                      ? "Remove from Favorites"
                      : "Add to Favorites"
                  }
                >
                  <Star
                    className="h-4 w-4"
                    fill={bookMark.isFavorite ? "currentColor" : "none"}
                  />
                  <span>{bookMark.isFavorite ? "Favorited" : "Favorite"}</span>
                </button>
                <button
                  onClick={() => handleCopy(bookMark.url, uniqueId)}
                  className="flex items-center space-x-2 bg-blue-600 text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:bg-blue-700 transition-colors duration-200"
                >
                  <Copy className="h-4 w-4" />
                  <span>{isCopied ? "Copied!" : "Copy Link"}</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Action Menu */}
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
                  <span>Edit Bookmark</span>
                </button>
                <button
                  onClick={() => handleDelete(activeMenu)}
                  className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-3 transition-colors duration-200 rounded-lg mx-1"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                  <span>Delete Bookmark</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {editBookmarkId && (
          <BookmarkFormModal
            mode="edit"
            bookmarkId={editBookmarkId}
            onClose={() => setEditBookmarkId(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
