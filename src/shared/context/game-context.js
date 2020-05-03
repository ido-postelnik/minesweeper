import { createContext } from 'react';

export const GameContext = createContext({
  gameSettings: {},
  onStartNewGame: () => {},
  isSupermanMode: false,
  onSupermanMode: () => { }
});