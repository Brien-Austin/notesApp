import { Tag } from "../features/dashboard/components/notes/hooks/useBookMark";

export type SidebarContextType = {
  isExpanded: boolean;
  setIsExpanded: (val: boolean) => void;
};

export type ActivityNote = {
  _id: string;
  title: string;
  tags: Tag[];
  isFavorite: boolean;
  createdAt: string;
};

export type ActivityBookmark = {
  _id: string;
  url: string;
  title: string;
  tags: Tag[];
  createdAt: string;
};

export type ProfileResponse = {
  userName: string;
  stats: {
    notes: number;
    bookmarks: number;
  };
  recentActivity: {
    notes: ActivityNote[];
    bookmarks: ActivityBookmark[];
  };
};
