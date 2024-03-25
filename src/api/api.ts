import axios from 'axios';

export const test = {
  getSomething: async (id: number): Promise<unknown> => {
    const { data } = await axios.get("/some-domain.com/api", { params: { id }});
    return data;
  }
}