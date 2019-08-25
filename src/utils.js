// intersection of 2 arrays
const intersection = (prevArr, actualArr) => {
  return prevArr.filter(id => actualArr.includes(id));
};

//join 2 arrays
const join = (prevArr, actualArr) => [...prevArr, ...actualArr];

// accepts a value an array of functions to transform the value
export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

// intersection of n arrays
export const intersectionOfArrays = (firstArray, ...arrays) => {
  if (Array.isArray(arrays)) return arrays.reduce(intersection, firstArray);
  else if (Array.isArray(firstArray)) return firstArray;
  else return [];
};

// join n arrays
export const unionOfArrays = (...arrays) => {
  const allItems = arrays.reduce(join, []);
  return [...new Set(allItems)];
};

export const initObj = props => {
  return props.reduce((obj, prop) => {
    return {
      ...obj,
      [prop]: {}
    };
  }, {});
};

export const appendToKey = (type, key, id) => obj => {
  if (obj && obj[type] && obj[type][key]) {
    return {
      ...obj,
      [type]: {
        ...obj[type],
        [key]: [...obj[type][key], id]
      }
    };
  } else
    return {
      ...obj,
      [type]: {
        ...obj[type],
        [key]: [id]
      }
    };
};

export const accumToKey = (key, data) => obj => {
  if (obj && obj[key]) {
    return {
      ...obj,
      [key]: [...obj[key], data]
    };
  }
  return {
    ...obj,
    [key]: [data]
  };
};
