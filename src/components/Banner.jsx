import { useState, useEffect } from 'react';
import API from '../api/axios';
import profileImage from '../assets/images/myPhoto.jpg';
import { Download, ChevronDown, FileText } from 'lucide-react';

export default function Banner() {
  const [cvLinks, setCvLinks] = useState({
    en: '/resume_en.pdf',
    ja: '/resume_ja.pdf',
  });

  useEffect(() => {
    const fetchCvLinks = async () => {
      try {
        const { data } = await API.get('/settings/cv');
        if (data) {
          setCvLinks({
            en: data.en || '/resume_en.pdf',
            ja: data.ja || '/resume_ja.pdf',
          });
        }
      } catch (err) {
        console.log('Using default local CV files');
      }
    };

    fetchCvLinks();
  }, []);

  return (
    <section className="hero py-12">
      <div className="hero-content flex-col lg:flex-row items-center gap-10 lg:gap-16">
        
        {/* Profile Photo */}
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-30 animate-pulse"></div>
            <img
              src={profileImage}
              alt="A R Golam Morshed Bhuiyan"
              className="relative w-48 h-48 sm:w-64 sm:h-64 object-cover rounded-2xl shadow-2xl border-2 border-base-300 hover:border-primary transition-colors"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80";
              }}
            />
          </div>
        </div>

        {/* Bio & Actions */}
        <div className="text-center lg:text-left space-y-4">
          <div className="badge badge-primary badge-outline font-medium text-xs sm:text-sm">
            MERN Stack Developer & KCGI Student
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Hi, I'm <span className="text-primary">Morshed Bhuiyan</span>
          </h1>
          <p className="text-base sm:text-lg text-base-content/80 max-w-xl">
            Master's student in Applied Information Technology at Kyoto College of Graduate Studies for Informatics (KCGI), specializing in full-stack web development and AI integration.
          </p>
          
          <div className="pt-2 flex flex-wrap gap-3 justify-center lg:justify-start">
            <a href="#projects" className="btn btn-primary btn-sm sm:btn-md">
              Explore Projects
            </a>
            <a href="#contact" className="btn btn-outline btn-sm sm:btn-md">
              Get in Touch
            </a>

            {/* Dynamic CV Dropdown */}
            <div className="dropdown dropdown-top sm:dropdown-bottom dropdown-end sm:dropdown-start">
              <div tabIndex={0} role="button" className="btn btn-accent btn-sm sm:btn-md gap-2">
                <Download className="w-4 h-4" />
                Download CV
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow-2xl bg-base-200 border border-base-300 rounded-box w-52 mt-1 space-y-1"
              >
                <li>
                  <a
                    href={cvLinks.en}
                    target="_blank"
                    rel="noopener noreferrer"
                    download="Morshed_Bhuiyan_CV_EN.pdf"
                    onClick={() => document.activeElement?.blur()}
                    className="flex items-center gap-2 py-2 text-sm font-medium hover:text-primary"
                  >
                    <FileText className="w-4 h-4 text-primary" />
                    <span>English CV (EN)</span>
                  </a>
                </li>
                <li>
                  <a
                    href={cvLinks.ja}
                    target="_blank"
                    rel="noopener noreferrer"
                    download="Morshed_Bhuiyan_CV_JA.pdf"
                    onClick={() => document.activeElement?.blur()}
                    className="flex items-center gap-2 py-2 text-sm font-medium hover:text-primary"
                  >
                    <FileText className="w-4 h-4 text-secondary" />
                    <span>Japanese CV (履歴書)</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}