import { client } from "../sanity/client";
import Avatar from "./avatar";
import { type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const options = { next: { revalidate: 30 } };

const AVATARS_QUERY = `*[_type == "avatar"]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function AvatarBar() {


    const avatars = await client.fetch<SanityDocument[]>(AVATARS_QUERY, {}, options);

  return (
    <div className="flex gap-4">
      {avatars.map((avatar) => {
        const avatarImageUrl = avatar.image
          ? urlFor(avatar.image)?.width(100).height(100).url()
          : null;

        return (
          <Avatar 
            key={avatar._id} 
            title={avatar.title} 
            image={avatarImageUrl || ''} 
            url={avatar.url || ''}
          />
        );
      })}
    </div>
  );
}