import { Youtube } from "lucide-react";

interface RecipeYoutubeLinkProps {
  youtubeUrl: string | null;
}

export function RecipeYoutubeLink({ youtubeUrl }: RecipeYoutubeLinkProps) {
  if (!youtubeUrl) return null;

  return (
    <a
      href={youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-md hover:opacity-90 transition-colors"
    >
      <Youtube className="w-5 h-5" />
      <span>Watch on YouTube</span>
    </a>
  );
}
