/*
   Sort list by alphabet.
 */
export const sortByAlphabet = (list, sortProp) => [...list].sort((a, b) => a[sortProp].localeCompare(b[sortProp]));
