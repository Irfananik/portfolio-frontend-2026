import { GraduationCap, Calendar, Award, ExternalLink, BookOpen, Building } from 'lucide-react';

export default function Education({ education }) {
  const { institution, degree, fieldOfStudy, startDate, endDate, courses, type, certificateUrl } = education;

  // Helper function to color badge according to type
  const getTypeBadge = (type) => {
    switch (type) {
      case 'Certification':
        return 'badge-secondary';
      case 'Training':
        return 'badge-accent';
      default:
        return 'badge-primary';
    }
  };

  return (
    <div className="bg-base-200 border border-base-300 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-200 space-y-4">
      {/* Header: Degree, Institution, and Dates */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-base-300/60 pb-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-bold text-base-content hover:text-primary transition-colors">
              {degree}
            </h3>
            {type && (
              <span className={`badge badge-sm ${getTypeBadge(type)} font-medium`}>
                {type}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-base-content/70 mt-1">
            <span className="flex items-center gap-1.5 font-medium text-accent">
              <Building className="w-4 h-4" />
              {institution}
            </span>
            {fieldOfStudy && (
              <span className="text-xs text-base-content/60">
                • {fieldOfStudy}
              </span>
            )}
          </div>
        </div>

        {/* Date Badge */}
        <div className="flex items-center gap-1.5 text-xs font-mono bg-base-300/70 px-3 py-1.5 rounded-full w-fit">
          <Calendar className="w-3.5 h-3.5 text-primary" />
          <span>
            {startDate} — {endDate}
          </span>
        </div>
      </div>

      {/* Coursework / Key Courses */}
      {courses && courses.length > 0 && (
        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-base-content/70 uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-primary" />
            Key Coursework & Skills
          </div>
          <div className="flex flex-wrap gap-1.5">
            {courses.map((course, index) => (
              <span
                key={index}
                className="badge badge-sm badge-outline badge-primary font-mono text-[11px]"
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Optional Certificate Link */}
      {certificateUrl && (
        <div className="pt-2 flex justify-end border-t border-base-300/50">
          <a
            href={certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-xs sm:btn-sm btn-ghost gap-1 text-primary hover:bg-primary/10"
          >
            <Award className="w-4 h-4" />
            <span>View Certificate</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}
    </div>
  );
}