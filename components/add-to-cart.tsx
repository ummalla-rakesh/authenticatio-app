"use client";
import { useState, useEffect } from "react";
import { Course } from "../lib/course";

function readCart(): Course[] {
  try {
    const raw = localStorage.getItem("cart:v1");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function AddToCartButton({ course }: { course: Course }) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const cart = readCart();
    setAdded(cart.some((c) => c.id === course.id));
  }, [course.id]);

  function add() {
    const cart = readCart();
    if (!cart.some((c) => c.id === course.id)) {
      cart.push(course);
      localStorage.setItem("cart:v1", JSON.stringify(cart));
      setAdded(true);
    }
  }

  return (
    <button
      onClick={add}
      className={`px-4 py-2 rounded ${
        added ? "bg-gray-400" : "bg-indigo-600 text-white"
      }`}
    >
      {added ? "Added" : "Add to cart"}
    </button>
  );
}
