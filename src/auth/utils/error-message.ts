// ----------------------------------------------------------------------

import { AxiosError } from 'axios';

export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    console.log('Error of AxiosError type.');
    return error.message || error.name || 'An error occurred';
  }

  if (error instanceof Error) {
    console.log('Error of Error type.');
    return error.message || error.name || 'An error occurred';
  }

  if (typeof error === 'string') {
    console.log('Error of String type.');
    return error;
  }

  if (typeof error === 'object' && error !== null) {
    console.log('Error of Object type.');
    const errorMessage = (error as { message?: string }).message;
    if (typeof errorMessage === 'string') {
      return errorMessage;
    }
  }

  return `Unknown error: ${error}`;
}
