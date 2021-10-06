import React, { useState, useEffect, useContext } from 'react';
import Spinner from './Spinner';
import StateContext from '../StateContext';
import { IProjectFilter } from '../TypedInterfaces';

function FilterBox(props: {
    projectFilters: IProjectFilter;
    setProjectFilters: React.Dispatch<React.SetStateAction<IProjectFilter>>;
}) {
    const [program, setProgram] = useState('');
    const [researchArea, setResearchArea] = useState('');
    const [isGroupProject, setIsGroupProject] = useState('');
    const [isProgramsLoading, setIsProgramsLoading] = useState(true);
    const [isResearchAreasLoading, setIsResearchAreasLoading] = useState(true);

    const appState = useContext(StateContext);

    useEffect(() => {
        if (!appState.programs || appState.programs.length === 0) {
            return;
        }
        setIsProgramsLoading(false);
    }, [appState.programs]);

    useEffect(() => {
        if (!appState.researchAreas || appState.researchAreas.length === 0) {
            return;
        }
        setIsResearchAreasLoading(false);
    }, [appState.researchAreas]);

    useEffect(() => {
        if (isProgramsLoading || isResearchAreasLoading) {
            return;
        }
        props.setProjectFilters({
            program,
            researchArea,
            isGroupProject
        });
    }, [program, researchArea, isGroupProject]);

    if (isProgramsLoading || isResearchAreasLoading) {
        return <Spinner />;
    }

    return (
        <div className="filter-box d-flex align-center container p-3">
            <div className="row g-md-3 align-items-center">
                <div className="col-xs-12 col-md-auto">
                    <strong>Filter projects:</strong>
                </div>
                <div className="col-xs-12 col-md-auto">
                    <label htmlFor="filterProgram" className="col-form-label">
                        Program
                    </label>
                </div>
                <div className="col-xs-12 col-md-auto">
                    <select
                        onChange={(ev) => setProgram(ev.target.value)}
                        name="filterProgram"
                        id="filterProgram"
                        className="form-select w-100"
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
                <div className="col-xs-12 col-md-auto">
                    <label
                        htmlFor="filterResearchArea"
                        className="col-form-label"
                    >
                        Research Area
                    </label>
                </div>
                <div className="col-xs-12 col-md-auto">
                    <select
                        onChange={(ev) => setResearchArea(ev.target.value)}
                        name="filterResearchArea"
                        id="filterResearchArea"
                        className="form-select w-100"
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
                <div className="col-xs-12 col-md-auto">
                    <label
                        htmlFor="filterIsGroupProject"
                        className="col-form-label"
                    >
                        Group Project?
                    </label>
                </div>
                <div className="col-xs-12 col-md-auto">
                    <select
                        onChange={(ev) => setIsGroupProject(ev.target.value)}
                        name="filterIsGroupProject"
                        id="filterIsGroupProject"
                        className="form-select w-100"
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
