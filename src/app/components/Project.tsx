interface ProjectPortfolio {
  title: string;
  description: string;
  imageUrl: string;
  demoUrl?: string;
  codeUrl?: string;
}
export default function Project({ title, description, imageUrl, demoUrl, codeUrl }: ProjectPortfolio) {
  return (
    <div className="w-full rounded-lg overflow-hidden shadow-lg bg-white">
      <img
        className="w-full h-48 object-cover"
        src={imageUrl}
        alt={`${title} screenshot`}
      />
      <div className="px-6 py-4">
        <h3 className="font-semibold text-xl mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex space-x-4">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              Live Demo
            </a>
          )}
          {codeUrl && (
            <a
              href={codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              Source Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

