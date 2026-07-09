import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import SectionDivider from '@/components/ui/SectionDivider';

function App() {
  return (
    <div className="bg-neu-base min-h-screen">
      <Navbar />
      <main className="pt-16">
        <section id="home">
          <Hero />
        </section>
        <SectionDivider />
        <section id="about">
          <About />
        </section>
        <SectionDivider />
        <section id="skills">
          <Skills />
        </section>
        <SectionDivider />
        <section id="projects">
          <Projects />
        </section>
        <SectionDivider />
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;