import { useState, useEffect, useContext } from 'react';
import FilterBox from './FilterBox';
import ProjectsListing from './ProjectsListing';
import StateContext from '../StateContext';
import DispatchContext from '../DispatchContext';
import { IProject, IProjectFilter } from '../TypedInterfaces';

function FilterableProjectsListing() {
    const [projects, setProjects] = useState<IProject[]>([]);
    const [projectFilters, setProjectFilters] = useState<IProjectFilter>(
        {} as IProjectFilter
    );
    const [filtersAreFullyLoaded, setFiltersAreFullyLoaded] = useState(false);
    const appState = useContext(StateContext);
    const appDispatch = useContext(DispatchContext);

    useEffect(() => {
        if (
            !appState.programs ||
            appState.programs.length === 0 ||
            !appState.researchAreas ||
            appState.researchAreas.length === 0
        ) {
            return;
        }

        setFiltersAreFullyLoaded(true);
    }, [appState.programs, appState.researchAreas]);

    function loadAllProjects() {
        appDispatch({
            type: 'projectsListingLoadingStarted'
        });
        const port = process.env.APIPORT || 3001;
        fetch(`http://localhost:${port}/api/projects`)
            .then((res) => res.json())
            .then((data) => {
                setProjects(data);
                appDispatch({
                    type: 'projectsListingLoaded'
                });
            })
            .catch((err) => {
                console.log(
                    'There was an error calling the /api/projects endpoint.'
                );
                appDispatch({
                    type: 'projectsListingLoaded'
                });
            });
    }

    useEffect(() => {
        loadAllProjects();
    }, []);

    useEffect(() => {
        if (
            // !appState.programs ||
            // appState.programs.length === 0 ||
            // !appState.researchAreas ||
            // appState.researchAreas.length === 0

            !filtersAreFullyLoaded
        ) {
            return;
        }

        if (
            projectFilters.program ||
            projectFilters.researchArea ||
            projectFilters.isGroupProject
        ) {
            appDispatch({
                type: 'projectsListingLoadingStarted'
            });
            const filterParams = projectFilters;
            const port = process.env.APIPORT || 3001;
            let endpointUrl = `http://localhost:${port}/api/search/project?`;
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
                    setProjects(data);
                    appDispatch({
                        type: 'projectsListingLoaded'
                    });
                })
                .catch((err) => {
                    console.log('There was an error filtering projects.');
                    console.log(err);
                    appDispatch({
                        type: 'projectsListingLoaded'
                    });
                });
        } else {
            loadAllProjects();
        }
    }, [projectFilters]);

    return (
        <div className="filterable-projects-listing">
            <FilterBox
                projectFilters={projectFilters}
                setProjectFilters={setProjectFilters}
            />
            <ProjectsListing projects={projects} />
        </div>
    );
}

export default FilterableProjectsListing;
