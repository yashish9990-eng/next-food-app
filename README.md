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

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build and production

```bash
npm run build
npm run start
```

## Notes

- The `/meals` page fetches data from the local SQLite database using server-side code.
- The navigation link component is client-side because it relies on browser routing state.
- Make sure `meals.db` stays in the project root so `lib/meals.js` can open it.
