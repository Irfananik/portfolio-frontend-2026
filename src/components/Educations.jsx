import { useState, useEffect } from 'react';
import API from '../api/axios';
import Education from './Education';
import { GraduationCap, AlertCircle } from 'lucide-react';

export default function Educations() {
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEducations = async () => {
      try {
        setLoading(true);
        const { data } = await API.get('/education');
        setEducations(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        console.error('Error fetching education:', err);
        setError('Failed to load education details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEducations();
  }, []);

  return (
    <section id="education" className="py-12 border-t border-base-300">
      <div className="space-y-8">
        {/* Section Heading */}
        <div className="flex items-center gap-3">
          <GraduationCap className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-extrabold tracking-tight">Education & Certifications</h2>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="space-y-6">
            {[1, 2].map((n) => (
              <div key={n} className="bg-base-200 border border-base-300 rounded-2xl p-6 animate-pulse space-y-4">
                <div className="h-6 bg-base-300 w-1/3 rounded"></div>
                <div className="h-4 bg-base-300 w-1/4 rounded"></div>
                <div className="h-12 bg-base-300 w-full rounded"></div>
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
        {!loading && !error && educations.length === 0 && (
          <div className="text-center py-12 bg-base-200/50 rounded-xl border border-dashed border-base-300">
            <p className="text-base-content/60 font-medium">No education history entries added yet.</p>
          </div>
        )}

        {/* Education List Grid */}
        {!loading && !error && educations.length > 0 && (
          <div className="grid grid-cols-1 gap-6">
            {educations.map((edu) => (
              <Education key={edu._id || edu.id} education={edu} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}