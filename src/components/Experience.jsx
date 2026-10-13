import { Calendar, MapPin, Building2, CheckCircle2 } from 'lucide-react';

export default function Experience({ experience }) {
  const { role, company, location, type, startDate, endDate, isCurrent, highlights, techStack } = experience;

  return (
    <div className="relative pl-8 sm:pl-10 group">
      {/* Timeline Bullet Dot */}
      <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-base-100 group-hover:scale-125 transition-transform duration-200 shadow-sm"></div>

      {/* Experience Card */}
      <div className="bg-base-200 border border-base-300 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-200 space-y-4">
        {/* Header: Role, Company, Type, & Dates */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-base-300/60 pb-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-bold text-base-content group-hover:text-primary transition-colors">
                {role}
              </h3>
              {type && (
                <span className="badge badge-sm badge-secondary font-medium">
                  {type}
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-base-content/70 mt-1">
              <span className="flex items-center gap-1.5 font-medium text-accent">
                <Building2 className="w-4 h-4" />
                {company}
              </span>
              {location && (
                <span className="flex items-center gap-1 text-xs">
                  <MapPin className="w-3.5 h-3.5" />
                  {location}
                </span>
              )}
            </div>
          </div>

          {/* Date Badge */}
          <div className="flex items-center gap-1.5 text-xs font-mono bg-base-300/70 px-3 py-1.5 rounded-full w-fit">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span>
              {startDate} — {isCurrent ? <span className="text-primary font-bold">Present</span> : (endDate || 'Present')}
            </span>
          </div>
        </div>

        {/* Highlights List */}
        {highlights && highlights.length > 0 && (
          <ul className="space-y-2 pt-1">
            {highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-base-content/80 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Tech Stack Badges */}
        {techStack && techStack.length > 0 && (
          <div className="pt-2 flex flex-wrap gap-1.5">
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
  );
}