import React, { createContext, useContext } from "react";

export default function createCustomContext<S, P>(state: S, dispatch: P) {
  const CustomStateContext = createContext<S>(state);
  const CustomStateDispatchContext = createContext<P>(dispatch);

  function CustomStateProvider({
    children,
    state,
    dispatch,
  }: {
    children: React.ReactNode;
    state: S;
    dispatch: P;
  }) {
    return (
      <CustomStateContext.Provider value={state}>
        <CustomStateDispatchContext.Provider value={dispatch}>
          {children}
        </CustomStateDispatchContext.Provider>
      </CustomStateContext.Provider>
    );
  }

  function useCustomState() {
    return useContext(CustomStateContext);
  }

  function useCustomStateDispatch() {
    return useContext(CustomStateDispatchContext);
  }

  return {
    CustomStateContext,
    CustomStateDispatchContext,
    CustomStateProvider,
    useCustomState,
    useCustomStateDispatch,
  };
}
