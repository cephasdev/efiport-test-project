import { createContext } from 'react';
import { IProject } from './TypedInterfaces';

interface IStateContextProps {
    isEditMode: boolean;
    projectDetailsModalOpen: boolean;
    projectDetails: IProject;
    savingNewProjectIsExecuting: boolean;
}

const StateContext = createContext({} as IStateContextProps);

export default StateContext;
