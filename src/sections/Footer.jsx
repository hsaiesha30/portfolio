import SocialMedia from '../components/SocialMedia.jsx';
import LazyImage from '../components/LazyImage.jsx';

const Footer = () => {
  return (
    <footer className="c-space pt-7 pb-3 border-t border-black-300">
      <div className="flex flex-col items-center gap-6">
        <div className="flex justify-center items-center flex-wrap gap-5">
          <a href="/">
            <LazyImage src="/assets/Namelogo.png" alt="logo image" className="w-24 h-auto" />
          </a>
        </div>
        
        {/* Social Media Links */}
        <SocialMedia />
      </div>
    </footer>
  );
};

export default Footer;
