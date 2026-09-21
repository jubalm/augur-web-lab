export const labOnly = import.meta.env.PUBLIC_LAB_ONLY === '1';
export const labPath = (path = '') => `${labOnly ? '' : '/lab'}/${path}`;
