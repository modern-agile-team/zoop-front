import { create } from 'zustand';

type State = {
  count: number;
};

type Action = {
  setCount: (count: number) => void;
};

export const useLobbyAccountStore = create<State & Action>()((set) => ({
  count: 1,
  setCount: (count) => set({ count }),
}));
