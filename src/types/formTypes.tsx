/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorOption } from 'react-hook-form';

export interface Sales {
  id: string;
  customer?: string;
  product?: string;
  quantity?: number;
  totalAmount?: number;
}
export type InputType = {
  type: string;
  placeholder: string;
  label: string;
  name: string;
  register: any;
  error: undefined | ErrorOption;
};

export type CustomButtonType = {
  label: string;
  classname: string;
};

export type TableType = {
  columns: { Header: string; accessor: string }[];
  data: Sales[];
  handleDelete: (id: string) => Promise<void>; // Function that takes a string ID and returns a Promise
  handleUpdate: (id: string) => void; // Function that takes a string ID and returns nothing (void)
};
export type SalesFormValues = Omit<Sales, 'id'>;