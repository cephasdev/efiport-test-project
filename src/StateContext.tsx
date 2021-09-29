import { createContext } from 'react';
// import { IProject } from './TypedInterfaces';
import {
    IProject,
    IProgram,
    IResearchArea,
    IProjectFilter,
    IStateContextProps
} from './TypedInterfaces';

// interface IProjectFilter {
//     program: string;
//     researchArea: string;
//     isGroupProject: string;
// }

// interface IStateContextProps {
//     programs: IProgram[];
//     researchAreas: IResearchArea[];
//     isEditMode: boolean;
//     projectDetailsModalOpen: boolean;
//     projectDetails: IProject;
//     savingNewProjectIsExecuting: boolean;
//     projectFilters: IProjectFilter;
// }

const StateContext = createContext({} as IStateContextProps);

export default StateContext;
