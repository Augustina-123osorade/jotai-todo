import { atom } from 'jotai'


export const todoAtom = atom([
  {
    text: 'clean my room',
    id: 1,
    completed: true
  },
  {
    text: 'call mom',
    id: 2,
    completed: false
  },
  {
    text: 'learn Jotai',
    id: 3,
    completed: false
  }
])