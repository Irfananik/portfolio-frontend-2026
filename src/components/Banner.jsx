import profileImage from '../assets/images/myPhoto.jpg'; // Ensure your photo is placed at src/assets/profile.jpg

export default function Banner() {
  return (
    <section className="hero py-12">
      <div className="hero-content flex-col lg:flex-row items-center gap-10 lg:gap-16">
        
        {/* Left Side: Profile Image */}
        <div className="flex-shrink-0">
          <div className="relative">
            {/* Background glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-30 animate-pulse"></div>
            
            <img
              src={profileImage}
              alt="A R Golam Morshed Bhuiyan"
              className="relative w-48 h-48 sm:w-64 sm:h-64 object-cover rounded-2xl shadow-2xl border-2 border-base-300 hover:border-primary transition-colors"
              onError={(e) => {
                // Fallback image if local image file is missing
                e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80";
              }}
            />
          </div>
        </div>

        {/* Right Side: Introduction & Bio */}
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
          
          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap gap-3 justify-center lg:justify-start">
            <a href="#projects" className="btn btn-primary btn-sm sm:btn-md">
              Explore Projects
            </a>
            <a href="#contact" className="btn btn-outline btn-sm sm:btn-md">
              Get in Touch
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}