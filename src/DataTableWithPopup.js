import React, { useState } from 'react';
import { useTable } from 'react-table';
import Modal from 'react-modal';

const DataTableWithPopup = () => {
  const [data, setData] = useState([
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Smith', age: 30 },
    { id: 3, name: 'Bob Johnson', age: 35 }
  ]);

  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [updatedValue, setUpdatedValue] = useState('');

  const columns = React.useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Age', accessor: 'age' },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <button onClick={() => handleEdit(row)}>Edit</button>
        )
      }
    ],
    []
  );

  const handleEdit = (row) => {
    setSelectedRow(row.original);
    setUpdatedValue(row.original.name);
    setModalOpen(true);
  };

  const handleUpdate = () => {
    const updatedData = data.map((row) =>
      row.id === selectedRow.id ? { ...row, name: updatedValue } : row
    );
    setData(updatedData);
    setModalOpen(false);
  };

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div>
      <table {...getTableProps()} style={{ border: 'solid 1px black' }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} style={{ padding: '10px' }}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} style={{ padding: '10px' }}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={{
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
          content: { width: '300px', margin: 'auto', textAlign: 'center' }
        }}
      >
        <h2>Edit Name</h2>
        <input
          type="text"
          value={updatedValue}
          onChange={(e) => setUpdatedValue(e.target.value)}
        />
        <br />
        <button onClick={handleUpdate}>Update</button>
      </Modal>
    </div>
  );
};

export default DataTableWithPopup;
