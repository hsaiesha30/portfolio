import { useState } from 'react';

import { navLinks } from '../constants/index.js';
import PDFViewer from '../components/PDFViewer.jsx';
import { RESUME_URL } from '../config/resume.js';
import LazyImage from '../components/LazyImage.jsx';

// Smooth scrolling function
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

const NavItems = ({ onClick = () => {} }) => (
  <ul className="nav-ul">
    {navLinks.map((item) => (
      <li key={item.id} className="nav-li">
        <a 
          href={item.href} 
          className="nav-li_a" 
          onClick={(e) => {
            e.preventDefault();
            const sectionId = item.href.substring(1); // Remove the # from href
            scrollToSection(sectionId);
            onClick();
          }}
        >
          {item.name}
        </a>
      </li>
    ))}
  </ul>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPDFOpen, setIsPDFOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const openPDF = () => setIsPDFOpen(true);
  const closePDF = () => setIsPDFOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-5 mx-auto c-space">
          <a href="/">
            <LazyImage src="/assets/Namelogo.png" alt="logo image" className="w-24 h-auto" loading="eager" />
          </a>

          <button
            onClick={toggleMenu}
            className="text-neutral-400 hover:text-white focus:outline-none sm:hidden flex"
            aria-label="Toggle menu">
            <LazyImage src={isOpen ? 'assets/close.svg' : 'assets/menu.svg'} alt="toggle" className="w-6 h-6" loading="eager" />
          </button>

          <nav className="sm:flex hidden">
            <NavItems />

          </nav>
          <button
              onClick={openPDF}
              className="text-black bg-white ml-4 shadow-lg p-3 rounded transition-transform duration-200 hover:scale-105 hidden sm:block">
              Resume
            </button>
        </div>
      </div>

      <div className={`nav-sidebar ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <nav className="p-5">
          <NavItems onClick={closeMenu} />
          <div className="mt-4 pt-4 border-t border-gray-600">
            <button
              onClick={() => {
                openPDF();
                closeMenu();
              }}
              className="w-full text-white bg-white/10 p-3 rounded hover:bg-white/20 transition-colors duration-200">
              Resume
            </button>
          </div>
        </nav>
      </div>
      
      {/* PDF Viewer Modal */}
      <PDFViewer 
        pdfUrl={RESUME_URL} 
        onClose={closePDF} 
      />
    </header>
  );
};

export default Navbar;
