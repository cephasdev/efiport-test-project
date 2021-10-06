import { createContext } from 'react';
import { IDispatchContextProps } from './TypedInterfaces';

const DispatchContext = createContext({} as IDispatchContextProps);

export default DispatchContext;
