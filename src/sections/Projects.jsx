import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Projects = () => {
  const { ref, inView } = useInView({ threshold: 0.2 });

  const projects = [
    {
      id: 1,
      title: 'Hotel Review Analysis for Business Prediction using Deep Learning',
      subtitle: 'Python · TensorFlow · NLP',
      category: 'Machine Learning',
      description: 'Developed a sentiment analysis model to classify hotel reviews and predict business performance.',
      features: [
        'Developed a sentiment analysis model using deep learning to classify hotel reviews and predict business performance.',
        'Used Python, TensorFlow and NLP libraries for text preprocessing and feature extraction.',
        'Achieved 90%+ classification accuracy through hyperparameter tuning and model optimization.',
        'Visualized insights to assist decision-making in marketing and customer engagement.',
      ],
      technologies: ['Python', 'TensorFlow', 'NLP', 'Deep Learning'],
      architecture: [
        'Text Preprocessing Pipeline',
        'Deep Learning Classification Model',
        'Hyperparameter Optimization',
        'Insight Visualization',
      ],
    },
    {
      id: 2,
      title: 'MoneyScale – Smart Finance Management App',
      subtitle: 'Flask · PostgreSQL · React.js · Chart.js',
      category: 'Full-Stack Application',
      description: 'Built a personal finance management system to track expenses, analyze spending patterns, and provide saving recommendations.',
      features: [
        'Built a personal finance management system to track expenses, analyze spending patterns, and provide saving recommendations.',
        'Implemented a Python backend (Flask) integrated with PostgreSQL for secure and scalable data storage.',
        'Designed an interactive React.js dashboard with data visualization using Chart.js to display category-wise expenditure insights.',
      ],
      technologies: ['Flask', 'PostgreSQL', 'React.js', 'Chart.js', 'Python'],
      architecture: [
        'Flask REST Backend',
        'PostgreSQL Database',
        'React Dashboard',
        'Chart-based Analytics',
      ],
    },
  ];

  return (
    <section className="w-full py-12" id="projects" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white mb-2 font-generalsans"
          >
            Featured <span className="text-gradient">Projects</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base text-gray-300 max-w-2xl mx-auto"
          >
            Real-world applications with measurable impact
          </motion.p>
        </div>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-black-200/50 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden shadow-2xl p-5 lg:p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div>
                  <div className="text-xs uppercase tracking-wide text-blue-300">{project.category}</div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1 font-generalsans leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-sm text-blue-300 font-medium">{project.subtitle}</p>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed text-sm">{project.description}</p>

              <div className="mt-5 grid lg:grid-cols-2 gap-5">
                <div>
                  <h4 className="text-base font-semibold text-white mb-2 font-generalsans">Key Achievements</h4>
                  <div className="space-y-1.5">
                    {project.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-2 p-1.5 bg-black-300/30 rounded-lg border border-white/10">
                        <div className="w-1 h-1 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                        <span className="text-gray-300 leading-relaxed text-xs">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-semibold text-white mb-2 font-generalsans">Tech Stack & Architecture</h4>
                  <div className="space-y-2">
                    <div>
                      <h5 className="text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">Technologies</h5>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white rounded-md border border-blue-500/30 text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wide">Architecture</h5>
                      <div className="space-y-0.5">
                        {project.architecture.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center space-x-2 text-xs text-gray-300">
                            <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;