import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPost } from '../posts';

// 🧁 ISR: re-bake this page at most once every 10 seconds (on demand, when someone visits).
// NOTE: dev mode ignores this (dev is always fresh) — you only see ISR in a production build.
export const revalidate = 10;

// generateStaticParams tells Next WHICH slugs to prerender to static HTML at build time.
// (This replaces the old Pages Router `getStaticPaths`.) Return one object per page.
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug })); // [{slug:'hydration'}, {slug:'rsc'}, ...]
}

// ⚠️ BREAKING CHANGE (Next 15+/16): `params` is a Promise now. You MUST await it.
// In v14 and earlier this was a plain object. Top interview gotcha.
export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  // Unknown slug → render the nearest not-found UI and send a real 404 status.
  if (!post) notFound();

  // Captured the moment this page is BAKED. On a static/ISR page it freezes to bake-time
  // and only changes when the page re-bakes — so it's a visible clock for revalidation.
  const bakedAt = new Date().toLocaleTimeString();

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 p-8">
      <Link href="/blog" className="text-sm text-indigo-500 hover:underline">
        ← Back to blog
      </Link>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">{post.title}</h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-300">{post.body}</p>
      <p className="mt-8 rounded-lg bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        🧁 This page was baked at: <strong className="tabular-nums">{bakedAt}</strong>
        <br />
        <span className="text-zinc-500">
          Refresh fast → frozen. Wait 10s+ → it re-bakes and this jumps.
        </span>
      </p>
      <p className="mt-4 text-xs text-zinc-400">
        URL param captured by <code>[slug]</code>: <code>{slug}</code>
      </p>
    </main>
  );
}
