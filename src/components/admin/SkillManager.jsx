import { Trash2 } from 'lucide-react';

export default function SkillManager({ skills, onDelete }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold border-b border-base-200 pb-3">Technical Skills</h3>
      {skills.length === 0 ? (
        <p className="text-sm text-base-content/60 py-8 text-center">No skills added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {skills.map((skill) => (
            <div key={skill._id || skill.id} className="flex items-center justify-between p-3 bg-base-200 border border-base-300 rounded-xl">
              <div>
                <span className="font-semibold text-sm block">{skill.name}</span>
                <span className="text-xs text-base-content/60">{skill.category} • {skill.proficiency}</span>
              </div>
              <button onClick={() => onDelete('skills', skill._id || skill.id)} className="btn btn-ghost btn-xs text-error">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}