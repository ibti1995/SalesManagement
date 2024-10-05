/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { TableType } from 'src/types/formTypes';
import editIcon from 'src/assets/edit.svg';
import deleteIcon from 'src/assets/trash.svg';
import Image from 'next/image';
const Table = ({ columns, data, handleDelete, handleUpdate }: TableType) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                className="py-2 px-4 border-b border-gray-200 text-left text-gray-600"
              >
                {column.Header}
              </th>
            ))}
            <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600">
              Actions
            </th>
            {/* Added actions column */}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((row: any, rowIndex: number) => (
              <tr key={rowIndex} className="even:bg-gray-50">
                {columns.map((column, indexCol) => (
                  <td
                    key={`col-${indexCol}`}
                    className="py-2 px-4 border-b border-gray-200 text-gray-800"
                  >
                    {row[column.accessor]}
                  </td>
                ))}
                <td className="py-2 px-4 border-b border-gray-200 text-gray-800">
                  <button
                    onClick={() => handleUpdate(row.id)}
                    className="mr-2 text-blue-500"
                  >
                   <Image src={editIcon} alt='edit'/>
                  </button>
                  <button
                    onClick={() => handleDelete(row.id)}
                    className="text-red-500"
                  >
                   <Image src={deleteIcon} alt='delete'/>
                   </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
