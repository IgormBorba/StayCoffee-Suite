import { Api } from './api';

async function updateMethod(route: any, values: any) {
  try {
    if (values) {
      await Api.patch(route, values);
    }
  } catch (error) {
    console.error('Error submitting data:', error);
  }
}

export default updateMethod;
