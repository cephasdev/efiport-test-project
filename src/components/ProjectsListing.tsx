import { useState, useEffect, useContext } from 'react';
import Spinner from './Spinner';
import StateContext from '../StateContext';
import DispatchContext from '../DispatchContext';
import { IProject } from '../TypedInterfaces';
import './ProjectsListing.css';

function ProjectsListing() {
    const [projects, setProjects] = useState<IProject[]>([]);
    const appState = useContext(StateContext);
    const appDispatch = useContext(DispatchContext);

    useEffect(() => {
        setProjects(appState.projectsList);
    }, [appState.projectsList]);

    function handleProjectClick(projectId: string) {
        fetch(`http://localhost:3001/api/project/${projectId}`)
            .then((res) => res.json())
            .then((data) => {
                appDispatch({ type: 'projectDetailsLoaded', value: data });
            })
            .catch((err) => {
                console.log('There was an error fetching the project details.');
            });
    }

    if (appState.projectListIsLoading) {
        return <Spinner />;
    }

    return (
        <div className="programs-listing container p-3">
            <h2>Projects</h2>

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
