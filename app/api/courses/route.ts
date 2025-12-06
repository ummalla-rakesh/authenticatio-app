/* eslint-disable @typescript-eslint/no-explicit-any */
import { normalizeCourse } from "@/lib/course";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const search = url.searchParams.get("search") || "";
  const category = url.searchParams.get("category");
  const topics = url.searchParams.get("topics"); // comma separated
  const minPrice = url.searchParams.get("minPrice");
  const maxPrice = url.searchParams.get("maxPrice");

  const supabase = await createClient();

  let query = supabase.from("courses").select("*");

  if (search) {
    // Search title or description
    query = query
      .ilike("title", `%${search}%`)
      .or(`description.ilike.%${search}%`);
  }

  if (category) {
    query = query.eq("category", category);
  }

  if (topics) {
    const t = topics.split(",").map((s) => s.trim());
    // Use filter where topics && array
    query = query.contains("topics", t);
  }

  if (minPrice) {
    query = query.gte("price", Number(minPrice));
  }
  if (maxPrice) {
    query = query.lte("price", Number(maxPrice));
  }

  const { data, error } = await query
    .order("created_at", { ascending: false })
    .limit(100);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  const normalized = (data || []).map(normalizeCourse);

  return NextResponse.json({ data: normalized });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received body:", body);
    const supabase = await createClient();

    const insert = {
      title: body.title,
      description: body.description,
      length: body.length,
      topics: body.topics,
      price: body.price,
      category: body.category || null,
      image_url: body.image_url || null,
    };

    const { data, error } = await supabase
      .from("courses")
      .insert(insert)
      .select()
      .single();

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ data: normalizeCourse(data) });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || String(err) },
      { status: 500 }
    );
  }
}
