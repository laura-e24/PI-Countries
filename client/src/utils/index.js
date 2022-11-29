export const sortArr = (array, order, key) => {

  return array.sort((a, b) => {
    if (order === 'asc') {
      if (a[key] === b[key]) return 0;
      
      if (a[key] < b[key]) return -1;
    
      return 1;
    } else if (order === 'desc') {
      if (a[key] === b[key])  return 0;
      
      if (a[key] < b[key]) return 1;
      
      return -1;
    } else return array;
  })
}

export const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);