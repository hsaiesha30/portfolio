import emailjs from '@emailjs/browser';
import { useRef, useState, useLayoutEffect } from 'react';
import useAlert from '../hooks/useAlert.js';
import Alert from '../components/Alert.jsx';
import { EMAILJS_CONFIG } from '../config/emailjs.js';
import { gsap } from '../utils/gsapSetup.js';
import LazyImage from '../components/LazyImage.jsx';

const Contact = () => {
  const formRef = useRef();
  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleDirectEmail = (subjectOverride = '', bodyOverride = '') => {
    const subject = encodeURIComponent(subjectOverride || 'Portfolio Contact - ' + form.name);
    const body = encodeURIComponent(bodyOverride || `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    window.location.href = `mailto:saieshahyderaboni@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const subject = 'Portfolio Contact - ' + form.name;
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`;

    const isEmailjsConfigured =
      EMAILJS_CONFIG.SERVICE_ID &&
      EMAILJS_CONFIG.SERVICE_ID !== 'YOUR_SERVICE_ID' &&
      EMAILJS_CONFIG.TEMPLATE_ID &&
      EMAILJS_CONFIG.TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' &&
      EMAILJS_CONFIG.PUBLIC_KEY &&
      EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY';

    if (!isEmailjsConfigured) {
      handleDirectEmail(subject, body);
      setLoading(false);
      showAlert({
        show: true,
        text: 'Your email app should open with your message ready to send. Thanks! 😊',
        type: 'success',
      });

      setTimeout(() => {
        hideAlert();
        setForm({ name: '', email: '', message: '' });
      }, 5000);
      return;
    }

    const templateParams = {
      from_name: form.name,
      from: form.email,
      to: 'saieshahyderaboni@gmail.com',
      subject,
      html: form.message,
      message: form.message,
    };

    emailjs
      .send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          showAlert({
            show: true,
            text: 'Thank you for your message! I\'ll get back to you soon 😃',
            type: 'success',
          });

          setTimeout(() => {
            hideAlert();
            setForm({ name: '', email: '', message: '' });
          }, 5000);
        },
        () => {
          handleDirectEmail(subject, body);
          setLoading(false);
          showAlert({
            show: true,
            text: 'Your email app opened with your message ready to send. Thanks! 😊',
            type: 'success',
          });

          setTimeout(() => {
            hideAlert();
            setForm({ name: '', email: '', message: '' });
          }, 5000);
        }
      );
  };

  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return undefined;
    const ctx = gsap.context(() => {
      gsap.from(rootRef.current.querySelector('[data-contact-title]'), {
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      });
      gsap.from(rootRef.current.querySelectorAll('[data-contact-stagger]'), {
        y: 16,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out',
        stagger: 0.08,
        delay: 0.1,
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="w-full flex flex-col justify-center" id="contact">
      {alert.show && <Alert {...alert} />}

      <div className="c-space relative flex items-center justify-center flex-col">
        <LazyImage
          src="/assets/terminal.png"
          alt="terminal background"
          className="absolute inset-0 min-h-screen"
        />

        {/* Moved contact-container down */}
        <div style={{ height: "100px" }}></div>
        <div className="contact-container">
          <h3 data-contact-title className="head-text">Let's talk</h3>
          <p data-contact-stagger className="text-lg text-white-600 mt-3">
          Feel free to reach out—I'm always excited to learn, grow, and contribute!
          </p>

          <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col space-y-7">
            <label className="space-y-3" data-contact-stagger>
              <span className="field-label">Full Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="ex., Hyderboni Sai Esha"
                aria-label="Full Name"
              />
            </label>

            <label className="space-y-3" data-contact-stagger>
              <span className="field-label">Email address</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="ex., yourname@gmail.com"
                aria-label="Email Address"
              />
            </label>

            <label className="space-y-3" data-contact-stagger>
              <span className="field-label">Your message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="field-input"
                placeholder="Share your thoughts or inquiries..."
                aria-label="Message"
              />
            </label>

            <div className="flex flex-col space-y-3" data-contact-stagger>
              <button className="field-btn" type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
                <svg className="w-2.5 h-2.5 object-contain invert brightness-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
              
              {/* Fallback direct email button */}
              <button 
                type="button" 
                onClick={handleDirectEmail}
                className="bg-black-400 hover:bg-black-300 px-5 py-2 min-h-12 rounded-lg shadow-black-200 shadow-2xl flex justify-center items-center text-lg text-white gap-3 transition-all duration-300"
              >
                Send via Email Client
                <svg className="w-2.5 h-2.5 object-contain invert brightness-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
