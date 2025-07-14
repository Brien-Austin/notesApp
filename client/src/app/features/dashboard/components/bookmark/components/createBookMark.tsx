import { apiRequest } from "@/app/api/api";
import { POST_NOTE } from "@/app/api/api_constants";
import { Button } from "@/app/features/common/components/button";
import { X } from "lucide-react";
import React, { useState } from "react";
import { useCreateBookmark } from "../../notes/hooks/useBookMark";

interface BookMarkFormProps {
  onClose: () => void;
}

const CreateBookMark: React.FC<BookMarkFormProps> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("https://");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [urlError, setUrlError] = useState("");

  const { mutate: createBookMark, isPending } = useCreateBookmark();

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const handleTagClick = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const isValidUrl = (input: string) => {
    try {
      new URL(input);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidUrl(url)) {
      setUrlError("Please enter a valid URL (e.g., https://example.com)");
      return;
    }

    setUrlError("");

    createBookMark(
      {
        url,
        title,
        tags,
      },
      {
        onSuccess: () => {
          setTitle("");
          setUrl("");
          setTags([]);
          setTagInput("");
          setUrlError("");
          onClose();
        },
        onError: (err: any) => {
          console.error("Create Note Error:", err.message);
        },
      }
    );
  };

  return (
    <form
      className="pt-4"
      onSubmit={handleSubmit}
      style={{ maxWidth: 400, margin: "0 auto" }}
    >
      <div>
        <label className="text-[#4f4f4f] font-semibold">URL please</label>
        <input
          type="text"
          value={url}
          className={`border mt-1 px-4 py-3 focus:outline-0 rounded-md w-full ${
            urlError ? "border-red-500" : "border-sky-600"
          }`}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        {urlError && <p className="text-red-500 text-sm mt-1">{urlError}</p>}
      </div>
      <div className="mt-4">
        <label className="text-[#4f4f4f] font-semibold">
          Give a name to remember this Bookmark✏️
        </label>
        <textarea
          className="border mt-1 border-sky-600 px-4 py-3 focus:outline-0 rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: "100%", minHeight: 80 }}
        />
      </div>
      <div className="mt-4">
        <label className="text-[#4f4f4f] font-semibold">Tags 🏷️</label>
        <div
          className="py-2"
          style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 4 }}
        >
          {tags.map((tag) => (
            <div
              key={tag}
              style={{
                background: "#eee",
              }}
              className="px-3 py-2 rounded-md border border-sky-600 flex gap-3 items-center justify-between"
            >
              <h1>{tag}</h1>
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="w-5 h-5 flex items-center justify-center bg-red-500 text-white rounded-full border-none"
                style={{
                  fontWeight: "bold",
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
                aria-label={`Remove tag ${tag}`}
              >
                <X size={10} />
              </button>
            </div>
          ))}
        </div>
        <input
          className="border border-sky-600 px-4 py-3 focus:outline-0 rounded-md placeholder:text-sm"
          type="text"
          value={tagInput}
          onChange={handleTagInput}
          onKeyDown={handleTagKeyDown}
          placeholder="Type and press Enter"
        />
      </div>
      <div className="flex mt-5 justify-between items-center">
        <Button onClick={handleSubmit} variant="outline">
          Add this Bookmark
        </Button>
        <Button onClick={() => onClose()} variant="outline">
          Close
        </Button>
      </div>
    </form>
  );
};

export default CreateBookMark;
