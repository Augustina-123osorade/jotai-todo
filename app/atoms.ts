import {atom} from 'jotai';
import { TodoItem } from './types';

export const inputAtom = atom<string>(''); // atom for the input field
export const todoAtom = atom<TodoItem[]>([]); // atom for the list of todos
export const isModalOpenAtom = atom<boolean>(false); // atom for modal open/close state
export const editTodoIdAtom = atom<string | null>(null);// to store id of todo being edited
export const editInputAtom = atom<string>(''); // to store the text being edited