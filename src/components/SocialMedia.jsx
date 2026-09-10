import { socialLinks } from '../constants/index.js';
import LazyImage from './LazyImage.jsx';

const SocialMedia = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`} style={{ position: 'relative', zIndex: 30 }}>
      {socialLinks.map((social) => (
        <a
          key={social.id}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300 transition-colors duration-200 group cursor-pointer"
          aria-label={social.name}
          style={{ 
            position: 'relative', 
            zIndex: 31,
            pointerEvents: 'auto'
          }}
        >
          <div 
            className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200 group-hover:scale-110"
            style={{ pointerEvents: 'auto' }}
          >
            <LazyImage 
              src={social.icon} 
              alt={social.name} 
              className="w-6 h-6"
              loading="eager"
              style={{ pointerEvents: 'none' }}
            />
          </div>
        </a>
      ))}
    </div>
  );
};

export default SocialMedia; 