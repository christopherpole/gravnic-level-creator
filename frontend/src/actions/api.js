export const RETRIEVE_LEVELS_PENDING = 'RETRIEVE_LEVELS_PENDING';
export const RETRIEVE_LEVELS_FULFILLED = 'RETRIEVE_LEVELS_FULFILLED';
export const RETRIEVE_LEVELS_REJECTED = 'RETRIEVE_LEVELS_REJECTED';
export const CREATE_LEVEL_PENDING = 'CREATE_LEVEL_PENDING';
export const CREATE_LEVEL_FULFILLED = 'CREATE_LEVEL_FULFILLED';
export const CREATE_LEVEL_REJECTED = 'CREATE_LEVEL_REJECTED';
export const UPDATE_LEVEL_PENDING = 'UPDATE_LEVEL_PENDING';
export const UPDATE_LEVEL_FULFILLED = 'UPDATE_LEVEL_FULFILLED';
export const UPDATE_LEVEL_REJECTED = 'UPDATE_LEVEL_REJECTED';
export const UPDATE_LEVELS_PENDING = 'UPDATE_LEVELS_PENDING';
export const UPDATE_LEVELS_FULFILLED = 'UPDATE_LEVELS_FULFILLED';
export const UPDATE_LEVELS_REJECTED = 'UPDATE_LEVELS_REJECTED';
export const DELETE_LEVEL_PENDING = 'DELETE_LEVEL_PENDING';
export const DELETE_LEVEL_FULFILLED = 'DELETE_LEVEL_FULFILLED';
export const DELETE_LEVEL_REJECTED = 'DELETE_LEVEL_REJECTED';

export const retrieveLevelsPending = () => ({
  type: RETRIEVE_LEVELS_PENDING,
});

export const retrieveLevelsFulfilled = levels => ({
  type: RETRIEVE_LEVELS_FULFILLED,
  levels,
});

export const retrieveLevelsRejected = error => ({
  type: RETRIEVE_LEVELS_REJECTED,
  error,
});

export const createLevelPending = level => ({
  type: CREATE_LEVEL_PENDING,
  level,
});

export const createLevelFulfilled = (oldLevel, newLevel) => ({
  type: CREATE_LEVEL_FULFILLED,
  oldLevel,
  newLevel,
});

export const createLevelRejected = error => ({
  type: CREATE_LEVEL_REJECTED,
  error,
});

export const updateLevelPending = level => ({
  type: UPDATE_LEVEL_PENDING,
  level,
});

export const updateLevelFulfilled = level => ({
  type: UPDATE_LEVEL_FULFILLED,
  level,
});

export const updateLevelRejected = error => ({
  type: UPDATE_LEVEL_REJECTED,
  error,
});

export const updateLevelsPending = levels => ({
  type: UPDATE_LEVELS_PENDING,
  levels,
});

export const updateLevelsFulfilled = levels => ({
  type: UPDATE_LEVELS_FULFILLED,
  levels,
});

export const updateLevelsRejected = error => ({
  type: UPDATE_LEVELS_REJECTED,
  error,
});

export const deleteLevelPending = level => ({
  type: DELETE_LEVEL_PENDING,
  level,
});

export const deleteLevelFulfilled = level => ({
  type: DELETE_LEVEL_FULFILLED,
  level,
});

export const deleteLevelRejected = error => ({
  type: DELETE_LEVEL_REJECTED,
  error,
});
