"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

export async function shareMeal(prevState,formData) {
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
    return {message: "Invalid input."};
  }

  if (
    isValidText(meal.title) ||
    isValidText(meal.summary) ||
    isValidText(meal.instructions) ||
    isValidText(meal.creator) ||
    isValidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {

  }
  // console.log("Received meal data:", meal);

  await saveMeal(meal);
  redirect("/meals");
}
