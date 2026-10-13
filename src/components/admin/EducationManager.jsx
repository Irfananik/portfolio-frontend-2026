import { Trash2 } from 'lucide-react';

export default function EducationManager({ educations, onDelete }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold border-b border-base-200 pb-3">Education History</h3>
      {educations.length === 0 ? (
        <p className="text-sm text-base-content/60 py-8 text-center">No education history added yet.</p>
      ) : (
        <div className="space-y-3">
          {educations.map((edu) => (
            <div key={edu._id || edu.id} className="flex flex-col sm:flex-row justify-between sm:items-center p-4 bg-base-200 border border-base-300 rounded-xl gap-2">
              <div>
                <h4 className="font-bold text-base">{edu.degree}</h4>
                <p className="text-xs text-base-content/70">{edu.institution} ({edu.startDate} — {edu.endDate})</p>
              </div>
              <button onClick={() => onDelete('education', edu._id || edu.id)} className="btn btn-ghost btn-xs text-error self-end sm:self-center">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}