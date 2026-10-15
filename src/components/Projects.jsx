import { useState, useEffect } from 'react';
import API from '../api/axios';
import Project from './Project';
import { FolderGit2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Projects() {
  const { t } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const { data } = await API.get('/projects');
        // Supports both array responses and object wrappers { success: true, data: [...] }
        setProjects(Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : []);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-12 border-t border-base-300">
      <div className="space-y-8">
        {/* Section Heading */}
        <div className="flex items-center gap-3">
          <FolderGit2 className="w-7 h-7 text-primary" />
          <h2 className="text-3xl font-extrabold tracking-tight">{t.sections.projectsTitle}</h2>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="card bg-base-200 h-80 animate-pulse border border-base-300 p-5">
                <div className="bg-base-300 h-40 rounded-lg mb-4"></div>
                <div className="bg-base-300 h-6 w-3/4 rounded mb-2"></div>
                <div className="bg-base-300 h-4 w-full rounded mb-1"></div>
                <div className="bg-base-300 h-4 w-2/3 rounded"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="alert alert-error bg-error/10 border-error/20 text-error">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{t.ui.projectsError}</span>
          </div>
        )}

        {/* Empty Data State */}
        {!loading && !error && projects.length === 0 && (
          <div className="text-center py-12 bg-base-200/50 rounded-xl border border-dashed border-base-300">
            <p className="text-base-content/60 font-medium">{t.ui.noProjects}</p>
          </div>
        )}

        {/* Grid of Projects */}
        {!loading && !error && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Project key={project._id || project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}