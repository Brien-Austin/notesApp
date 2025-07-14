import { Button } from "@/app/features/common/components/button";
import { X } from "lucide-react";
import React, { useState } from "react";
import { useCreateNote } from "../hooks/useNotes";
import toast from "react-hot-toast";

interface NoteFormProps {
  onClose: () => void;
}

const CreateNotes: React.FC<NoteFormProps> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const { mutate: createNote } = useCreateNote();
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

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const loading = toast.loading("Saving notes..");
    createNote(
      {
        title,
        content,
        tags,
      },
      {
        onSuccess: () => {
          toast.dismiss(loading);
          toast.success("Saved Note");
          setTitle("");
          setContent("");
          setTags([]);
          setTagInput("");
          onClose();
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
        <label className="text-[#4f4f4f] font-semibold">
          What`&apos;`s this about 🤔 ?
        </label>
        <input
          type="text"
          value={title}
          className="border mt-1 border-indigo-600 px-4 py-3 focus:outline-0 rounded-md"
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: "100%" }}
        />
      </div>
      <div className="mt-4">
        <label className=" text-[#4f4f4f] font-semibold">
          Add your thoughts ✏️
        </label>
        <textarea
          className="border mt-1 border-indigo-600 px-4 py-3 focus:outline-0 rounded-md"
          value={content}
          onChange={(e) => setContent(e.target.value)}
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
              className="px-3 py-2  rounded-md  border border-indigo-600 flex gap-3 items-center justify-between"
            >
              <h1> {tag}</h1>
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
          className="border  border-indigo-600 px-4 py-3 focus:outline-0 rounded-md placeholder:text-sm"
          type="text"
          value={tagInput}
          onChange={handleTagInput}
          onKeyDown={handleTagKeyDown}
          placeholder="Type and press Enter"
        />
      </div>
      <div className="flex  mt-5 justify-between items-center">
        <Button onClick={handleSubmit} variant="outline">
          Save Note
        </Button>
        <Button onClick={() => onClose()} variant="outline">
          Close
        </Button>
      </div>
    </form>
  );
};

export default CreateNotes;
