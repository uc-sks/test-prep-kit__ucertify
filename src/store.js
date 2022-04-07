import { writable } from 'svelte/store';
// for storing the json data 
export const question_data=writable([])// for storing the json data 
export const choose_ans=writable([])//choose answer with bind
export const review_navi=writable(false)// navigator for review page
export const answerchoosebyuser = writable([])// collection the index of option check by user (a,b,c,d)
export const actualcorrect=writable([])// collecting the index of actual correct option from json data