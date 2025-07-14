"use client";
import { JSX, useState } from "react";
import { Button } from "@/app/features/common/components/button";
import NoteCardList from "@/app/features/dashboard/components/notes/components/noteCard";
import CreateNoteModal from "@/app/features/dashboard/components/notes/components/createNodeModal";
import {
  Tag,
  useNotes,
} from "@/app/features/dashboard/components/notes/hooks/useNotes";
import BookMarkCardList from "@/app/features/dashboard/components/bookmark/components/bookmarkCard";
import { useBookmarks } from "@/app/features/dashboard/components/notes/hooks/useBookMark";

export default function NotesPage(): JSX.Element {
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery] = useState<string>("");
  const [selectedTags] = useState<Tag[]>([]);
  const [viewMode, setViewMode] = useState<"notes" | "bookmarks">("notes");

  const tagIds = selectedTags.map((tag) => tag._id);

  const {
    data: notes,
    isLoading: loadingNotes,
    isError: notesError,
    error: notesErrorMessage,
  } = useNotes(searchQuery, tagIds);

  const {
    data: bookmarks,
    isLoading: loadingBookmarks,
    isError: bookmarksError,
    error: bookmarksErrorMessage,
  } = useBookmarks(searchQuery, tagIds);

  const filteredNotes = (notes ?? []).filter((note) => note.isFavorite);
  const filteredBookmarks = (bookmarks ?? []).filter((bm) => bm.isFavorite);

  const isLoading = viewMode === "notes" ? loadingNotes : loadingBookmarks;
  const isError = viewMode === "notes" ? notesError : bookmarksError;
  const error =
    viewMode === "notes" ? notesErrorMessage : bookmarksErrorMessage;

  const isEmpty =
    (viewMode === "notes" && filteredNotes.length === 0) ||
    (viewMode === "bookmarks" && filteredBookmarks.length === 0);

  return (
    <main className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setViewMode("notes")}>
            Notes
          </Button>
          <Button variant="outline" onClick={() => setViewMode("bookmarks")}>
            Bookmarks
          </Button>
        </div>

        <CreateNoteModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
        />
      </div>

      {isLoading && <div>Loading {viewMode}...</div>}
      {isError && <div>Error: {(error as Error).message}</div>}
      {!isLoading && !isError && isEmpty && (
        <div className="flex items-center justify-center mt-8">
          No favorite {viewMode} found.
        </div>
      )}

      {!isLoading &&
        !isError &&
        !isEmpty &&
        (viewMode === "notes" ? (
          <NoteCardList notes={filteredNotes} />
        ) : (
          <BookMarkCardList bookMarks={filteredBookmarks} />
        ))}
    </main>
  );
}
