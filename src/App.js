import './App.css';
import NavBar from './components/nav';
import GridDistortion from './components/DistortedGrid';
import Typewriter from './components/Typewriter';
import FadeIn from './components/FadeIn';
import { useState } from 'react';

function App() {
  const [selectedExperience, setSelectedExperience] = useState(0);

  const experiences = [
    {
      id: 0,
      title: "Software Engineer",
      company: "Probase Limited",
      period: "2025 - Present",
      location: "Zambia",
      description: "Working on modern web applications and digital solutions for the Smartpay team, focusing on payment processing and financial technology solutions.",
      responsibilities: [
        "Develop and maintain web applications using Elixir/Phoenix and modern web technologies",
        "Collaborate with cross-functional teams to deliver high-quality software solutions",
        "Implement responsive design principles and ensure cross-browser compatibility",
        "Participate in code reviews and contribute to team best practices",
        "Work with databases and APIs to create seamless user experiences",
        "Build and maintain payment processing systems and financial applications"
      ],
      technologies: ["Elixir","Phoenix", "JavaScript", "PostgreSQL","MSSQL", "REST APIs", "Git", "Docker"]
    },
    // {
    //   id: 1,
    //   title: "Frontend Developer",
    //   company: "Tech Solutions Inc",
    //   period: "2022 - 2023",
    //   location: "Remote",
    //   description: "Focused on creating beautiful and functional user interfaces for various client projects.",
    //   responsibilities: [
    //     "Built responsive user interfaces using React and modern CSS frameworks",
    //     "Optimized application performance and user experience",
    //     "Worked with design teams to implement pixel-perfect designs",
    //     "Integrated third-party APIs and services",
    //     "Mentored junior developers and conducted code reviews",
    //     "Implemented state management solutions and component libraries"
    //   ],
    //   technologies: ["React", "JavaScript", "CSS3", "SASS", "Git", "REST APIs", "Redux", "Material-UI", "Responsive Design"]
    // },
    // {
    //   id: 2,
    //   title: "Full Stack Developer",
    //   company: "Digital Innovations",
    //   period: "2021 - 2022",
    //   location: "Zambia",
    //   description: "Developed end-to-end solutions for various client projects, from concept to deployment.",
    //   responsibilities: [
    //     "Developed full-stack applications from concept to deployment",
    //     "Designed and implemented database schemas and API endpoints",
    //     "Deployed applications using cloud services and CI/CD pipelines",
    //     "Worked directly with clients to understand requirements and deliver solutions",
    //     "Maintained and updated existing applications and systems",
    //     "Implemented authentication and authorization systems"
    //   ],
    //   technologies: ["JavaScript", "React", "Node.js", "Express.js", "MongoDB", "Git", "AWS", "Docker", "JWT", "REST APIs"]
    // },
    // {
    //   id: 3,
    //   title: "Junior Developer",
    //   company: "StartupXYZ",
    //   period: "2020 - 2021",
    //   location: "Remote",
    //   description: "Started my journey in software development with a focus on learning and growth in web technologies.",
    //   responsibilities: [
    //     "Assisted in developing web applications and features",
    //     "Learned modern development practices and tools",
    //     "Participated in team meetings and project planning",
    //     "Fixed bugs and implemented small features",
    //     "Contributed to documentation and testing efforts",
    //     "Built basic CRUD applications and user interfaces"
    //   ],
    //   technologies: ["HTML", "CSS", "JavaScript", "React", "Git", "Agile", "Bootstrap", "JSON", "Local Storage"]
    // }
  ];

  return (
    <>
      <NavBar />
      
      {/* Home Section */}
      <section id="home" className="section home-section">
        <div style={{ width: '100%', height: '100vh', position: 'absolute', top: 0, left: 0 }}>
          <GridDistortion
            imageSrc="https://picsum.photos/1920/1080?grayscale&blur=1"
            grid={15}
            mouse={0.2}
            strength={0.3}
            relaxation={0.8}
            className="custom-class"
          />
        </div>
        <div className="container home-content">
          <h1>
            <Typewriter text="Hi, Abdur-rahmaan here." speed={150} delay={500} color="#00d4ff" />
          </h1>
          <p>I'm a software engineer from Zambia with a love for creating innovative digital experiences. 
          I specialize in modern web technologies and enjoy turning complex problems into simple solutions.</p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="about-container">
          <div className="about-content">
            <div className="about-text">
              <FadeIn delay={200}>
                <h2>./ About Me ______________</h2>
              </FadeIn>
              <FadeIn delay={400}>
                <p>
                  I'm currently a software engineer at Probase Limited working under the Smartpay team 
                </p>
              </FadeIn>
              <FadeIn delay={600}>
                <p>
                  With a strong foundation in both frontend and backend development, I strive to build applications that 
                  not only look great but also provide exceptional user experiences. I'm always open to learn new 
                  technologies and take on challenging projects that push me to the edge.
                </p>
              </FadeIn>
              <FadeIn delay={800}>
                <p>
                  When I'm not coding, you can find me exploring Content creating, Gaming, or sharing knowledge with the developer community. I believe in the power of technology to make a 
                  positive impact on people's lives.
                </p>
              </FadeIn>
            </div>
            <div className="about-image">
              <FadeIn delay={1000} duration={1200}>
                <div className="image-card">
                  <img alt="Abdurrahmaan9" src={"/assets/Mr-Robot.jpeg"} />
                  {/* <div className="image-placeholder">
                    <span>Photo Here</span>
                    <p>Add your profile picture</p>
                  </div> */}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section">
        <div className="experience-container">
          <FadeIn delay={200}>
            <h2>./ Experience ______________</h2>
          </FadeIn>
          <div className="experience-content">
            <FadeIn delay={400}>
              <div className="experience-list">
                {experiences.map((exp, index) => (
                  <div
                    key={exp.id}
                    className={`experience-item ${selectedExperience === index ? 'active' : ''}`}
                    onClick={() => setSelectedExperience(index)}
                  >
                    <div className="experience-item-header">
                      <h3>{exp.title}</h3>
                      <span className="company">{exp.company}</span>
                    </div>
                    <div className="experience-item-meta">
                      <span className="period">{exp.period}</span>
                      <span className="location">{exp.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={600}>
              <div className="experience-details">
                {experiences[selectedExperience] && (
                  <div className="experience-detail-content">
                    <div className="experience-detail-header">
                      <h3>{experiences[selectedExperience].title}</h3>
                      <h4>{experiences[selectedExperience].company}</h4>
                      <div className="experience-detail-meta">
                        <span>{experiences[selectedExperience].period}</span>
                        <span>•</span>
                        <span>{experiences[selectedExperience].location}</span>
                      </div>
                    </div>
                    <p className="experience-description">
                      {experiences[selectedExperience].description}
                    </p>
                    <div className="experience-responsibilities">
                      <h5>Key Responsibilities:</h5>
                      <ul>
                        {experiences[selectedExperience].responsibilities.map((resp, index) => (
                          <li key={index}>{resp}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="experience-technologies">
                      <h5>Technologies Used:</h5>
                      <div className="tech-tags">
                        {experiences[selectedExperience].technologies.map((tech, index) => {
                          // Define primary technologies for each role
                          const primaryTechs = {
                            0: ["React", "Node.js", "TypeScript", "MongoDB"], // Current role
                            1: ["React", "JavaScript", "Redux"], // Frontend role
                            2: ["JavaScript", "React", "Node.js", "MongoDB"], // Full stack role
                            3: ["HTML", "CSS", "JavaScript", "React"] // Junior role
                          };
                          
                          const isPrimary = primaryTechs[selectedExperience]?.includes(tech);
                          
                          return (
                            <span 
                              key={index} 
                              className={`tech-tag ${isPrimary ? 'primary' : ''}`}
                            >
                              {tech}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <div className="container">
          <FadeIn delay={200}>
            <h2>./ Projects ______________</h2>
          </FadeIn>
          <FadeIn delay={400}>
            <p>Check out some of my recent projects and work.</p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

export default App;
