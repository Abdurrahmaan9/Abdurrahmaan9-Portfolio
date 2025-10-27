import './App.css';
import NavBar from './components/nav';
import GridDistortion from './components/DistortedGrid';
import Typewriter from './components/Typewriter';
import FadeIn from './components/FadeIn';
import Footer from './components/Footer';
import Projects from './components/Projects';
import { useState } from 'react';
import { projects, experiences, tech_stack } from './data';
import NeuralImageGraph from './components/NeuralImageGraph';

function App() {
  const [selectedExperience, setSelectedExperience] = useState(0);

  

  

  

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
                I’m a Honorary software engineer at <a href="https://probasegroup.com/" style={{color: "#00d4ff"}}>Probase Limited</a>, where I work on the Smartpay team building payment integrations and fintech solutions. 
                My role involves developing scalable backend services and supporting mission-critical financial systems. Alongside my work, 
                I’m pursuing a Bachelor’s degree in Computer Science at <a href="https://www.cavendishza.org/#" style={{color: "#00d4ff"}}>Cavendish University</a>.
                </p>
              </FadeIn>
              
              <FadeIn delay={800}>
                <p>
                  Relevant Skills:
                </p>
                <ul className="tech-stack">
                    {tech_stack.map(function (tech_item, i) {
                      return (
                        <li>{tech_item}</li>
                      );
                    })}
                </ul>
              </FadeIn>
            </div>
            <div className="about-image">
              <FadeIn delay={1000} duration={1200}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <NeuralImageGraph
                    images={["/assets/me1.jpg", "/assets/me2.jpg", "/assets/Mr-Robot.jpeg",  "/assets/Mr-Robot.jpeg", "/assets/me2.jpg", "/assets/me2.jpg", "/assets/Mr-Robot.jpeg" ]}
                    size={420}
                  />
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
                            0: ["Elixir","Phoenix", "JavaScript", "PostgreSQL","MSSQL", "REST APIs", "Git", "Docker"], // Current role
                            1: ["HTML", "JavaScript", "CSS", "BOOTSTRAP", "Git", "Responsive Design"], // Freelancer role
                            // 2: ["JavaScript", "React", "Node.js", "Postgres"], // Full stack role
                            // 3: ["HTML", "CSS", "JavaScript", "React"] // Junior role
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
            <p>Check out some of my projects and work.</p>
          </FadeIn>
          <FadeIn delay={600}>
            <Projects projects={projects} />
          </FadeIn>
        </div>
      </section>
      
      {/* Footer section */}
      <Footer />
    </>
  );
}

export default App;
