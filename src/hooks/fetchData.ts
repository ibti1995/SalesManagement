/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { Sales } from 'src/types/formTypes';
import { database } from 'src/services/firebase';
 

export const useFetchSales = () => {
  const [sales, setSales] = useState<Sales[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSales = useCallback(async () => {
    setLoading(true);
    try {
      const ref = collection(database, 'sales');
      const querySnapshot = await getDocs(ref);
      const data: Sales[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id } as Sales);
      });
       setSales(data);
    } catch (e:any) {
      setError('Error fetching sales: ' + e.message);
      console.error('Error fetching sales:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSales();
   }, [fetchSales]);

  return { sales, loading, error, refetch: fetchSales };
};
