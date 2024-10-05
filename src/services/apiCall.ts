/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  doc,
  deleteDoc,
  updateDoc,
  addDoc,
  collection,
 
} from 'firebase/firestore';
import { database, app } from './firebase';
import { SalesFormValues } from 'src/types/formTypes';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
 
export const signInUser = async (email: string, password: string) => {
  try {
    const credential = await signInWithEmailAndPassword(getAuth(app), email, password);
    const idToken = await credential.user.getIdToken();
    return idToken;
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const registerUser = async (email: string, password: string) => {
  const auth = getAuth(app);
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    return response.user;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
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
