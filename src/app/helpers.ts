export const time = {
  seconds: (sec:number) => {
    return sec * 1000;
  },
  minutes: (min: number) => {
    return (min * 60) * 1000;
  },
  minToSec: (min: number) => {
    return min * 60;
  }
}

export const empty = (variable: any) => {

  // check undefined 
  if (typeof variable === 'undefined') {
    return true;
  
  // check for null
  } else if (variable === null) {
    return true;

  // check for empty string
  } else if (typeof variable === 'string' && variable.length === 0){
    return true;

  //check for bad number  
  } else if (typeof variable === 'number' && isNaN(variable)){
    return true;

  //check for empty object 
  } else if (typeof variable === 'object' && Object.keys(variable).length === 0){
    return true;

  //check for empty arrays 
  } else if (Array.isArray(variable) && variable.length === 0){
    return true;

  } else {
    return false;
  }
}