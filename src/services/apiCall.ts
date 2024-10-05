/* eslint-disable @typescript-eslint/no-explicit-any */
import { doc, deleteDoc, updateDoc, addDoc, collection } from 'firebase/firestore'; // Adjust import based on your setup
import { database } from './firebase';
import { SalesFormValues } from 'src/types/formTypes';

export const addSalesDocument = async (data: SalesFormValues) => {
  try {
    const ref = collection(database, 'sales');
    await addDoc(ref, data);
    console.log(`Document added successfully.`);
  } catch (error) {
    console.error('Error deleting document:', error);
  }
};

export const updateSalesDocument = async (id: string, data: any) => {
  try {
    const ref = doc(database, 'sales', id);
    await updateDoc(ref, data);
    console.log(`Document with id ${id} updated successfully.`);
  } catch (error) {
    console.log('Error deleting document:', error);
  }
};
export const deleteSalesDocument = async (id: string) => {
  try {
    await deleteDoc(doc(database, 'sales', id));
    console.log(`Document with id ${id} deleted successfully.`);
  } catch (error) {
    console.error('Error deleting document:', error);
  }
};
