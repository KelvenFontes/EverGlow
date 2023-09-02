// ButtonStateContext.tsx

'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

type ButtonState = 'home' | 'explore' | 'library';

interface ButtonStateContextType {
  activeButton: ButtonState;
  setActiveButton: (button: ButtonState) => void;
}

const ButtonStateContext = createContext<ButtonStateContextType | undefined>(undefined);

export function ButtonStateProvider({ children }: { children: ReactNode }) {
  const [activeButton, setActiveButton] = useState<ButtonState>('home');

  return (
    <ButtonStateContext.Provider value={{ activeButton, setActiveButton }}>
      {children}
    </ButtonStateContext.Provider>
  );
}

export function useButtonState() {
  const context = useContext(ButtonStateContext);
  if (context === undefined) {
    throw new Error('useButtonState must be used within a ButtonStateProvider');
  }
  return context;
}
