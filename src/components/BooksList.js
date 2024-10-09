import React, { useEffect, useState } from 'react';
import BookDataService from '../services/book.services';
import '../index.css'

const BooksList = ({ getBookId }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    const data = await BookDataService.getAllBooks();
    console.log(data.docs);
    setBooks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await BookDataService.deleteBook(id);
    getBooks();
  };

  return (
    <>
      <div className="w-full">
        {/* Refresh */}
        <div className="mb-4">
          <button className="px-4 py-2 text-teal-600 rounded ml-3 hover:bg-teal-100 transition mt-3 text-base md:text-2xl lg:text-3xl font-bold border-2 hover:border-teal-600" onClick={getBooks}>
            Refresh List
          </button>
        </div>
        {/* Table */}
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-teal-600">
              <th className="border border-gray-300 px-4 py-2  text-white text-xs md:text-base">#</th>
              <th className="border border-gray-300 px-4 py-2  text-white text-xs md:text-base">Book Title</th>
              <th className="border border-gray-300 px-4 py-2  text-white text-xs md:text-base">Book Author</th>
              <th className="border border-gray-300 px-4 py-2  text-white text-xs md:text-base">Status</th>
              <th className="border border-gray-300 px-4 py-2  text-white text-xs md:text-base">Action</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {books.map((doc, index) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2  text-xs md:text-base">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2  text-xs md:text-base">{doc.title}</td>
                <td className="border border-gray-300 px-4 py-2  text-xs md:text-base">{doc.author}</td>
                <td className="border border-gray-300 px-4 py-2  text-xs md:text-base">{doc.status}</td>
                <td className="border border-gray-300 px-4 py-2 text-xs md:text-base">
                  <button className="bg-sky-400 text-white rounded px-2 py-1 mr-2 hover:bg-sky-500 text-xs md:text-base" onClick={(e) => getBookId(doc.id)}>
                    Edit
                  </button>
                  <button className="bg-red-600 text-white rounded px-2 py-1 hover:bg-red-500 text-xs md:text-base mt-4" onClick={(e) => deleteHandler(doc.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BooksList;
