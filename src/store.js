import { writable } from 'svelte/store';
// for storing the json data 
export const questionAnswerData=writable([])
// to store how many question are attempted
export const attemptQuestion = writable(0);
// to store only correct answer
export const correctAnswer=writable(0)
// for storing incorrect answer
export const incorrectAnswer=writable(0)
// which question and answer are selected by user are store here
export const answerCheckedByUser=writable([])
// show dashboard button instead of end button on revew page
export const reviewNavigator=writable(false)
// binding queston with kits answer
export const chooseAns=writable([])