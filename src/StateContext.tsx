import { createContext } from 'react';

interface IStateContextProps {
  isEditMode: boolean;
  projectDetailsModalOpen: boolean;
  projectDetails: object;
}

const StateContext = createContext({} as IStateContextProps);

export default StateContext;
