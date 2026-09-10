const About = () => {
  return (
    <section className="w-full flex flex-col justify-center" id="about">
      <div className="c-space">
        <p className="head-text sm:text-3xl text-xl font-medium text-space_gradient text-center font-generalsans">ABOUT ME</p>
      
      <div className="my-10 grid xl:grid-cols-3 xl:grid-rows-2 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        <div className="col-span-3 xl:row-span-3">
          <div className="grid-container">
            <div>
              <p className="grid-headtext">I'm Hyderboni Sai Esha</p>
              <p className="grid-subtext">
                Aspiring Software Engineer with hands-on experience in Python, MERN stack development, and Cloud technologies. Skilled in building efficient, maintainable software systems and applying data-driven problem-solving to real-world challenges. Experienced with AWS, SQL, and front-end development, with a strong foundation in algorithms, data structures, and database management. Passionate about developing scalable, user-focused applications and continuously learning emerging technologies in cloud computing and machine learning.
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default About;
