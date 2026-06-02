# NextLevel Food

NextLevel Food is a small Next.js 14 application for food lovers. It includes a homepage, a meals listing page, and a server-side SQLite data store.

## Project structure

- `app/page.js` - the landing page for the site
- `app/meals/page.js` - the meals route, fetches recipes from the database
- `components/main-header/nav-link.js` - client-side navigation link component with active link highlighting
- `lib/meals.js` - server-side data access for the SQLite database
- `meals.db` - local SQLite database file used by the app

## Key files

### Client-side file

`components/main-header/nav-link.js`

- Declares `use client`
- Renders navigation links with active state styling
- Uses `usePathname()` from `next/navigation`

### Server-side file

`lib/meals.js`

- Uses `better-sqlite3` to open `meals.db`
- Exports `getMeals()` as an async data loader
- Called from `app/meals/page.js` inside an async server component

### Database file

`meals.db`

- Stored at the project root
- Contains the meals data for the `/meals` route
- Accessed directly by `lib/meals.js`

## Running the app

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
>>>>>>>>> Temporary merge branch 2
