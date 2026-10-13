import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Experiences from '../components/Experiences';
import Educations from '../components/Educations';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-base-100 text-base-content">
      <Navbar />
      
      {/* Main Landing Sections */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 space-y-20">
        
        {/* Modular Banner Component */}
        <Banner />

        {/* dinamic component */}
        <Projects />

        {/* dinamic component */}
        <Skills />

        {/* dinamic component */}
        <Experiences />

        {/* dinamic component */}
        <Educations />

        <section id="contact" className="min-h-[200px] border-t border-base-300 pt-8">
          <h2 className="text-2xl font-bold">Contact</h2>
        </section>
      </main>

      <Footer />
    </div>
  );
}