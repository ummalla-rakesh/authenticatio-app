import Link from "next/link";
import { Course } from "../lib/course";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <Link href={`/courses/${course.id}`} className="space-y-2 block">
        <img
          src={course.image_url || "/placeholder.png"}
          alt={course.title}
          className="w-full h-40 object-cover rounded"
        />
        <h3 className="text-lg font-semibold">{course.title}</h3>
        <p className="text-sm text-muted-foreground">
          {course.category} • {course.length}
        </p>
        <p className="text-sm line-clamp-2">{course.description}</p>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            {course.topics?.slice(0, 3).join(", ")}
          </div>
          <div className="font-bold">${course.price?.toFixed(2)}</div>
        </div>
      </Link>
    </div>
  );
}
