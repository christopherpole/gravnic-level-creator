const requestTypes = ['PENDING', 'FULFILLED', 'REJECTED'];

export function makeActionCreator(type, ...argNames) {
  return (...args) => {
    const action = { type };

    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });

    return action;
  };
}

export function createRequestTypes(base) {
  return requestTypes.reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

export function createRequestActions(base) {
  return requestTypes.reduce((acc, type) => {
    acc[type.toLowerCase()] = makeActionCreator(base[type], 'payload');
    return acc;
  }, {});
}

export const RETRIEVE_LEVELS = createRequestTypes('RETRIEVE_LEVELS');
export const CREATE_LEVEL = createRequestTypes('CREATE_LEVEL');
export const UPDATE_LEVEL = createRequestTypes('UPDATE_LEVEL');
export const UPDATE_LEVELS = createRequestTypes('UPDATE_LEVELS');
export const DELETE_LEVEL = createRequestTypes('DELETE_LEVEL');

export const retrieveLevels = createRequestActions(RETRIEVE_LEVELS);
export const createLevel = createRequestActions(CREATE_LEVEL);
export const updateLevel = createRequestActions(UPDATE_LEVEL);
export const updateLevels = createRequestActions(UPDATE_LEVELS);
export const deleteLevel = createRequestActions(DELETE_LEVEL);
