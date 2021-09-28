import React, { useState, useEffect } from 'react';

function EditForm() {
  interface IProgram {
    _id: string;
    title: string;
  }
  interface IArea {
    _id: string;
    title: string;
  }

  const [programs, setPrograms] = useState<IProgram[]>([]);
  const [researchAreas, setResearchAreas] = useState<IArea[]>([]);
  const [isGroupProject, setIsGroupProject] = useState(false);
  const predefinedUsers = [
    'John Smith',
    'Farakh Khan',
    'Ernesto Jimenez',
    'Erich Koch'
  ];

  useEffect(() => {
    fetch('http://localhost:3001/api/programs')
      .then((res) => res.json())
      .then((data) => {
        setPrograms(data);
      })
      .catch((err) => {
        console.log('There was an error calling the /api/programs endpoint.');
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/api/researchareas')
      .then((res) => res.json())
      .then((data) => {
        setResearchAreas(data);
      })
      .catch((err) => {
        console.log(
          'There was an error calling the /api/researchareas endpoint.'
        );
      });
  }, []);

  return (
    <div className="edit-form container p-3">
      <h2>Edit Form</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="program" className="form-label">
            Program
          </label>
          <select className="form-select" name="program" id="program">
            {programs.map((prog, idx) => {
              return (
                <option key={idx} value={prog._id}>
                  {prog.title}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Project Title
          </label>
          <input
            type="text"
            className="form-control"
            name="title"
            id="title"
            autoComplete="off"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="researchArea" className="form-label">
            Research Area
          </label>
          <select className="form-select" name="researchArea" id="researchArea">
            {researchAreas.map((area, idx) => {
              return (
                <option key={idx} value={area._id}>
                  {area.title}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="literature" className="form-label">
            Literature
          </label>
          <input
            type="text"
            className="form-control"
            name="literature"
            id="literature"
            autoComplete="off"
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="isGroupProject"
            checked={isGroupProject}
            onChange={(ev) => setIsGroupProject(!isGroupProject)}
          />
          <label className="form-check-label" htmlFor="isGroupProject">
            Group Project?
          </label>
        </div>
        {isGroupProject && (
          <div className="mb-3">
            <label htmlFor="users" className="form-label">
              Users
            </label>
            <select className="form-select" name="users" id="users">
              {predefinedUsers.map((user, idx) => {
                return (
                  <option key={idx} value={idx}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="projectFiles" className="form-label">
            Project Files
          </label>
          <input
            type="file"
            multiple
            className="form-control"
            id="projectFiles"
            aria-describedby="emailHelp"
          />
        </div>
      </form>
    </div>
  );
}

export default EditForm;
