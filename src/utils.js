import _ from 'lodash';
import { Base64 } from 'js-base64';


export const encodeQuery = (query) => {
  return _.isObject(query) ? Base64.encode(JSON.stringify(query)) : query;
};
