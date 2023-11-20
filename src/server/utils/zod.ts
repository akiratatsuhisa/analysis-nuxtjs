import _ from 'lodash';

export const transformQuery = (query: any) => {
  if (!_.isObject(query) || _.isArray(query)) {
    return;
  }

  const obj: Record<string, any> = query;

  _.forEach(_.keys(obj), (key) => {
    if (/^\w+\[\]$/.test(key)) {
      const value = obj[key];
      obj[key.replace(/\[\]$/, '')] =
        typeof value === 'string' ? [value] : value;
      delete obj[key];
    }
  });
};
