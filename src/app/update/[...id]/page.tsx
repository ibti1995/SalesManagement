/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { database } from 'src/services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Sales } from 'src/types/formTypes';
import FormComponent from 'src/components/form';

interface UpdateSalesProps {
  params: {
    id: string[];
  };
}

const UpdateSales = ({ params }: UpdateSalesProps) => {
  const [info, setInfo] = useState<Sales | undefined>();

  const fetchInfo = async () => {
    const id = params.id[0];
    if (id) {
      try {
        const res = await getDoc(doc(database, 'sales', id));
        const data = res.data();
        setInfo({
          id: id,
          ...data,
        } as Sales);
      } catch (e) {
        console.error('Error fetching data:', e);
      }
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <>
      <FormComponent data={info} />
    </>
  );
};

export default UpdateSales;
