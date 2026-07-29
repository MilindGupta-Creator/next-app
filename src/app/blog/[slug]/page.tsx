import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPost } from '../posts';

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

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 p-8">
      <Link href="/blog" className="text-sm text-indigo-500 hover:underline">
        ← Back to blog
      </Link>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">{post.title}</h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-300">{post.body}</p>
      <p className="mt-8 text-xs text-zinc-400">
        URL param captured by <code>[slug]</code>: <code>{slug}</code>
      </p>
    </main>
  );
}
