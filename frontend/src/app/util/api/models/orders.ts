import { Cocktails } from './cocktails';
export interface Order {
  id: number;
  name: string;
  cocktail: Cocktails;
  dateOfOrder: number;
}
