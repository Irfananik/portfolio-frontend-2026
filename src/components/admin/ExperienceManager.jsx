import { Trash2 } from 'lucide-react';

export default function ExperienceManager({ experiences, onDelete }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold border-b border-base-200 pb-3">Work Experience</h3>
      {experiences.length === 0 ? (
        <p className="text-sm text-base-content/60 py-8 text-center">No work experience added yet.</p>
      ) : (
        <div className="space-y-3">
          {experiences.map((exp) => (
            <div key={exp._id || exp.id} className="flex flex-col sm:flex-row justify-between sm:items-center p-4 bg-base-200 border border-base-300 rounded-xl gap-2">
              <div>
                <h4 className="font-bold text-base">{exp.role} <span className="text-xs text-primary font-normal">@ {exp.company}</span></h4>
                <p className="text-xs text-base-content/60">{exp.startDate} — {exp.isCurrent ? 'Present' : exp.endDate} ({exp.type})</p>
              </div>
              <button onClick={() => onDelete('experiences', exp._id || exp.id)} className="btn btn-ghost btn-xs text-error self-end sm:self-center">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}