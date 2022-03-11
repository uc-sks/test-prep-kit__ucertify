import { writable } from 'svelte/store';
export const questionAnswerData=writable([])
export const attemptQuestion = writable(0);
export const correctAnswer=writable(0)
export const incorrectAnswer=writable(0)
export const answerCheckedByUser=writable([])
export const reviewNavigator=writable(false)