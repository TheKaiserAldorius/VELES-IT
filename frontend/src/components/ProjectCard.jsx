import React from "react";

const ProjectCard = ({ project }) => (
  <div className="case-card">
    <img className="case-image" src={project.image} alt={project.title} />
    <div className="case-content">
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <button className="project-details-btn">Подробнее</button>
      <div className="case-tags">
        {project.tags.map((tag, index) => (
          <span key={index} className="case-tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default ProjectCard;
