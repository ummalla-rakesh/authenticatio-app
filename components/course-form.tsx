"use client";
import { useState } from "react";

export default function CourseForm({ onSaved }: { onSaved?: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [length, setLength] = useState("");
  const [topics, setTopics] = useState("");
  const [price, setPrice] = useState("0");
  const [category, setCategory] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const body = {
      title,
      description,
      length,
      topics: topics
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      price: Number(price),
      category,
      image_url,
    };

    const res = await fetch("/api/courses", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    const json = await res.json();
    setLoading(false);
    if (res.ok) {
      setTitle("");
      setDescription("");
      setLength("");
      setTopics("");
      setPrice("0");
      setCategory("");
      setImageUrl("");
      onSaved?.();
      alert("Course saved");
    } else {
      alert(json?.error || "Failed");
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3 p-4 border rounded">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-medium">Length</label>
          <input
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="e.g. 3h 20m"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded"
            type="number"
            step="0.01"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">
          Topics (comma separated)
        </label>
        <input
          value={topics}
          onChange={(e) => setTopics(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Category</label>
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Image URL</label>
        <input
          value={image_url}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          {loading ? "Saving..." : "Save Course"}
        </button>
      </div>
    </form>
  );
}
