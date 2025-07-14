import { useEffect, useState } from "react";
import { Button } from "@/app/features/common/components/button";
import { X } from "lucide-react";
import {
  useBookmarkById,
  useCreateBookmark,
  useUpdateBookmark,
} from "../../notes/hooks/useBookMark";

interface BookmarkFormModalProps {
  bookmarkId?: string;
  mode: "create" | "edit";
  onClose: () => void;
}

const BookmarkFormModal: React.FC<BookmarkFormModalProps> = ({
  bookmarkId,
  mode,
  onClose,
}) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const { data: bookmarkData } = useBookmarkById(bookmarkId!, mode === "edit");
  const { mutate: createBookmark } = useCreateBookmark();
  const { mutate: updateBookmark } = useUpdateBookmark();

  useEffect(() => {
    if (mode === "edit" && bookmarkData) {
      setTitle(bookmarkData.title);
      setUrl(bookmarkData.url);
      setTags(bookmarkData.tags.map((tag) => tag.name));
    }
  }, [bookmarkData, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title,
      url,
      tags,
    };

    const onSuccess = () => {
      onClose();
    };

    if (mode === "create") {
      createBookmark(payload, { onSuccess });
    } else if (mode === "edit" && bookmarkId) {
      updateBookmark({ id: bookmarkId, ...payload }, { onSuccess });
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">
            {mode === "edit" ? "Edit" : "Create"} Bookmark
          </h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <input
          className="w-full border border-blue-500 rounded-md px-4 py-2 mb-4"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="w-full border border-blue-500 rounded-md px-4 py-2 mb-4"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <div className="mb-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center gap-2"
            >
              {tag}
              <button type="button" onClick={() => removeTag(tag)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <input
          className="w-full border border-blue-500 rounded-md px-4 py-2 mb-4"
          placeholder="Type and press Enter"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => {
            if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
              e.preventDefault();
              if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
                setTagInput("");
              }
            }
          }}
        />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="outline">
            {mode === "edit" ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookmarkFormModal;
