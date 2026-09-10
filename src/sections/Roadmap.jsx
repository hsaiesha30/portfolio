import {  useState } from 'react';
import { workExperiences } from '../constants/index.js';
import LazyImage from '../components/LazyImage.jsx';

const WorkExperience = () => {
  const [animationName, setAnimationName] = useState('idle');

  return (
    <section className="w-full flex flex-col justify-center" id="work">
      <div className="c-space">
        <div className="w-full text-white-600">
        <p className="head-text sm:text-3xl text-xl font-medium text-space_gradient text-center font-generalsans">WORK</p>

        <div className="work-container">
          <div className="work-content">
            <div className="sm:py-10 py-5 sm:px-5 px-2.5">
              {workExperiences.map((item, index) => (
                <div key={index} className="work-content_container group">
                  <div className="flex flex-col h-full justify-start items-center py-2">
                    <div className="work-content_logo">
                      <LazyImage className="w-full h-full" src={item.icon} alt={item.name} />
                    </div>

                    <div className="work-content_bar" />
                  </div>

                  <div className="sm:p-5 px-2.5 py-5">
                    <p className="font-bold text-white-800">{item.name}</p>
                    <p className="text-sm mb-5">
                      {item.pos} -- <span>{item.duration}</span>
                    </p>
                    <p className="group-hover:text-white transition-all ease-in-out duration-500">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
