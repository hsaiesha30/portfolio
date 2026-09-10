import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Footer from './sections/Footer.jsx';
import Navbar from './sections/Navbar.jsx';
import Contact from './sections/Contact.jsx';
import Skills from './sections/Skills.jsx';
import Projects from './sections/Projects.jsx';
import Roadmap from './sections/Roadmap.jsx';
import SpaceBackground from './components/SpaceBackground.jsx';
import LogoField from './components/LogoField.jsx';
import ScrollFadeSection from './components/ScrollFadeSection.jsx';

const App = () => {
  return (
    <>
      {/* Space Background */}
      <SpaceBackground />
      {/* Floating Logos */}
      <LogoField />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <ScrollFadeSection className="max-w-7xl mx-auto">
          <Hero />
        </ScrollFadeSection>
        
        {/* About Section */}
        <ScrollFadeSection className="max-w-7xl mx-auto">
          <About />
        </ScrollFadeSection>
        
        {/* Skills Section */}
        <ScrollFadeSection className="max-w-7xl mx-auto pb-6 md:pb-10">
          <Skills />
        </ScrollFadeSection>
        
        {/* Projects Section */}
        <ScrollFadeSection className="max-w-7xl mx-auto mt-4 md:mt-8">
          <Projects />
        </ScrollFadeSection>
        
        {/* Work Experience/Roadmap Section */}
        <ScrollFadeSection className="max-w-7xl mx-auto">
          <Roadmap />
        </ScrollFadeSection>
        
        {/* Contact Section */}
        <ScrollFadeSection className="max-w-7xl mx-auto">
          <Contact />
        </ScrollFadeSection>
      </main>
      
      {/* Footer */}
      <Footer />
    </>
  );
};

export default App;
