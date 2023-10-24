import { Api } from './api';

async function createMethod(route: any, values: any) {
  try {
    if (values) {
      await Api.post(route, values);
    }
  } catch (error) {
    console.error('Error submitting data:', error);
  }
}

export default createMethod;
