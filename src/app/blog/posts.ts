// Pretend this is your CMS / database / API. Kept local so the demo is self-contained.
export type Post = { slug: string; title: string; body: string };

const POSTS: Post[] = [
  { slug: 'hydration', title: 'How hydration actually works', body: 'React attaches listeners to server-rendered DOM without recreating it.' },
  { slug: 'rsc', title: 'Server Components in one paragraph', body: 'They render to an RSC payload and ship zero JS to the client.' },
  { slug: 'caching', title: "Next.js's four caches", body: 'Request Memoization, Data Cache, Full Route Cache, Router Cache.' },
];

// Simulate an async data source (like `await db.query(...)` or `await fetch(...)`).
export async function getAllPosts(): Promise<Post[]> {
  return POSTS;
}

export async function getPost(slug: string): Promise<Post | undefined> {
  return POSTS.find((p) => p.slug === slug);
}
