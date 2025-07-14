"use client";
import { ProfileResponse } from "@/app/types/types";
import { FileText, Bookmark } from "lucide-react";

type RecentActivityProps = {
  notes: ProfileResponse["recentActivity"]["notes"];
  bookmarks: ProfileResponse["recentActivity"]["bookmarks"];
};

export default function RecentActivity({
  notes,
  bookmarks,
}: RecentActivityProps) {
  return (
    <section className="mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 transition-all duration-300 hover:shadow-lg">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <FileText className="w-4 sm:w-5 h-4 sm:h-5 text-indigo-600" />
            Recent Notes
          </h3>
          {notes.length === 0 ? (
            <p className="text-gray-500 text-sm italic">
              No recent notes available.
            </p>
          ) : (
            <ul className="space-y-2">
              {notes.map((note) => (
                <li
                  key={note._id}
                  className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <FileText className="w-3 sm:w-4 h-3 sm:h-4 text-gray-500 flex-shrink-0" />
                  <span className="text-gray-700 text-xs sm:text-sm truncate">
                    {note.title}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 transition-all duration-300 hover:shadow-lg">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Bookmark className="w-4 sm:w-5 h-4 sm:h-5 text-indigo-600" />
            Recent Bookmarks
          </h3>
          {bookmarks.length === 0 ? (
            <p className="text-gray-500 text-sm italic">
              No recent bookmarks available.
            </p>
          ) : (
            <ul className="space-y-2">
              {bookmarks.map((bm) => (
                <li
                  key={bm._id}
                  className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <Bookmark className="w-3 sm:w-4 h-3 sm:h-4 text-gray-500 flex-shrink-0" />
                  <a
                    href={bm.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 text-xs sm:text-sm truncate"
                    aria-label={`Visit bookmark: ${bm.title}`}
                  >
                    {bm.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
