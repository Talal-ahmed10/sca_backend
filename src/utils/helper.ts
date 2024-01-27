import { EndPointsFunc } from '../types';

export const errorLogs = (endpoint: EndPointsFunc, error: Error) => {
    console.log(`ERR [${endpoint}] ====> ${error}`);
};
