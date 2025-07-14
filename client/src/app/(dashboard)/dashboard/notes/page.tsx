"use client";

import { JSX, useState } from "react";
import HeroText from "@/app/features/common/components/heroText";
import { Button } from "@/app/features/common/components/button";
import NoteCardList from "@/app/features/dashboard/components/notes/components/noteCard";
import NoteSearchBar from "@/app/features/dashboard/components/notes/components/noteSearchBar";
import {
  Tag,
  useNotes,
} from "@/app/features/dashboard/components/notes/hooks/useNotes";
import CreateNoteModal from "@/app/features/dashboard/components/notes/components/createNodeModal";

export default function NotesPage(): JSX.Element {
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const tagIds = selectedTags.map((tag) => tag._id);
  const {
    data: notes,
    isLoading,
    isError,
    error,
  } = useNotes(searchQuery, tagIds);

  if (isLoading) return <div>Loading notes...</div>;
  if (isError)
    return <div>Error loading notes: {(error as Error).message}</div>;
  if (notes?.length === 0)
    return (
      <>
        {" "}
        <NoteSearchBar
          query={searchQuery}
          onQueryChange={setSearchQuery}
          selectedTags={selectedTags}
          onTagsChange={setSelectedTags}
        />
        <div className="flex items-center justify-center mt-8">
          No notes found.
        </div>
      </>
    );

  return (
    <main className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="hidden md:block">
          <HeroText content="Your Notes" />
        </div>

        <div className="hidden md:block">
          <Button
            onClick={() => setModalOpen(true)}
            variant="outline"
            className="hidden md:block"
          >
            Create Note
          </Button>
        </div>

        <CreateNoteModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
        />
      </div>

      <NoteSearchBar
        query={searchQuery}
        onQueryChange={setSearchQuery}
        selectedTags={selectedTags}
        onTagsChange={setSelectedTags}
      />

      <NoteCardList notes={notes ?? []} />
    </main>
  );
}
