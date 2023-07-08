import axios from 'axios';
import queryString from 'query-string';
import { SubmarineInterface, SubmarineGetQueryInterface } from 'interfaces/submarine';
import { GetQueryInterface } from '../../interfaces';

export const getSubmarines = async (query?: SubmarineGetQueryInterface) => {
  const response = await axios.get(`/api/submarines${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createSubmarine = async (submarine: SubmarineInterface) => {
  const response = await axios.post('/api/submarines', submarine);
  return response.data;
};

export const updateSubmarineById = async (id: string, submarine: SubmarineInterface) => {
  const response = await axios.put(`/api/submarines/${id}`, submarine);
  return response.data;
};

export const getSubmarineById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/submarines/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSubmarineById = async (id: string) => {
  const response = await axios.delete(`/api/submarines/${id}`);
  return response.data;
};
