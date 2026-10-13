import { ExternalLink, Trash2 } from 'lucide-react';

export default function ProjectManager({ projects, onDelete, onOpenModal }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b border-base-200 pb-3">
        <h3 className="text-lg font-bold">All Projects</h3>
      </div>
      {projects.length === 0 ? (
        <p className="text-sm text-base-content/60 py-8 text-center">No projects added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((proj) => (
            <div key={proj._id || proj.id} className="card bg-base-200 border border-base-300 p-4 justify-between space-y-3">
              <div>
                <h4 className="font-bold text-base">{proj.title}</h4>
                <p className="text-xs text-base-content/70 line-clamp-2 mt-1">{proj.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {proj.techStack?.map((t, i) => (
                    <span key={i} className="badge badge-xs badge-primary badge-outline">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-base-300/60">
                {proj.liveUrl && (
                  <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-xs text-primary flex items-center gap-1 hover:underline">
                    Live <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                <button onClick={() => onDelete('projects', proj._id || proj.id)} className="btn btn-ghost btn-xs text-error">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}