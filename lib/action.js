"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

export async function shareMealState(prevState, formData) {
  function isValidText(text) {
    return text && text.trim().length > 0;
  }
    // console.log("Sharing meal...");
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    !isValidText(meal.title) ||
    !isValidText(meal.summary) ||
    !isValidText(meal.instructions) ||
    !isValidText(meal.creator) ||
    !isValidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return { message: "Invalid input." };
  }

  try {
    await saveMeal(meal);
    revalidatePath("/meals");
    return { redirect: "/meals" };
  } catch (err) {
    console.error("shareMealState error:", err);
    return { message: err?.message || "Server error" };
  }
}
