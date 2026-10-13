import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-base-100 text-base-content">
      <Navbar />

      {/* Main Landing Sections */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 space-y-16">
        {/* Temporary Hero Section */}
        <section className="text-center py-12">
          <h1 className="text-4xl font-extrabold sm:text-5xl">
            Hi, I'm <span className="text-primary">Morshed Bhuiyan</span>
          </h1>
          <p className="mt-4 text-lg text-base-content/70 max-w-2xl mx-auto">
            Full-Stack Developer & Master's Student at KCGI, Kyoto. Building scalable MERN stack web applications and AI-driven solutions.
          </p>
        </section>

        {/* Section Anchors */}
        <section id="projects" className="min-h-[200px] border-t border-base-300 pt-8">
          <h2 className="text-2xl font-bold">Projects</h2>
        </section>

        <section id="skills" className="min-h-[200px] border-t border-base-300 pt-8">
          <h2 className="text-2xl font-bold">Skills</h2>
        </section>

        <section id="experience" className="min-h-[200px] border-t border-base-300 pt-8">
          <h2 className="text-2xl font-bold">Experience</h2>
        </section>

        <section id="education" className="min-h-[200px] border-t border-base-300 pt-8">
          <h2 className="text-2xl font-bold">Education</h2>
        </section>

        <section id="contact" className="min-h-[200px] border-t border-base-300 pt-8">
          <h2 className="text-2xl font-bold">Contact</h2>
        </section>
      </main>

      <Footer />
    </div>
  );
}