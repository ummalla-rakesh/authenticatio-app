"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CourseFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");

  function apply() {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    router.push(`/courses?${params.toString()}`);
  }

  return (
    <div className="space-y-2 p-4 border rounded">
      <div>
        <label className="block text-sm font-medium">Search</label>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mt-1 p-2 border rounded"
          placeholder="Search title or description"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Category</label>
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full mt-1 p-2 border rounded"
          placeholder="e.g. JavaScript, ML"
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={apply}
          className="px-3 py-2 bg-blue-600 text-white rounded"
        >
          Apply
        </button>
        <button
          onClick={() => {
            setSearch("");
            setCategory("");
            router.push("/courses");
          }}
          className="px-3 py-2 border rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
