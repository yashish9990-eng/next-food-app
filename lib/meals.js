import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";
import path from "path";
import { error } from "node:console";

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

  const extention = meal.image.name.split(".").pop();
  const filename = `${meal.slug}.${extention}`;

  const stream = fs.createWriteStream(`public/images/${filename}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Failed the Image to be saved.");
    }
  });

  meal.image = `/images/${filename}`;

  db.prepare(
    `INSERT INTO meals (slug, title, summary, instructions, image, creator, creator_email) VALUES (@slug, @title, @summary, @instructions, @image, @creator, @creator_email)`,
  ).run(meal);
}
