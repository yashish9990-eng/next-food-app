'use client';

export default function Error({error, reset}) {
    return (
        <main className="error">
            <h1>An error occurred!</h1>
            <p>Failed to Create Meal.</p>
        </main>
    );
}