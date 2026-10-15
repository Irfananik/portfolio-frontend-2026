import { GitBranch, ExternalLink, Code2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Project({ project }) {
  const { t } = useLanguage();
  const { title, description, techStack, githubUrl, liveUrl, imageUrl } = project;

  return (
    <div className="card bg-base-200 border border-base-300 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group">
      <div>
        {/* Project Image Header */}
        <figure className="relative h-48 w-full overflow-hidden bg-base-300">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-base-content/30">
              <Code2 className="w-12 h-12" />
            </div>
          )}
        </figure>

        {/* Card Body */}
        <div className="card-body p-5 space-y-3">
          <h3 className="card-title text-xl font-bold group-hover:text-primary transition-colors">
            {title}
          </h3>

          <p className="text-sm text-base-content/80 line-clamp-3 leading-relaxed">
            {description}
          </p>

          {/* Tech Stack Badges */}
          {techStack && techStack.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {techStack.map((tech, index) => (
                <span
                  key={index}
                  className="badge badge-sm badge-outline badge-primary font-mono text-[11px]"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Card Actions (Footer) */}
      <div className="card-actions p-5 pt-0 justify-end gap-2 border-t border-base-300/50 mt-4">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-ghost gap-1.5 text-xs"
            title={t.ui.viewSource}
          >
            <GitBranch className="w-4 h-4" />
            {t.ui.code}
          </a>
        )}

        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-primary gap-1.5 text-xs"
            title={t.ui.liveDemo}
          >
            <ExternalLink className="w-4 h-4" />
            {t.ui.liveDemo}
          </a>
        )}
      </div>
    </div>
  );
}