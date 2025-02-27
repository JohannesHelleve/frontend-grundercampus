import { AvatarProps } from '../types';

export default function Avatar(avatar: AvatarProps) {
  return (
    <a href={avatar.url} className="flex gap-4 items-center text-blue-500 hover:underline">
        {avatar.image && <img src={avatar.image} alt={avatar.title} className="rounded-full w-16 h-16" />}
    </a>
    );
}
