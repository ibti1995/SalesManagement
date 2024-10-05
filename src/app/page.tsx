/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Table from 'src/components/table';
import SubmitButton from 'src/components/button';
import Link from 'next/link';

import { useFetchSales } from 'src/hooks/fetchData';

import { useRouter } from 'next/navigation';
import { deleteSalesDocument } from 'src/services/apiCall';

 export default function Index() {
  const { sales, refetch } = useFetchSales();
   const router = useRouter();


 
  const columns = [
    { accessor: 'customer', Header: 'customer' },
    { accessor: 'product', Header: 'product' },
    { accessor: 'quantity', Header: 'quantity' },
    { accessor: 'totalAmount', Header: 'totalAmount' },
  ];
  const handleDelete = async (id: string) => {
    deleteSalesDocument(id)
      .then(async (response) => await refetch())
      .catch((error: any) => console.error('Error deleting document:', error));
  };

  const handleUpdate = (id: string) => {
    router.push(`/update/${id}`);
  };

  return (
    <div className="m-md-10 m-sm-2 p-5 ">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-semibold">Sales List</h2>
        <Link href="/add-sales">
          <SubmitButton
            classname="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            label="Add Sale"
          />
        </Link>
      </div>
      <div>
        <Table
          data={sales || []}
          columns={columns}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      </div>
    </div>
  );
}
