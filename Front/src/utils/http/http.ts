import httpStatus from 'http-status';
import { v4 } from 'uuid';
import { TRACKING_ID_HEADER_KEY } from '../constants/tracking';
import { HTTP_METHODS } from './http-method';

const prefix = '/api';

const JSON_HEADER = {
  'Content-Type': 'application/json',
};

export const getTrackingHeader = () => {
  return {
    [TRACKING_ID_HEADER_KEY]: v4(),
  };
};

export const isOkStatus = (status: number) =>
  status >= httpStatus.OK && status < httpStatus.MULTIPLE_CHOICES;

export const get = (url: string, headers: any = {}) => {
  return fetch(`${prefix}${url}`, {
    method: HTTP_METHODS.GET,
    headers: {
      ...JSON_HEADER,
      ...getTrackingHeader(),
      ...headers,
    },
    credentials: 'include',
  });
};

export const post = (url: string, body: any, headers: any = {}) => {
  return fetch(`${prefix}${url}`, {
    method: HTTP_METHODS.POST,
    headers: {
      ...JSON_HEADER,
      ...getTrackingHeader(),
      ...headers,
    },
    body: JSON.stringify(body),
    credentials: 'include',
  });
};

export const put = (url: string, body: any, headers: any = {}) => {
  return fetch(`${prefix}${url}`, {
    method: HTTP_METHODS.PUT,
    headers: {
      ...JSON_HEADER,
      ...getTrackingHeader(),
      ...headers,
    },
    body: JSON.stringify(body),
    credentials: 'include',
  });
};

export const patch = (url: string, body: any = {}, headers: any = {}) => {
  return fetch(`${prefix}${url}`, {
    method: HTTP_METHODS.PATCH,
    headers: {
      ...JSON_HEADER,
      ...getTrackingHeader(),
      ...headers,
    },
    body: JSON.stringify(body),
    credentials: 'include',
  });
};

export const deleteApi = (url: string, body: any, headers: any) => {
  return fetch(`${prefix}${url}`, {
    method: HTTP_METHODS.DELETE,
    headers: {
      ...JSON_HEADER,
      ...getTrackingHeader(),
      ...headers,
    },
    body: JSON.stringify(body),
    credentials: 'include',
  });
};
