import { PortableText, type SanityDocument } from "next-sanity";
import { client } from "../../sanity/client";
import Avatar from "@/app/components/avatar";
import Link from "next/link";

const EVENT_QUERY = `*[_type == "event" && slug.current == $slug][0]{title, datetime, locationTemp, description, organizer->{slug}}`;



const options = { next: { revalidate: 30 } };

type EventPageProps = {
  params: {
    slug: string;
  };
};

export default async function EventPage({ params }: EventPageProps) {
  const event = await client.fetch<SanityDocument>(EVENT_QUERY, { slug: params.slug }, options);

  console.log("Slug før fetch:", params.slug, typeof params.slug);

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/" className="hover:underline">
        ← Back to posts
      </Link>
      <h1 className="text-4xl font-bold mb-8">{event.title}</h1>
      <p>{new Date(event.datetime).toLocaleDateString()}</p>
      <p>{new Date(event.datetime).toLocaleTimeString()}</p>
      <p>{event.locationTemp}</p>
      <div className="prose">
        {Array.isArray(event.description) && <PortableText value={event.description} />}
      </div>
      <div>
        <Avatar slug={event.organizer.slug} />
      </div>
    </main>
  );
}