import { createClient } from "../../lib/supabase/server";
import CourseList from "../../components/course-list";
import CourseFilters from "../../components/course-filters";
import { normalizeCourse } from "../../lib/course";

export default async function CoursesPage() {
  //     {
  //   searchParams,
  // }: {
  //   searchParams?: any;
  // }
  const supabase = await createClient();
  const query = supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  //   const search = (await searchParams?.search) || "";
  //   const category = (await searchParams?.category) || "";

  //   if (search) {
  //     query = query
  //       .ilike("title", `%${search}%`)
  //       .or(`description.ilike.%${search}%`);
  //   }
  //   if (category) {
  //     query = query.eq("category", category);
  //   }

  const { data } = await query;
  const courses = (data || []).map(normalizeCourse);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">All Courses</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1">
          {/* Filters */}
          <CourseFilters />
        </aside>
        <main className="lg:col-span-3">
          <CourseList courses={courses} />
        </main>
      </div>
    </div>
  );
}
