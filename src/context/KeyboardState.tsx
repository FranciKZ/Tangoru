import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

type KeyboardStateType = {
  useLittle: boolean;
  useModifier: boolean;
};

const initialValue: KeyboardStateType = {
  useLittle: false,
  useModifier: false,
};

type KeyboardContextValue = {
  modifiers: KeyboardStateType;
  setModifiers: Dispatch<SetStateAction<KeyboardStateType>>;
};

const KeyboardContext = createContext<KeyboardContextValue>({
  modifiers: initialValue,
  setModifiers: () => {},
});

function KeyboardProvider({ children }: { children: React.ReactNode }) {
  const [modifiers, setModifiers] = useState({
    useLittle: false,
    useModifier: false,
  });

  const keyboardValue = useMemo(
    (): KeyboardContextValue => ({
      modifiers,
      setModifiers,
    }),
    [modifiers, setModifiers]
  );

  return (
    <KeyboardContext.Provider value={keyboardValue}>
      {children}
    </KeyboardContext.Provider>
  );
}

export const useKeyboardState = () => {
  const context = useContext(KeyboardContext);
  if (context === undefined) {
    throw new Error('useGame must be used inside a GameProvider');
  }
  return context;
};

export default KeyboardProvider;
