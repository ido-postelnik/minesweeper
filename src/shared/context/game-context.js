import { createContext } from 'react';

export const GameContext = createContext({
  gameSettings: {},
  onStartNewGame: () => {},
});

// export const GameContext = createContext({
//   gameSettings: {
//     width: 1,
//     height: 2,
//     mines: 3,
//   },
//   onStartNewGame: () => {}
// });
