import {apiClient} from './api-client';


export type TLoginResponse = {
  data: {
    token: string;
  };
};

export type TLoginError = {
  error: {
    message: string;
  };
};

export async function login(jwt?: string, options?: RequestInit) {
  try {
    const response = await apiClient('/.netlify/functions/auth', {body: {jwt}, ...options});
    return response;
  } catch (error: any) {
    if (error instanceof Response) {
      throw new Response('Auth error', {
        status: error.status,
        statusText: error.statusText,
      });
    } else if (('message' in error)) {
      throw new Response('Auth error', {
        status: 401,
        statusText: error.message
      });
    }
  }
}

export async function checkToken(token: string) {
  try {
    const response = await apiClient('/.netlify/functions/checkToken', {body: {token}});
    return response.data.token;
  } catch (error) {
    throw new Response('Auth error', {status: 400});

  }
}
