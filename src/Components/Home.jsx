import React, { useEffect, useState } from 'react'
import { userService } from '../services/apis';
import { useNavigate } from 'react-router-dom';
export default function Home() {

  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await userService.getUserProjects();

        setProjects(response);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleViewClick = (projectId) => {
    navigate(`/viewdoc/${projectId}`);
  };


  return (
    <div className="grid grid-cols-3 gap-4">
    {projects?.map((project) => (
      <div key={project.id} className="card bg-base-100 w-96 shadow-sm flex justify-center mt-8">
        <div className="card-body">
          <h2 className="card-title">{project.name}</h2>
          <p>{project.description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={() => handleViewClick(project.id)}>
              View
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
  );
}
