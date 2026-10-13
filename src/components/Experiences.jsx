import { useState, useEffect } from 'react';
import API from '../api/axios';
import Experience from './Experience';
import { Briefcase, AlertCircle } from 'lucide-react';

export default function Experiences() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const { data } = await API.get('/experiences');
        setExperiences(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        console.error('Error fetching experiences:', err);
        setError('Failed to load work experience. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  return (
    <section id="experience" className="py-12 border-t border-base-300">
      <div className="space-y-8">
        {/* Section Heading */}
        <div className="flex items-center gap-3">
          <Briefcase className="w-7 h-7 text-primary" />
          <h2 className="text-3xl font-extrabold tracking-tight">Work Experience</h2>
        </div>

        {/* Loading State Skeleton */}
        {loading && (
          <div className="space-y-6">
            {[1, 2].map((n) => (
              <div key={n} className="bg-base-200 border border-base-300 rounded-2xl p-6 animate-pulse space-y-4">
                <div className="h-6 bg-base-300 w-1/3 rounded"></div>
                <div className="h-4 bg-base-300 w-1/4 rounded"></div>
                <div className="h-16 bg-base-300 w-full rounded"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="alert alert-error bg-error/10 border-error/20 text-error">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Empty Data State */}
        {!loading && !error && experiences.length === 0 && (
          <div className="text-center py-12 bg-base-200/50 rounded-xl border border-dashed border-base-300">
            <p className="text-base-content/60 font-medium">No work experience entries added yet.</p>
          </div>
        )}

        {/* Timeline Container */}
        {!loading && !error && experiences.length > 0 && (
          <div className="relative border-l-2 border-base-300 ml-3 sm:ml-4 space-y-8">
            {experiences.map((exp) => (
              <Experience key={exp._id || exp.id} experience={exp} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}