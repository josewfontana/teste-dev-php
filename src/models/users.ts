export type person = 'person' | 'company';

export interface Users {
  id: string;
  type: person;
  name: string;
  document: string;
  address: string;
  zipCode: string;
  state: string;
  country: string;
}