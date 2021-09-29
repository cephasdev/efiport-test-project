import React, { useState, useEffect, useContext } from 'react';
import DispatchContext from '../DispatchContext';
import { IProject } from '../TypedInterfaces';
import './ProjectsListing.css';

function ProjectsListing() {
    // interface IProject {
    //     _id: string;
    //     title: string;
    //     program: string;
    //     research_area: string;
    //     isgroupproject: boolean;
    //     users: string[];
    // }

    const [projects, setProjects] = useState<IProject[]>([]);
    const appDispatch = useContext(DispatchContext);

    useEffect(() => {
        fetch('http://localhost:3001/api/projects')
            .then((res) => res.json())
            .then((data) => {
                setProjects(data);
            })
            .catch((err) => {
                console.log(
                    'There was an error calling the /api/projects endpoint.'
                );
            });
    }, []);

    function handleProjectClick(projectId: string) {
        console.log('handleProjectClick', projectId);
        fetch(`http://localhost:3001/api/project/${projectId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log('/api/project/id', data);
                appDispatch({ type: 'projectDetailsLoaded', value: data });
            })
            .catch((err) => {
                console.log('There was an error fetching the project details.');
            });
    }

    return (
        <div className="programs-listing container p-3">
            <h2>Programs</h2>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Program</th>
                        <th scope="col">Group Project?</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project, idx) => {
                        return (
                            <tr
                                key={project._id}
                                onClick={() => {
                                    handleProjectClick(project._id);
                                }}
                            >
                                <td>{project.title}</td>
                                {/* <td>{project.program}</td> */}
                                <td>{project.projectProgram[0].title}</td>
                                <td>{project.isgroupproject ? '✔' : '❌'}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ProjectsListing;
