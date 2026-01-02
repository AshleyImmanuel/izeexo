"use client";

import { useState, useEffect } from "react";
import styles from "../dashboard.module.css";
import DashboardLoader from "@/components/dashboard/DashboardLoader";

export default function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const response = await fetch("/api/dashboard/projects");
                const data = await response.json();
                setProjects(data.projects || []);
            } catch (error) {
                console.error("Failed to fetch projects:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProjects();
    }, []);

    // ... import removed from here

    // ...

    if (loading) {
        return <DashboardLoader text="Loading requests..." />;
    }

    return (
        <div className={styles.dashboardPage}>
            <div className={styles.header}>
                <h1>Custom Requests</h1>
                <p>Track your custom design inquiries</p>
            </div>

            <div className={styles.emptyState}>
                <p>No custom requests active.</p>
                <span style={{ display: 'block', fontSize: '0.9rem', color: '#666', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
                    Need a bespoke design for your brand? Start a dialogue with us.
                </span>
                <a href="/contact" className={styles.btnPrimary} style={{ textDecoration: 'none', display: 'inline-block' }}>
                    + Start New Request
                </a>
            </div>
            ) : (
            <div className={styles.projectsList}>
                {projects.map((project) => (
                    <div key={project.id} className={styles.projectCard}>
                        <div className={styles.projectHeader}>
                            <h3>{project.designType}</h3>
                            <div className={styles.statusContainer}>
                                <span className={`${styles.status} ${styles[project.status.toLowerCase()]}`}>
                                    {project.status === 'PENDING' ? 'Verifying Request' :
                                        project.status === 'IN_PROGRESS' ? 'Design in Progress' :
                                            project.status === 'COMPLETED' ? 'Project Completed' : project.status}
                                </span>
                                {project.status === 'PENDING' && (
                                    <p className={styles.statusHelper}>
                                        We are reviewing your request requirements. This usually takes 24-48 hours.
                                    </p>
                                )}
                            </div>
                        </div>
                        <p className={styles.projectDescription}>{project.description}</p>
                        <div className={styles.projectMeta}>
                            <span>Budget: {project.budget || "Not specified"}</span>
                            <span>Submitted: {new Date(project.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                ))}
            </div>
            )}
        </div>
    );
}
