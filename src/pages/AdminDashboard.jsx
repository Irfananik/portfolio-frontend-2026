import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

import AdminHeader from '../components/admin/AdminHeader';
import AdminTabs from '../components/admin/AdminTabs';
import ProjectManager from '../components/admin/ProjectManager';
import SkillManager from '../components/admin/SkillManager';
import ExperienceManager from '../components/admin/ExperienceManager';
import EducationManager from '../components/admin/EducationManager';
import MessageManager from '../components/admin/MessageManager';
import CvManager from '../components/admin/CvManager';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');

  // Data States
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [messages, setMessages] = useState([]);

  // UI & Loading States
  const [loading, setLoading] = useState(true);
  const [actionError, setActionError] = useState(null);
  const [actionSuccess, setActionSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Form State Containers
  const [projectForm, setProjectForm] = useState({ title: '', description: '', techStack: '', githubUrl: '', liveUrl: '', image: '' });
  const [skillForm, setSkillForm] = useState({ name: '', category: 'Frontend', proficiency: 'Intermediate' });
  const [expForm, setExpForm] = useState({ role: '', company: '', location: '', type: 'Full-time', startDate: '', endDate: 'Present', isCurrent: false, highlights: '', techStack: '' });
  const [eduForm, setEduForm] = useState({ institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', courses: '', type: 'Degree', certificateUrl: '' });

  const fetchAllData = async () => {
    setLoading(true);
    setActionError(null);
    try {
      const [projRes, skillRes, expRes, eduRes, msgRes] = await Promise.allSettled([
        API.get('/projects'),
        API.get('/skills'),
        API.get('/experiences'),
        API.get('/education'),
        API.get('/contacts'),
      ]);

      if (projRes.status === 'fulfilled') setProjects(projRes.value.data.data || projRes.value.data || []);
      if (skillRes.status === 'fulfilled') setSkills(skillRes.value.data.data || skillRes.value.data || []);
      if (expRes.status === 'fulfilled') setExperiences(expRes.value.data.data || expRes.value.data || []);
      if (eduRes.status === 'fulfilled') setEducations(eduRes.value.data.data || eduRes.value.data || []);
      if (msgRes.status === 'fulfilled') setMessages(msgRes.value.data.data || msgRes.value.data || []);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setActionError('Error loading dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login', { replace: true });
  };

  const triggerSuccess = (msg) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const handleDelete = async (endpoint, id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await API.delete(`/${endpoint}/${id}`);
      triggerSuccess('Item deleted successfully.');
      fetchAllData();
    } catch (err) {
      setActionError(err.response?.data?.message || 'Failed to delete item.');
    }
  };

  // Add Item Submit Handlers
  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      await API.post('/projects', {
        ...projectForm,
        techStack: projectForm.techStack.split(',').map((s) => s.trim()).filter(Boolean),
      });
      setShowModal(false);
      triggerSuccess('Project added successfully!');
      setProjectForm({ title: '', description: '', techStack: '', githubUrl: '', liveUrl: '', image: '' });
      fetchAllData();
    } catch (err) {
      setActionError(err.response?.data?.message || 'Failed to add project.');
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    try {
      await API.post('/skills', skillForm);
      setShowModal(false);
      triggerSuccess('Skill added successfully!');
      setSkillForm({ name: '', category: 'Frontend', proficiency: 'Intermediate' });
      fetchAllData();
    } catch (err) {
      setActionError(err.response?.data?.message || 'Failed to add skill.');
    }
  };

  const handleAddExperience = async (e) => {
    e.preventDefault();
    try {
      await API.post('/experiences', {
        ...expForm,
        highlights: expForm.highlights.split('\n').filter(Boolean),
        techStack: expForm.techStack.split(',').map((s) => s.trim()).filter(Boolean),
      });
      setShowModal(false);
      triggerSuccess('Experience added successfully!');
      setExpForm({ role: '', company: '', location: '', type: 'Full-time', startDate: '', endDate: 'Present', isCurrent: false, highlights: '', techStack: '' });
      fetchAllData();
    } catch (err) {
      setActionError(err.response?.data?.message || 'Failed to add experience.');
    }
  };

  const handleAddEducation = async (e) => {
    e.preventDefault();
    try {
      await API.post('/education', {
        ...eduForm,
        courses: eduForm.courses.split(',').map((s) => s.trim()).filter(Boolean),
      });
      setShowModal(false);
      triggerSuccess('Education record added successfully!');
      setEduForm({ institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', courses: '', type: 'Degree', certificateUrl: '' });
      fetchAllData();
    } catch (err) {
      setActionError(err.response?.data?.message || 'Failed to add education.');
    }
  };

  return (
    <div className="min-h-screen bg-base-300 text-base-content flex flex-col">
      <AdminHeader onLogout={handleLogout} />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {actionSuccess && (
          <div className="alert alert-success bg-success/10 border-success/20 text-success text-sm">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {actionError && (
          <div className="alert alert-error bg-error/10 border-error/20 text-error text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{actionError}</span>
          </div>
        )}

        <AdminTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          counts={{
            projects: projects.length,
            skills: skills.length,
            experience: experiences.length,
            education: educations.length,
            messages: messages.length,
          }}
          onOpenModal={() => setShowModal(true)}
        />

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="text-sm text-base-content/60">Loading entries...</span>
          </div>
        ) : (
          <div className="bg-base-100 border border-base-200 rounded-2xl p-6">
            {activeTab === 'projects' && <ProjectManager projects={projects} onDelete={handleDelete} />}
            {activeTab === 'skills' && <SkillManager skills={skills} onDelete={handleDelete} />}
            {activeTab === 'experience' && <ExperienceManager experiences={experiences} onDelete={handleDelete} />}
            {activeTab === 'education' && <EducationManager educations={educations} onDelete={handleDelete} />}
            {activeTab === 'messages' && <MessageManager messages={messages} onDelete={handleDelete} />}
            {activeTab === 'cv' && <CvManager />}
          </div>
        )}
      </main>

      {/* MODAL FOR ADDING ITEMS */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box bg-base-100 max-w-lg border border-base-200">
            <h3 className="font-bold text-lg mb-4 capitalize">Add New {activeTab.slice(0, -1)}</h3>

            {activeTab === 'projects' && (
              <form onSubmit={handleAddProject} className="space-y-3">
                <input type="text" required placeholder="Title" value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} className="input input-bordered w-full text-sm" />
                <textarea required placeholder="Description" value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} className="textarea textarea-bordered w-full text-sm" />
                <input type="text" placeholder="Tech Stack (comma separated)" value={projectForm.techStack} onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })} className="input input-bordered w-full text-sm" />
                <input type="url" placeholder="GitHub URL" value={projectForm.githubUrl} onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })} className="input input-bordered w-full text-sm" />
                <input type="url" placeholder="Live Demo URL" value={projectForm.liveUrl} onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })} className="input input-bordered w-full text-sm" />
                <input type="url" placeholder="Image URL" value={projectForm.image} onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })} className="input input-bordered w-full text-sm" />
                <div className="modal-action">
                  <button type="button" onClick={() => setShowModal(false)} className="btn btn-ghost btn-sm">Cancel</button>
                  <button type="submit" className="btn btn-primary btn-sm">Save Project</button>
                </div>
              </form>
            )}

            {activeTab === 'skills' && (
              <form onSubmit={handleAddSkill} className="space-y-3">
                <input type="text" required placeholder="Skill Name" value={skillForm.name} onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })} className="input input-bordered w-full text-sm" />
                <select value={skillForm.category} onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })} className="select select-bordered w-full text-sm">
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="Tools & AI">Tools & AI</option>
                </select>
                <select value={skillForm.proficiency} onChange={(e) => setSkillForm({ ...skillForm, proficiency: e.target.value })} className="select select-bordered w-full text-sm">
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
                <div className="modal-action">
                  <button type="button" onClick={() => setShowModal(false)} className="btn btn-ghost btn-sm">Cancel</button>
                  <button type="submit" className="btn btn-primary btn-sm">Save Skill</button>
                </div>
              </form>
            )}

            {activeTab === 'experience' && (
              <form onSubmit={handleAddExperience} className="space-y-3">
                <input type="text" required placeholder="Role" value={expForm.role} onChange={(e) => setExpForm({ ...expForm, role: e.target.value })} className="input input-bordered w-full text-sm" />
                <input type="text" required placeholder="Company" value={expForm.company} onChange={(e) => setExpForm({ ...expForm, company: e.target.value })} className="input input-bordered w-full text-sm" />
                <input type="text" placeholder="Location" value={expForm.location} onChange={(e) => setExpForm({ ...expForm, location: e.target.value })} className="input input-bordered w-full text-sm" />
                <select value={expForm.type} onChange={(e) => setExpForm({ ...expForm, type: e.target.value })} className="select select-bordered w-full text-sm">
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </select>
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" required placeholder="Start Date" value={expForm.startDate} onChange={(e) => setExpForm({ ...expForm, startDate: e.target.value })} className="input input-bordered text-sm" />
                  <input type="text" placeholder="End Date" value={expForm.endDate} onChange={(e) => setExpForm({ ...expForm, endDate: e.target.value })} className="input input-bordered text-sm" />
                </div>
                <textarea placeholder="Highlights (one bullet per line)" value={expForm.highlights} onChange={(e) => setExpForm({ ...expForm, highlights: e.target.value })} className="textarea textarea-bordered w-full text-sm" />
                <input type="text" placeholder="Tech Stack (comma separated)" value={expForm.techStack} onChange={(e) => setExpForm({ ...expForm, techStack: e.target.value })} className="input input-bordered w-full text-sm" />
                <div className="modal-action">
                  <button type="button" onClick={() => setShowModal(false)} className="btn btn-ghost btn-sm">Cancel</button>
                  <button type="submit" className="btn btn-primary btn-sm">Save Experience</button>
                </div>
              </form>
            )}

            {activeTab === 'education' && (
              <form onSubmit={handleAddEducation} className="space-y-3">
                <input type="text" required placeholder="Institution" value={eduForm.institution} onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })} className="input input-bordered w-full text-sm" />
                <input type="text" required placeholder="Degree" value={eduForm.degree} onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })} className="input input-bordered w-full text-sm" />
                <input type="text" placeholder="Field of Study" value={eduForm.fieldOfStudy} onChange={(e) => setEduForm({ ...eduForm, fieldOfStudy: e.target.value })} className="input input-bordered w-full text-sm" />
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" required placeholder="Start Date" value={eduForm.startDate} onChange={(e) => setEduForm({ ...eduForm, startDate: e.target.value })} className="input input-bordered text-sm" />
                  <input type="text" required placeholder="End Date" value={eduForm.endDate} onChange={(e) => setEduForm({ ...eduForm, endDate: e.target.value })} className="input input-bordered text-sm" />
                </div>
                <input type="text" placeholder="Key Courses (comma separated)" value={eduForm.courses} onChange={(e) => setEduForm({ ...eduForm, courses: e.target.value })} className="input input-bordered w-full text-sm" />
                <select value={eduForm.type} onChange={(e) => setEduForm({ ...eduForm, type: e.target.value })} className="select select-bordered w-full text-sm">
                  <option value="Degree">Degree</option>
                  <option value="Certification">Certification</option>
                  <option value="Training">Training</option>
                </select>
                <div className="modal-action">
                  <button type="button" onClick={() => setShowModal(false)} className="btn btn-ghost btn-sm">Cancel</button>
                  <button type="submit" className="btn btn-primary btn-sm">Save Education</button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}
    </div>
  );
}