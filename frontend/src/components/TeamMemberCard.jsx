import React from "react";

const TeamMemberCard = ({ member }) => (
  <div className="team-card">
    <div className="team-photo">
      {/* Ensure the path to images is correct, might need adjustment depending on public folder setup */}
      <img src={member.photo} alt={member.name} />
    </div>
    <h3>{member.name}</h3>
    <p className="team-position">{member.position}</p>
    <p className="team-description">{member.description}</p>
  </div>
);

export default TeamMemberCard;
