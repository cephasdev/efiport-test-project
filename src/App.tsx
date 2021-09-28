import React from 'react';
import Header from './components/Header';
import ProjectsListing from './components/ProjectsListing';
import EditForm from './components/EditForm';
import ProgramDetailsModal from './components/ProgramDetailsModal';
import StateContext from './StateContext';
import DispatchContext from './DispatchContext';
import { useImmerReducer } from 'use-immer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import FilterBox from './components/FilterBox';
import axios from 'axios';
const initialState = {
    isEditMode: false,
    projectDetailsModalOpen: false,
    projectDetails: {},
    savingNewProjectIsExecuting: false
};
// async function doThePost(postObj: any) {
//     return await axios.post('http://localhost:3001/api/project/new', postObj);
// }

function appReducer(draft: any, action: any) {
    switch (action.type) {
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

                    // const res = doThePost(action.value);
                }
                // close the edit form
                draft.isEditMode = false;
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
        // case 'savingNewProjectFinished':
        //     draft.savingNewProjectIsExecuting = false;
        //     break;
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
                        <ProgramDetailsModal />
                    </BrowserRouter>
                </DispatchContext.Provider>
            </StateContext.Provider>
        </div>
    );
}

export default App;
