import {User} from './user';

export type Product = {
  _id: string;
  barcode: string;
  productImageURL: string;
  ingredientImageURL: string;
  description: string;
  isHalal?: boolean;
  verifiedBy?: User;
};
