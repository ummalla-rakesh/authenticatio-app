import AddToCartButton from "@/components/add-to-cart";
import { normalizeCourse } from "@/lib/course";
import { createClient } from "@/lib/supabase/server";

export default async function CoursePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return <div className="p-8">Course not found</div>;
  const course = normalizeCourse(data);

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <img
            src={course.image_url || "/placeholder.png"}
            alt={course.title}
            className="w-full h-64 object-cover rounded"
          />
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="text-sm text-muted-foreground">
            {course.category} • {course.length}
          </p>
          <p className="mt-2">{course.description}</p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Topics covered</h3>
            <ul className="list-disc ml-5 mt-2">
              {course.topics.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
        <aside className="space-y-4">
          <div className="p-4 border rounded">
            <div className="text-2xl font-bold">
              ${course.price?.toFixed(2)}
            </div>
            <div className="mt-3">
              <AddToCartButton course={course} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
