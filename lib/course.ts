export type Course = {
  id?: string;
  title: string;
  description: string;
  length: string; // e.g. "3h 20m"
  topics: string[];
  price: number;
  category?: string;
  image_url?: string;
  created_at?: string;
};

export function normalizeCourse(row: Course): Course {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    length: row.length,
    topics: Array.isArray(row.topics)
      ? row.topics
      : row.topics
      ? String(row.topics).split(",")
      : [],
    price: Number(row.price) || 0,
    category: row.category || "",
    image_url: row.image_url || "",
    created_at: row.created_at,
  };
}
