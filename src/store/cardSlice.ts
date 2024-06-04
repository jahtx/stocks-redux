// cardSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Card {
  header: string;
  body: string;
  footer: string;
}

interface CardsState {
  cards: Card[];
}

const initialState: CardsState = {
  cards: [
    {
      header: 'Alpha Beta',
      body: 'Lorem ipsum dolor sit amet',
      footer: 'Alpha Beta',
    },
    {
      header: 'Gamma Delta',
      body: 'Consectetur adipiscing elit',
      footer: 'Gamma Delta',
    },
    {
      header: 'Epsilon Zeta',
      body: 'Sed do eiusmod tempor',
      footer: 'Epsilon Zeta',
    },
    {
      header: 'Eta Theta',
      body: 'Incididunt ut labore et',
      footer: 'Eta Theta',
    },
    {
      header: 'Iota Kappa',
      body: 'Dolore magna aliqua ut',
      footer: 'Iota Kappa',
    },
    { header: 'Lambda Mu', body: 'Enim ad minim veniam', footer: 'Lambda Mu' },
    { header: 'Nu Xi', body: 'Quis nostrud exercitation', footer: 'Nu Xi' },
    {
      header: 'Omicron Pi',
      body: 'Ullamco laboris nisi ut',
      footer: 'Omicron Pi',
    },
    { header: 'Rho Sigma', body: 'Aliquip ex ea commodo', footer: 'Rho Sigma' },
    {
      header: 'Tau Upsilon',
      body: 'Consequat duis aute irure',
      footer: 'Tau Upsilon',
    },
    { header: 'Phi Chi', body: 'Dolor in reprehenderit in', footer: 'Phi Chi' },
    {
      header: 'Psi Omega',
      body: 'Voluptate velit esse cillum',
      footer: 'Psi Omega',
    },
  ],
};

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
});

export default cardSlice.reducer;
