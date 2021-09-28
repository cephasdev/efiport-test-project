import { createContext } from 'react';

interface IDispatchContextProps {
  //   //   type: string;
  //   //   value: any;
  //   dispatch: ({ type }: { type: string }) => void;
  ({ type, value }: { type: string; value?: any }): void;
}

const DispatchContext = createContext({} as IDispatchContextProps);

export default DispatchContext;
