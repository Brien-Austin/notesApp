"use client";
import { JSX, useEffect, useState } from "react";
import {
  Tag,
  useTags,
} from "@/app/features/dashboard/components/notes/hooks/useNotes";

type BookmarkSearchBarProps = {
  query: string;
  onQueryChange: (q: string) => void;
  selectedTags: Tag[];
  onTagsChange: (tags: Tag[]) => void;
};

export default function BookmarkSearchBar({
  query,
  onQueryChange,
  selectedTags,
  onTagsChange,
}: BookmarkSearchBarProps): JSX.Element {
  const [inputValue, setInputValue] = useState(query);
  const [showAllTags, setShowAllTags] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onQueryChange(inputValue.trim());
    }, 400);
    return () => clearTimeout(timeout);
  }, [inputValue, onQueryChange]);

  const { data: allTags = [] } = useTags();

  const toggleTag = (tag: Tag) => {
    const isSelected = selectedTags.some((t) => t._id === tag._id);
    if (isSelected) {
      onTagsChange(selectedTags.filter((t) => t._id !== tag._id));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const toggleShowTags = () => {
    setShowAllTags(!showAllTags);
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-2/3">
          <input
            type="text"
            placeholder="Search by title or description..."
            className="w-full px-4 py-3 pl-10 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ease-in-out"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {allTags.length > 0 && (
          <button
            onClick={toggleShowTags}
            className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 ease-in-out"
          >
            <span>Filter by Tags</span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                showAllTags ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        )}
      </div>

      {showAllTags && allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 animate-in fade-in duration-300">
          {allTags.map((tag) => {
            const isActive = selectedTags.some((t) => t._id === tag._id);
            return (
              <button
                key={tag._id}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 ease-in-out transform hover:scale-105 ${
                  isActive
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                }`}
              >
                {tag.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
