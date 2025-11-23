// src/pages/Projects.jsx
import React, { useEffect, useState } from 'react';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // TODO: fetch user projects or site projects from API
    setProjects([
      { id: 1, name: 'Threadit UI', description: 'Designing frontend of Threaddit' },
      { id: 2, name: 'Backend API', description: 'Build RESTful APIs with Node/Mongo' },
    ]);
  }, []);

  return (
    <div className="page projects-page">
      <h1>Projects</h1>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <ul>
          {projects.map(p => (
            <li key={p.id}>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Projects;
