import React, { useState } from "react";

interface NoteFormProps {
  onSubmit: (note: { title: string; content: string; tags: string[] }) => void;
}

const CreateNotes: React.FC<NoteFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content, tags });
    setTitle("");
    setContent("");
    setTags([]);
    setTagInput("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: "100%" }}
        />
      </div>
      <div>
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          style={{ width: "100%", minHeight: 80 }}
        />
      </div>
      <div>
        <label>Tags</label>
        <div
          style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                background: "#eee",
                padding: "2px 8px",
                borderRadius: 12,
              }}
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                style={{ marginLeft: 4 }}
              >
                x
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          value={tagInput}
          onChange={handleTagInput}
          onKeyDown={handleTagKeyDown}
          placeholder="Enter tag and press Enter"
          style={{ width: "70%" }}
        />
        <button
          type="button"
          onClick={handleTagClick}
          style={{ marginLeft: 8 }}
        >
          Add Tag
        </button>
      </div>
      <button type="submit" style={{ marginTop: 16 }}>
        Save Note
      </button>
    </form>
  );
};

export default CreateNotes;
