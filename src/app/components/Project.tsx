import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
interface ProjectPortfolio {
  title: string;
  description: string;
  imageUrl: string;
  demoUrl?: string;
  codeUrl?: string;
  techStack: string[];
  status: string;
  type: string;
}
export default function Project({
  title,
  description,
  imageUrl,
  demoUrl,
  codeUrl,
  techStack,
  status,
  type,
}: ProjectPortfolio) {

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col transition hover:shadow-lg">
      <img src={imageUrl} alt={title} className="h-48 w-full object-cover" />

      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <p className="text-gray-600 text-sm mt-2">{description}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            {techStack.map((tech, i) => (
              <span
                key={i}
                className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center text-sm">
          <span className="text-gray-600">Status: <strong>{status}</strong></span>
          <span className="text-gray-600">Type: <strong>{type}</strong></span>
        </div>

        <div className="flex gap-4 mt-4">
          <a
            href={codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-indigo-600 hover:underline text-sm"
          >
            <FaGithub className="inline-block" />
            Source
          </a>
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
            >
              <FaExternalLinkAlt className="inline-block" />
              Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

