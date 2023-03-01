import axios from 'axios';

class ApiRequest {
  private controller: AbortController | null = null;

  request = async <T>(url: string) => {
    if (this.controller !== null) {
      this.controller.abort('Controller is not null');
      this.controller = null;
    }

    this.controller = new AbortController();

    try {
      const response: { data: T } = await axios.get(url, { signal: this.controller.signal });

      if (this.controller.signal.aborted) {
        return;
      }

      if (!response.data) {
        throw new Error('Error while fetching data');
      }

      // todo delete
      console.log('request data:', response.data);
      this.controller = null;

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}

export default ApiRequest;
