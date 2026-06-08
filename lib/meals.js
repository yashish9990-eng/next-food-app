import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";
import path from "path";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  //   throw new Error("Failed to fetch meals");
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(mealSlug) {
  //   throw new Error("Failed to fetch meal");
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(mealSlug);
}

export async function saveMeal(meal) {
  // const stmt = db.prepare(
  //   "INSERT INTO meals (slug, title, summary, instructions, image, creator, creator_email) VALUES (?, ?, ?, ?, ?, ?, ?)",
  // );
  // stmt.run(
  //   slugify(meal.title, { lower: true }),
  //   xss(meal.title),
  //   xss(meal.summary),
  //   xss(meal.instructions),
  //   xss(meal.image),
  //   xss(meal.creator),
  //   xss(meal.creator_email),
  // );

  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  // Ensure slug is unique by appending a counter if needed
  const baseSlug = meal.slug;
  let uniqueSlug = baseSlug;
  let counter = 1;
  while (db.prepare("SELECT 1 FROM meals WHERE slug = ?").get(uniqueSlug)) {
    uniqueSlug = `${baseSlug}-${counter}`;
    counter += 1;
  }
  meal.slug = uniqueSlug;

  const extention = meal.image.name.split(".").pop();
  const filename = `${meal.slug}.${extention}`;
  const bufferedImage = await meal.image.arrayBuffer();
  const buffer = Buffer.from(bufferedImage);

  const imagesDir = path.join(process.cwd(), "public", "images");
  await fs.promises.mkdir(imagesDir, { recursive: true });
  const filepath = path.join(imagesDir, filename);

  try {
    await fs.promises.writeFile(filepath, buffer);
  } catch (err) {
    throw new Error("Failed to save the image.");
  }

  meal.image = `/images/${filename}`;

  db.prepare(
    `INSERT INTO meals (slug, title, summary, instructions, image, creator, creator_email) VALUES (@slug, @title, @summary, @instructions, @image, @creator, @creator_email)`,
  ).run(meal);
}
