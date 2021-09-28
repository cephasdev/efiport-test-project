import React, { useState, useEffect, useContext } from 'react';
import DispatchContext from '../DispatchContext';

function ProgramsListing() {
  interface IProject {
    _id: string;
    title: string;
    program: string;
    research_area: string;
    isGroupProject: boolean;
    users: string[];
  }

  const [projects, setProjects] = useState<IProject[]>([]);
  const appDispatch = useContext(DispatchContext);

  useEffect(() => {
    fetch('http://localhost:3001/api/projects')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((err) => {
        console.log('There was an error calling the /api/projects endpoint.');
      });
  }, []);

  function handleProjectClick(projectId: string) {
    fetch(`http://localhost:3001/api/project/${projectId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('/api/project/id', data);
        // // openProjectDetails(data);
        // setProjectDetails(data);
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
                key={idx}
                onClick={() => {
                  handleProjectClick('id-of-clicked-project');
                }}
              >
                <td>{project.title}</td>
                <td>{project.program}</td>
                <td>{project.isGroupProject ? '✔' : '❌'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ProgramsListing;
