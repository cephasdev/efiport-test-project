import React from 'react';
import Header from './components/Header';
import ProjectsListing from './components/ProjectsListing';
import EditForm from './components/EditForm';
import ProjectDetailsModal from './components/ProjectDetailsModal';
import StateContext from './StateContext';
import DispatchContext from './DispatchContext';
import { useImmerReducer } from 'use-immer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import FilterBox from './components/FilterBox';
import { IProject } from './TypedInterfaces';

// interface IProject {
//     _id: string;
//     title: string;
//     program: string;
//     research_area: string;
//     isgroupproject: boolean;
//     users: string[];
// }

const initialState = {
    isEditMode: false,
    programs: [],
    researchAreas: [],
    projectDetailsModalOpen: false,
    projectDetails: {} as IProject,
    savingNewProjectIsExecuting: false,
    projectFilters: {
        program: '',
        researchArea: '',
        isGroupProject: ''
    }
};

function appReducer(draft: any, action: any) {
    switch (action.type) {
        case 'programsLoaded':
            draft.programs = action.value;
            break;
        case 'researchAreasLoaded':
            draft.researchAreas = action.value;
            break;
        case 'openEdit':
            draft.isEditMode = true;
            break;
        case 'cancelEdit':
            draft.isEditMode = false;
            break;
        case 'saveProject':
            try {
                // save values from the edit form
                console.log('/api/program/new', action.value);
                if (action.value) {
                    console.log('/api/program/new', 'Calling POST');
                    fetch('http://localhost:3001/api/project/new', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(action.value)
                        // body: action.value
                    })
                        // .then((res) => res.json())
                        .then((data) => {
                            console.log(
                                '/api/program/new',
                                'New project was successfully saved.'
                            );
                            // draft.savingNewProjectIsExecuting = false;
                        })
                        .catch((err) => {
                            console.log(
                                'There was an error calling the /api/program/new endpoint.'
                            );
                            console.log(err);
                            // draft.savingNewProjectIsExecuting = false;
                        });
                }
                // close the edit form
                draft.isEditMode = false;
                draft.savingNewProjectIsExecuting = false;
            } catch (err) {
                console.log('Error on save.');
            }
            break;
        case 'projectDetailsLoaded':
            draft.projectDetailsModalOpen = true;
            draft.projectDetails = action.value;
            console.log('projectDetailsLoaded', draft.projectDetails);
            break;
        case 'closeProjectDetailsModal':
            draft.projectDetailsModalOpen = false;
            break;
        case 'savingNewProjectStarted':
            draft.savingNewProjectIsExecuting = true;
            break;
        case 'projectsFilterSelected':
            console.log('projectsFilterSelected!!!');
            const filterParams = action.value;
            let endpointUrl = 'http://localhost:3001/api/search/project?';
            let query = [];
            if (filterParams.program) {
                query.push('program=' + filterParams.program);
            }
            if (filterParams.researchArea) {
                query.push('researcharea=' + filterParams.researchArea);
            }
            endpointUrl += query.join('&');
            console.log(endpointUrl);
            fetch(
                // `http://localhost:3001/api/search/project/${filterParams.program}/${filterParams.researchArea}`
                endpointUrl
            )
                .then((res) => res.json())
                .then((data) => {
                    console.log(
                        // `/api/search/project/${filterParams.program}/${filterParams.researchArea}`,
                        endpointUrl,
                        data
                    );
                    // appDispatch({ type: 'projectDetailsLoaded', value: data });
                    // setIsLoading(false);
                    // TODO: draft.projectsList = data;
                })
                .catch((err) => {
                    console.log('There was an error filtering projects.');
                    // setIsLoading(false);
                });
            break;
        case 'projectsFilteringCleared':
            console.log('projectsFilteringCleared!!!');
            draft.projectFilters = {
                program: '',
                researchArea: '',
                isGroupProject: ''
            };
            break;
    }
}

function App() {
    const [state, dispatch] = useImmerReducer(appReducer, initialState);
    return (
        <div className="App">
            <StateContext.Provider value={state}>
                <DispatchContext.Provider value={dispatch}>
                    <BrowserRouter>
                        <Header />
                        <Switch>
                            <Route path="/" exact>
                                <FilterBox />
                                <ProjectsListing />
                            </Route>
                            <Route path="/edit" exact>
                                <EditForm />
                            </Route>
                        </Switch>
                        <ProjectDetailsModal />
                    </BrowserRouter>
                </DispatchContext.Provider>
            </StateContext.Provider>
        </div>
    );
}

export default App;
