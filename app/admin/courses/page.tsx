"use client";
import { useEffect, useState } from "react";
import CourseForm from "../../../components/course-form";
import CourseCard from "../../../components/course-card";
import { Course } from "../../../lib/course";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  async function load() {
    const res = await fetch("/api/courses", { cache: "no-store" });
    const json = await res.json();
    setCourses(json?.data || []);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Admin — Courses</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <CourseForm onSaved={load} />
        </div>
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {courses.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
