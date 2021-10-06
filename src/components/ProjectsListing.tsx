import { useContext } from 'react';
import Spinner from './Spinner';
import StateContext from '../StateContext';
import DispatchContext from '../DispatchContext';
import { IProject, IProjectProps } from '../TypedInterfaces';
import './ProjectsListing.css';

function ProjectsListing(props: { projects: IProject[] }) {
    const appState = useContext(StateContext);
    const appDispatch = useContext(DispatchContext);

    function handleProjectClick(projectId: string) {
        const port = process.env.APIPORT || 3001;
        fetch(`http://localhost:${port}/api/project/${projectId}`)
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
                    {props.projects.map((project: IProject) => {
                        return (
                            <tr
                                key={project._id}
                                onClick={() => {
                                    handleProjectClick(project._id);
                                }}
                            >
                                <td>{project.title}</td>
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
