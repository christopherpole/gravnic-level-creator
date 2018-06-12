import { makeActionCreator } from 'utils';

const requestTypes = ['PENDING', 'FULFILLED', 'REJECTED'];

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
export const FIND_QUICKEST_SOLUTION = createRequestTypes('FIND_QUICKEST_SOLUTION');

export const retrieveLevels = createRequestActions(RETRIEVE_LEVELS);
export const createLevel = createRequestActions(CREATE_LEVEL);
export const updateLevel = createRequestActions(UPDATE_LEVEL);
export const updateLevels = createRequestActions(UPDATE_LEVELS);
export const deleteLevel = createRequestActions(DELETE_LEVEL);
export const findQuickestSolution = createRequestActions(FIND_QUICKEST_SOLUTION);
