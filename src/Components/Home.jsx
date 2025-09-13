import React, { useEffect, useState } from "react";
import { userService } from "../services/apis";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

export default function Home() {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
        const fetchProjects = async () => {
            try {
                const response = await userService.getUserProjects();
                setProjects(response);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, 1200);
    }, []);

    const handleViewClick = (projectId) => {
        navigate(`/viewdoc/${projectId}`);
    };

    return (
        <div className="flex flex-wrap justify-center gap-8 p-8">
            {projects?.map((project) => (
                <div
                    key={project.id}
                    className="card bg-base-100 w-96 shadow-md cursor-pointer transition-transform hover:scale-105"
                    onClick={() => handleViewClick(project.id)}
                >
                    <div className="card-body">
                        {/* Project Title */}
                        <h2 className="card-title text-xl font-semibold">
                            {project.title}
                        </h2>

                        {/* Limited Description */}
                        <p className="text-sm text-gray-900 line-clamp-1">
                            {project.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
