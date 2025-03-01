import Link from "next/link";
import { type SanityDocument } from "next-sanity";


import { client } from "./sanity/client";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

const EVENT_QUERY = `*[_type == "event" && defined(slug.current)]`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
  const events = await client.fetch<SanityDocument[]>(EVENT_QUERY, {}, options);
  console.log(posts);
  console.log(events);

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">Posts</h1>
      <ul className="flex flex-col gap-y-4">
        {posts.map((post) => (
          <li className="hover:underline" key={post._id}>
            <Link href={`/posts/${post.slug.current}`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
            </Link>
          </li>
        ))}
        {events.map((event) => (
          <li className="hover:underline" key={event._id}>
            <Link href={`/events/${event.slug.current}`}>
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p>{new Date(event.datetime).toLocaleDateString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}