import React from 'react';
import Header from './components/Header';
import ProgramsListing from './components/ProgramsListing';
import EditForm from './components/EditForm';
import ProgramDetailsModal from './components/ProgramDetailsModal';
import StateContext from './StateContext';
import DispatchContext from './DispatchContext';
import { useImmerReducer } from 'use-immer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import FilterBox from './components/FilterBox';

function App() {
  const initialState = {
    isEditMode: false,
    projectDetailsModalOpen: false,
    projectDetails: {}
  };

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
              body: JSON.stringify(action.value)
              // body: action.value
            })
              // .then((res) => res.json())
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
    }
  }

  const [state, setState] = useImmerReducer(appReducer, initialState);
  return (
    <div className="App">
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={setState}>
          <BrowserRouter>
            <Header />
            <Switch>
              <Route path="/" exact>
                <FilterBox />
                <ProgramsListing />
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
