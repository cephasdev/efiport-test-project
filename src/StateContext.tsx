import { createContext } from 'react';
// import { IProject } from './TypedInterfaces';
import { IProject, IProgram, IResearchArea } from './TypedInterfaces';

interface IStateContextProps {
    programs: IProgram[];
    researchAreas: IResearchArea[];
    isEditMode: boolean;
    projectDetailsModalOpen: boolean;
    projectDetails: IProject;
    savingNewProjectIsExecuting: boolean;
}

const StateContext = createContext({} as IStateContextProps);

export default StateContext;
