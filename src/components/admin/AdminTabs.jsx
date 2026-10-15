import { FolderGit2, Cpu, Briefcase, GraduationCap, Mail, FileText, Plus } from 'lucide-react';

export default function AdminTabs({ activeTab, setActiveTab, counts, onOpenModal }) {
  const tabs = [
    { id: 'projects', label: 'Projects', icon: FolderGit2, count: counts.projects },
    { id: 'skills', label: 'Skills', icon: Cpu, count: counts.skills },
    { id: 'experience', label: 'Experience', icon: Briefcase, count: counts.experience },
    { id: 'education', label: 'Education', icon: GraduationCap, count: counts.education },
    { id: 'messages', label: 'Messages', icon: Mail, count: counts.messages },
    { id: 'cv', label: 'CV Manager', icon: FileText },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-base-100 p-4 rounded-2xl border border-base-200">
      <div className="tabs tabs-boxed bg-base-200 p-1 flex-wrap gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab gap-2 text-xs sm:text-sm font-medium transition-all ${
                activeTab === tab.id ? 'tab-active bg-primary text-primary-content' : ''
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className="badge badge-sm badge-outline opacity-80">{tab.count}</span>
              )}
            </button>
          );
        })}
      </div>

      {activeTab !== 'messages' && activeTab !== 'cv' && (
        <button onClick={onOpenModal} className="btn btn-primary btn-sm gap-2 shrink-0">
          <Plus className="w-4 h-4" />
          Add {activeTab.slice(0, -1)}
        </button>
      )}
    </div>
  );
}