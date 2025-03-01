
import { AvatarProps } from '../types';
import { client } from '../sanity/client';

const AVATAR_QUERY = `*[_type == "avatar" && slug.current == $slug][0]`;
const options = { next: { revalidate: 30 } };

export default async function Avatar(slug: string) {
    const avatar = await client.fetch<AvatarProps>(AVATAR_QUERY, { slug }, options);

  return (
    <a href={avatar.url} className="flex gap-4 items-center text-blue-500 hover:underline">
        {avatar.image && <img src={avatar.image} alt={avatar.title} className="rounded-full w-16 h-16" />}
    </a>
    );
}
