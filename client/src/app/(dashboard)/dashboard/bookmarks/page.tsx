"use client";

import HeroText from "@/app/features/common/components/heroText";
import { Button } from "@/app/features/common/components/button";
import { useState } from "react";
import BookMarkCardList from "@/app/features/dashboard/components/bookmark/components/bookmarkCard";
import { useBookmarks } from "@/app/features/dashboard/components/notes/hooks/useBookMark";
import BookmarkSearchBar from "@/app/features/dashboard/components/bookmark/components/bookmarkSearchBar";
import { Tag } from "@/app/features/dashboard/components/notes/hooks/useNotes";
import CreateBookmarkModal from "@/app/features/dashboard/components/bookmark/components/createBookMarkModal";

export default function BookMark() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const tagIds = selectedTags.map((tag) => tag._id);
  const {
    data: bookmarks,
    isLoading,
    isError,
    error,
  } = useBookmarks(searchQuery, tagIds);

  if (isLoading) return <div>Loading bookmarks...</div>;
  if (isError)
    return <div>Error loading bookmarks: {(error as Error).message}</div>;

  return (
    <main className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="hidden md:block">
          <HeroText content="Your Bookmarks" />
        </div>
        <div className="hidden md:block">
          <Button onClick={() => setOpen(true)} variant="outline">
            Add Bookmark
          </Button>
        </div>
        <CreateBookmarkModal isOpen={open} onClose={() => setOpen(false)} />
      </div>

      <BookmarkSearchBar
        query={searchQuery}
        onQueryChange={setSearchQuery}
        selectedTags={selectedTags}
        onTagsChange={setSelectedTags}
      />

      {bookmarks?.length === 0 ? (
        <div className="text-center mt-8 text-gray-500">
          No bookmarks found.
        </div>
      ) : (
        <BookMarkCardList bookMarks={bookmarks ?? []} />
      )}
    </main>
  );
}
