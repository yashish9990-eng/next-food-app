import Link from "next/link";
import classes from "./page.module.css";
import Image from "next/image";
import { getMeal } from "@/lib/meals";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const meal = await getMeal(params.mealSlug);

  if(!meal) {
    return notFound();
  }

  if (meal) {
    return {
      title: meal.title,
      description: meal.summary,
    };
  }
}

// export const metadata = {
//   title: "All Meals",
//   description: "Browse the delicious meals shared by our vibrant community.",
// };

export default async function MealsDetailsPage({ params }) {
  const meal = await getMeal(params.mealSlug);
  if(!meal) {
    return notFound();
  }
  meal.instructions = meal.instructions.replace(/\n/g, "<br />");

  // console.log('meal.........:', meal);

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            By <Link href={`mailto:${meal.creatorEmail}`}>{meal.creator}</Link>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        ></p>
      </main>
    </>
  );
}
