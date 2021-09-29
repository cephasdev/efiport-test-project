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

function App() {
    const initialState = {
        isEditMode: false,
        programs: [],
        researchAreas: [],
        projectsList: [],
        projectListIsLoading: true,
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
            case 'projectsListingLoaded':
                draft.projectsList = action.value;
                draft.projectListIsLoading = false;
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
                    if (action.value) {
                        fetch('http://localhost:3001/api/project/new', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(action.value)
                            // body: action.value
                        })
                            .then((data) => {
                                console.log(
                                    '/api/program/new',
                                    'New project was successfully saved.'
                                );
                            })
                            .catch((err) => {
                                console.log(
                                    'There was an error calling the /api/program/new endpoint.'
                                );
                                console.log(err);
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
                break;
            case 'closeProjectDetailsModal':
                draft.projectDetailsModalOpen = false;
                break;
            case 'savingNewProjectStarted':
                draft.savingNewProjectIsExecuting = true;
                break;
            case 'projectsFilterSelected':
                draft.projectListIsLoading = true;
                const filterParams = action.value;
                let endpointUrl = 'http://localhost:3001/api/search/project?';
                let query = [];
                if (filterParams.program) {
                    query.push('program=' + filterParams.program);
                }
                if (filterParams.researchArea) {
                    query.push('researcharea=' + filterParams.researchArea);
                }
                if (filterParams.isGroupProject) {
                    query.push('isgroupproject=' + filterParams.isGroupProject);
                }
                endpointUrl += query.join('&');
                fetch(endpointUrl)
                    .then((res) => res.json())
                    .then((data) => {
                        dispatch({
                            type: 'projectsListingLoaded',
                            value: data
                        });
                    })
                    .catch((err) => {
                        console.log('There was an error filtering projects.');
                        console.log(err);
                        draft.projectListIsLoading = false;
                    });
                break;
            case 'projectsFilteringCleared':
                draft.projectListIsLoading = true;
                draft.projectFilters = {
                    program: '',
                    researchArea: '',
                    isGroupProject: ''
                };
                loadAllProjects();
                break;
        }
    }

    const [state, dispatch] = useImmerReducer(appReducer, initialState);

    function loadAllProjects() {
        fetch('http://localhost:3001/api/projects')
            .then((res) => res.json())
            .then((data) => {
                dispatch({
                    type: 'projectsListingLoaded',
                    value: data
                });
            })
            .catch((err) => {
                console.log(
                    'There was an error calling the /api/projects endpoint.'
                );
            });
    }

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
