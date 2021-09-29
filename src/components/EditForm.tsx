import React, { useState, useEffect, useContext, ChangeEvent } from 'react';
import DispatchContext from '../DispatchContext';
import StateContext from '../StateContext';
import { IProgram } from '../TypedInterfaces';

function EditForm() {
    // interface IProgram {
    //     _id: string;
    //     title: string;
    // }
    interface IArea {
        _id: string;
        title: string;
    }

    const [programs, setPrograms] = useState<IProgram[]>([]);
    const [researchAreas, setResearchAreas] = useState<IArea[]>([]);
    // const [isGroupProject, setIsGroupProject] = useState(false);
    const [title, setTitle] = useState('');
    const [program, setProgram] = useState('');
    const [researchArea, setResearchArea] = useState('');
    const [literature, setLiterature] = useState('');
    const [isGroupProject, setIsGroupProject] = useState(false);
    const [users, setUsers] = useState<string[]>([]);

    const predefinedUsers = [
        'John Smith',
        'Farakh Khan',
        'Ernesto Jimenez',
        'Erich Koch'
    ];

    const appState = useContext(StateContext);
    const appDispatch = useContext(DispatchContext);

    useEffect(() => {
        fetch('http://localhost:3001/api/programs')
            .then((res) => res.json())
            .then((data) => {
                setPrograms(data);
            })
            .catch((err) => {
                console.log(
                    'There was an error calling the /api/programs endpoint.'
                );
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

    useEffect(() => {
        setTitle('');
        setProgram('');
        setResearchArea('');
        setLiterature('');
        setIsGroupProject(false);
        setUsers([]);
    }, []);

    useEffect(() => {
        if (!appState.savingNewProjectIsExecuting) {
            return;
        }
        console.log('Triggered saving in EditForm');
        const projectData = {
            title,
            program,
            researchArea,
            literature: [literature],
            isGroupProject,
            users
        };
        console.log('projectData:', projectData);
        appDispatch({
            type: 'saveProject',
            value: projectData
        });
    }, [appState.savingNewProjectIsExecuting]);

    function onUsersChange(ev: ChangeEvent<HTMLSelectElement>) {
        // https://stackoverflow.com/a/49684109
        let values = Array.from(
            ev.target.selectedOptions,
            (option) => option.value
        );
        setUsers(values);
    }

    return (
        <div className="edit-form container p-3">
            <h2>Edit Form</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="program" className="form-label">
                        Program
                    </label>
                    <select
                        onChange={(ev) => setProgram(ev.target.value)}
                        className="form-select"
                        name="program"
                        id="program"
                    >
                        <option value="">Choose Program</option>
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
                        onChange={(ev) => setTitle(ev.target.value)}
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
                    <select
                        onChange={(ev) => setResearchArea(ev.target.value)}
                        className="form-select"
                        name="researchArea"
                        id="researchArea"
                    >
                        <option value="">Choose Research Area</option>
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
                        onChange={(ev) => setLiterature(ev.target.value)}
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
                    <label
                        className="form-check-label"
                        htmlFor="isGroupProject"
                    >
                        Group Project?
                    </label>
                </div>
                {isGroupProject && (
                    <div className="mb-3">
                        <label htmlFor="users" className="form-label">
                            Users
                        </label>
                        <select
                            onChange={onUsersChange}
                            className="form-select"
                            name="users"
                            id="users"
                            multiple
                        >
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
