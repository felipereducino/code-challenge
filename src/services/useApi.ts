/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useState } from 'react';

export enum ApiMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export class ApiHeader {
  name?: string;

  value: any;

  public constructor(init?: Partial<ApiHeader>) {
    Object.assign(this, init);
  }
}

function useApi<T>(
  url: string,
  method: ApiMethod,
  body?: any,
  headers: ApiHeader[] = [],
) {
  const [responseApi, setResponseApi] = useState({
    status: null,
    loading: false,
    error: null,
    data: null,
    success: false,
  });

  const callApi = (reqBody?: any) => FetchData(reqBody);

  const getOptions = (reqBody?: any) => {
    const reqHeaders: Headers = new Headers();

    reqHeaders.set('Content-Type', 'application/json');

    reqHeaders.set('user-key', process.env.REACT_APP_USER_KEY);

    if (headers) headers.forEach((h) => reqHeaders.append(h.name!, h.value));

    let newBody = null;

    if (body) {
      if (reqBody) {
        newBody = Object.assign(body, reqBody);
      } else {
        newBody = body;
      }
    } else if (reqBody) {
      newBody = reqBody;
    }

    let options: RequestInit = {
      method,
      headers: reqHeaders,
    };

    if (method !== ApiMethod.GET) {
      options = {
        ...options,
        body: JSON.stringify(newBody) || null,
      };
    }

    return options;
  };

  const FetchData = async (
    reqBody?: any,
  ): Promise<{
    status: number;
    data: object & T;
  }> => {
    setResponseApi({ ...responseApi, loading: true });

    const options = getOptions(reqBody);

    const res = await fetch(url, options);

    let json = null;
    const statusResponse = res.status;

    try {
      if (res && statusResponse !== 204)
        json = await res
          .json()
          .then((data) => data)
          .catch(null);

      setResponseApi({
        loading: false,
        data: json,
        error: null,
        status: statusResponse,
        success: true,
      });
    } catch (e) {
      setResponseApi({
        loading: false,
        data: null,
        error: String(e),
        status: statusResponse,
        success: !!(statusResponse === 200 || 201 || 204),
      });
    }

    return { status: res.status, data: json };
  };

  return { callApi, ...responseApi };
}

export default useApi;
