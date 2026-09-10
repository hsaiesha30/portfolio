# Sai Esha - Portfolio Website

A modern, responsive portfolio website showcasing professional experience, technical skills, and projects. Built with React, Vite, and modern web technologies.

## Features

✨ **Responsive Design** - Fully responsive across mobile, tablet, and desktop devices

🎨 **Modern UI/UX** - Clean, professional design with smooth animations and transitions

🚀 **Performance Optimized** - Fast loading with lazy image loading and code splitting

📧 **Contact Form** - Integrated email contact form with graceful fallback to email client

📱 **Social Links** - Easy access to professional social profiles (LinkedIn)

📄 **Resume Viewer** - Built-in PDF viewer to display and download resume

🎭 **Smooth Animations** - GSAP and Framer Motion for polished animations

🌌 **3D Background** - Interactive Three.js space background

## Technologies Used

### Frontend Framework
- **React 18** - UI component library
- **Vite 5.4.10** - Fast build tool and development server
- **Tailwind CSS** - Utility-first styling framework

### Animations & Effects
- **GSAP** - Advanced JavaScript animation library
- **Framer Motion** - React motion library
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js

### Utilities
- **EmailJS** - Email service integration
- **React Intersection Observer** - Viewport detection for animations
- **Vite-plugin-pdf** - PDF viewing capability

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Alert.jsx
│   ├── Button.jsx
│   ├── LazyImage.jsx
│   ├── LogoField.jsx
│   ├── PDFViewer.jsx
│   ├── ScrollFadeSection.jsx
│   ├── SocialMedia.jsx
│   └── SpaceBackground.jsx
├── sections/            # Page sections
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Skills.jsx
│   ├── Projects.jsx
│   ├── Roadmap.jsx (Work Experience)
│   ├── Contact.jsx
│   ├── Navbar.jsx
│   └── Footer.jsx
├── config/              # Configuration files
│   └── emailjs.js
├── constants/           # Constants and data
│   ├── index.js
│   └── logos.js
├── hooks/               # Custom React hooks
│   ├── useAlert.js
│   └── useIsInView.js
├── utils/               # Utility functions
│   └── gsapSetup.js
└── App.jsx              # Main app component

public/assets/
├── Namelogo.png         # Logo
├── final-ai-brush-removebg-4yhtxlg.png  # Profile image
├── Resume.pdf           # Resume document
├── Logos/               # Skill icons
├── social/              # Social media icons
└── terminal.png         # Background assets
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Portfolio-main-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure EmailJS (Optional)**
   - Update `src/config/emailjs.js` with your EmailJS credentials
   - If not configured, the form will gracefully fall back to email client

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

For network access from other machines:
```bash
npm run dev -- --host 0.0.0.0
```

## Build

Create a production build:

```bash
npm run build
```

The optimized build will be generated in the `dist/` folder.

## Customization

### Personal Information
- **Name & Title**: Update in `src/sections/Hero.jsx`
- **About Section**: Edit `src/sections/About.jsx`
- **Contact Email**: Update in `src/sections/Contact.jsx`

### Skills
- **Add/Edit Skills**: Modify `src/constants/logos.js`
- **Skill Icons**: Place SVG files in `public/assets/Logos/`

### Projects
- **Add/Edit Projects**: Update the `projects` array in `src/sections/Projects.jsx`

### Work Experience
- **Add/Edit Experience**: Modify `workExperiences` in `src/constants/index.js`

### Social Links
- **Update Links**: Edit `socialLinks` in `src/constants/index.js`
- **Add Icons**: Place SVG files in `public/assets/social/`

### Resume
- **Replace Resume**: Update file at `public/assets/Resume.pdf`

### Images
- **Profile Image**: Replace `public/assets/final-ai-brush-removebg-4yhtxlg.png`
- **Logo**: Replace `public/assets/Namelogo.png`

## Sections

### Hero
- Animated name entrance with character-by-character animation
- Profile image display
- Social media links
- Call-to-action button

### About
- Professional biography
- Key skills and expertise summary

### Skills
- Organized by categories (Languages, Frameworks, AI/ML, Databases, Cloud/DevOps)
- Animated skill icon entrance
- Hover effects for interactivity

### Projects
- Showcase of completed projects
- Project descriptions, features, and tech stack
- Clean card layout

### Work Experience (Roadmap)
- Timeline of professional experience
- Internships and coursework
- Company logos and durations

### Contact
- Email contact form
- Graceful fallback to email client if service unavailable
- Success notifications

## Performance Optimization

The portfolio includes several optimizations:
- Lazy loading for images
- Code splitting for efficient bundling
- CSS minification via Tailwind CSS
- GSAP for hardware-accelerated animations
- Intersection Observer for viewport-triggered animations

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with automatic CI/CD

### GitHub Pages
1. Update `vite.config.js` with your repository name as base
2. Run `npm run build`
3. Deploy the `dist/` folder

### Traditional Hosting
1. Run `npm run build`
2. Upload the `dist/` folder to your hosting provider

## Troubleshooting

### Build Issues
- Clear `node_modules` and `dist`: `rm -r node_modules dist`
- Reinstall: `npm install`
- Rebuild: `npm run build`

### Development Server Not Starting
- Check if port 5173 is available
- Try alternative port: `npm run dev -- --port 3000`

### Images Not Loading
- Verify image paths in components match files in `public/assets/`
- Check browser console for 404 errors

### EmailJS Not Working
- Verify EmailJS configuration in `src/config/emailjs.js`
- The form will automatically fall back to email client


## Contact

For inquiries, reach out via the contact form on the portfolio or email directly.

---

**Portfolio Updated**: July 2026
