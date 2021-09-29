import { createContext } from 'react';

interface IDispatchContextProps {
    ({ type, value }: { type: string; value?: any }): void;
}

const DispatchContext = createContext({} as IDispatchContextProps);

export default DispatchContext;
