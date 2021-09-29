import { useState, useEffect, useContext } from 'react';
import Spinner from './Spinner';
import DispatchContext from '../DispatchContext';
import StateContext from '../StateContext';

function FilterBox() {
    const [program, setProgram] = useState('');
    const [researchArea, setResearchArea] = useState('');
    const [isGroupProject, setIsGroupProject] = useState('');
    const [isProgramsLoading, setIsProgramsLoading] = useState(true);
    const [isResearchAreasLoading, setIsResearchAreasLoading] = useState(true);

    const appState = useContext(StateContext);
    const appDispatch = useContext(DispatchContext);

    useEffect(() => {
        const port = process.env.APIPORT || 3001;
        fetch(`http://localhost:${port}/api/programs`)
            .then((res) => res.json())
            .then((data) => {
                setIsProgramsLoading(false);
                appDispatch({ type: 'programsLoaded', value: data });
            })
            .catch((err) => {
                console.log(
                    'There was an error calling the /api/programs endpoint.'
                );
                setIsProgramsLoading(false);
            });
    }, []);

    useEffect(() => {
        const port = process.env.APIPORT || 3001;
        fetch(`http://localhost:${port}/api/researchareas`)
            .then((res) => res.json())
            .then((data) => {
                setIsResearchAreasLoading(false);
                appDispatch({ type: 'researchAreasLoaded', value: data });
            })
            .catch((err) => {
                console.log(
                    'There was an error calling the /api/researchareas endpoint.'
                );
                setIsResearchAreasLoading(false);
            });
    }, []);

    useEffect(() => {
        if (program || researchArea || isGroupProject) {
            appDispatch({
                type: 'projectsFilterSelected',
                value: {
                    program,
                    researchArea,
                    isGroupProject
                }
            });
        } else {
            appDispatch({ type: 'projectsFilteringCleared' });
        }
    }, [program, researchArea, isGroupProject]);

    if (isProgramsLoading || isResearchAreasLoading) {
        return <Spinner />;
    }

    return (
        <div className="filter-box d-flex align-center container p-3">
            <div className="row g-3 align-items-center">
                <div className="col-auto">
                    <strong>Filter projects:</strong>
                </div>
                <div className="col-auto">
                    <label htmlFor="filterProgram" className="col-form-label">
                        Program
                    </label>
                </div>
                <div className="col-auto">
                    <select
                        onChange={(ev) => setProgram(ev.target.value)}
                        name="filterProgram"
                        id="filterProgram"
                    >
                        <option value=""></option>
                        {appState.programs.map((prog, idx) => {
                            return (
                                <option key={idx} value={prog._id}>
                                    {prog.title}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="col-auto">
                    <label
                        htmlFor="filterResearchArea"
                        className="col-form-label"
                    >
                        Research Area
                    </label>
                </div>
                <div className="col-auto">
                    <select
                        onChange={(ev) => setResearchArea(ev.target.value)}
                        name="filterResearchArea"
                        id="filterResearchArea"
                    >
                        <option value=""></option>
                        {appState.researchAreas.map((area, idx) => {
                            return (
                                <option key={idx} value={area._id}>
                                    {area.title}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="col-auto">
                    <label
                        htmlFor="filterIsGroupProject"
                        className="col-form-label"
                    >
                        Group Project?
                    </label>
                </div>
                <div className="col-auto">
                    <select
                        onChange={(ev) => setIsGroupProject(ev.target.value)}
                        name="filterIsGroupProject"
                        id="filterIsGroupProject"
                    >
                        <option value=""></option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default FilterBox;
