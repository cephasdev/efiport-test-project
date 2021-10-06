import { IProject } from './TypedInterfaces';

export const initialState = {
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

export function appReducer(draft: any, action: any) {
    switch (action.type) {
        case 'programsLoaded':
            draft.programs = action.value;
            break;
        case 'projectsListingLoadingStarted':
            draft.projectListIsLoading = true;
            break;
        case 'researchAreasLoaded':
            draft.researchAreas = action.value;
            break;
        case 'projectsListingLoaded':
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
                    const port = process.env.APIPORT || 3001;
                    fetch(`http://localhost:${port}/api/project/new`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(action.value)
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
        case 'projectsFilteringCleared':
            draft.projectListIsLoading = true;
            draft.projectFilters = {
                program: '',
                researchArea: '',
                isGroupProject: ''
            };
            // loadAllProjects();
            break;
    }
}
