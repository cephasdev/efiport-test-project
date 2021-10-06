import { useEffect } from 'react';
import Header from './components/Header';
import EditForm from './components/EditForm';
import ProjectDetailsModal from './components/ProjectDetailsModal';
import StateContext from './StateContext';
import DispatchContext from './DispatchContext';
import { useImmerReducer } from 'use-immer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { initialState, appReducer } from './AppReducer';
import FilterableProjectsListing from './components/FilterableProjectsListing';

function App() {
    const [state, dispatch] = useImmerReducer(appReducer, initialState);

    useEffect(() => {
        const port = process.env.APIPORT || 3001;
        fetch(`http://localhost:${port}/api/programs`)
            .then((res) => res.json())
            .then((data) => {
                dispatch({ type: 'programsLoaded', value: data });
                // state.programs = data;
            })
            .catch((err) => {
                console.log(
                    'There was an error calling the /api/programs endpoint.'
                );
            });
    }, []);

    useEffect(() => {
        const port = process.env.APIPORT || 3001;
        fetch(`http://localhost:${port}/api/researchareas`)
            .then((res) => res.json())
            .then((data) => {
                dispatch({ type: 'researchAreasLoaded', value: data });
                // state.researchAreas = data;
            })
            .catch((err) => {
                console.log(
                    'There was an error calling the /api/researchareas endpoint.'
                );
            });
    }, []);

    return (
        <div className="App">
            <StateContext.Provider value={state}>
                <DispatchContext.Provider value={dispatch}>
                    <BrowserRouter>
                        <Header />
                        <Switch>
                            <Route path="/" exact>
                                <FilterableProjectsListing />
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
