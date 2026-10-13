import { useState, useEffect } from 'react';
import API from '../api/axios';
import Skill from './Skill';
import { Cpu, AlertCircle } from 'lucide-react';

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const { data } = await API.get('/skills');
        // Supports array responses or wrapped JSON objects
        setSkills(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        console.error('Error fetching skills:', err);
        setError('Failed to load skills. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Group skills dynamically by category
  const groupedSkills = skills.reduce((acc, skill) => {
    const cat = skill.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="py-12 border-t border-base-300">
      <div className="space-y-8">
        {/* Section Heading */}
        <div className="flex items-center gap-3">
          <Cpu className="w-7 h-7 text-primary" />
          <h2 className="text-3xl font-extrabold tracking-tight">Technical Skills</h2>
        </div>

        {/* Loading State Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-base-200 border border-base-300 rounded-xl p-5 space-y-4 animate-pulse">
                <div className="h-6 bg-base-300 w-1/3 rounded"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="h-12 bg-base-300 rounded-lg"></div>
                  <div className="h-12 bg-base-300 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="alert alert-error bg-error/10 border-error/20 text-error">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Empty Data State */}
        {!loading && !error && skills.length === 0 && (
          <div className="text-center py-12 bg-base-200/50 rounded-xl border border-dashed border-base-300">
            <p className="text-base-content/60 font-medium">No skills added yet.</p>
          </div>
        )}

        {/* Grouped Skills Grid */}
        {!loading && !error && skills.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(groupedSkills).map(([category, items]) => (
              <div
                key={category}
                className="bg-base-200/60 border border-base-300 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-bold text-primary mb-4 pb-2 border-b border-base-300/80">
                  {category}
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {items.map((skill) => (
                    <Skill key={skill._id || skill.id} skill={skill} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}