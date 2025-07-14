"use client";
import { useProfile } from "@/app/features/auth/hooks/useProfile";
import HeroText from "@/app/features/common/components/heroText";
import RecentActivity from "@/app/features/dashboard/components/dashboard/components/dashboardActivity";
import { extractNameFromEmail } from "@/app/utils/name";

export default function Home() {
  const { data, isLoading, error } = useProfile();

  if (isLoading)
    return (
      <div className="text-center text-gray-600">Loading dashboard...</div>
    );
  if (error)
    return (
      <div className="text-center text-red-600">Failed to load dashboard</div>
    );

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mt-4">
        Hello, {extractNameFromEmail(data?.userName)}
      </h2>
      <p className="text-gray-600 mt-2">
        You have <span className="font-medium">{data?.stats.notes}</span> notes
        and <span className="font-medium">{data?.stats.bookmarks}</span>{" "}
        bookmarks.
      </p>
      <RecentActivity
        notes={data?.recentActivity.notes || []}
        bookmarks={data?.recentActivity.bookmarks || []}
      />
    </main>
  );
}
