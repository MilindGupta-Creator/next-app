import Link from 'next/link';
import { getAllPosts } from './posts';

// A Server Component that `await`s data directly — no useEffect, no loading state,
// no client fetch. This runs on the server; the browser only receives the HTML/RSC.
export default async function BlogIndex() {
  const posts = await getAllPosts();

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 p-8">
      <h1 className="mb-6 text-3xl font-semibold tracking-tight">Blog</h1>
      <ul className="flex flex-col gap-3">
        {posts.map((post) => (
          <li key={post.slug}>
            {/* One file — [slug]/page.tsx — serves every one of these URLs. */}
            <Link
              href={`/blog/${post.slug}`}
              className="block rounded-lg border border-zinc-200 p-4 hover:border-indigo-500 dark:border-zinc-800"
            >
              <span className="font-medium">{post.title}</span>
              <span className="block text-sm text-zinc-500">/blog/{post.slug}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
