import { CheckCircle2, Star } from 'lucide-react';

export default function Skill({ skill }) {
  const { name, category, proficiency, featured } = skill;

  // Helper badge color based on proficiency level
  const getProficiencyBadge = (level) => {
    switch (level?.toLowerCase()) {
      case 'advanced':
      case 'expert':
        return 'badge-primary';
      case 'intermediate':
        return 'badge-secondary';
      default:
        return 'badge-outline';
    }
  };

  return (
    <div className="flex items-center justify-between p-3.5 bg-base-200 border border-base-300 rounded-xl hover:border-primary/50 transition-all duration-200 group">
      <div className="flex items-center gap-3">
        <CheckCircle2 className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
        <div>
          <h4 className="font-semibold text-sm sm:text-base text-base-content group-hover:text-primary transition-colors">
            {name}
          </h4>
          {category && (
            <span className="text-xs text-base-content/60 block">
              {category}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {featured && (
          <Star className="w-4 h-4 text-warning fill-warning" title="Featured Skill" />
        )}
        {proficiency && (
          <span className={`badge badge-sm ${getProficiencyBadge(proficiency)} font-medium text-[11px]`}>
            {proficiency}
          </span>
        )}
      </div>
    </div>
  );
}