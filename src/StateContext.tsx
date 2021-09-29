import { createContext } from 'react';
import { IStateContextProps } from './TypedInterfaces';

const StateContext = createContext({} as IStateContextProps);

export default StateContext;
