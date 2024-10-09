import React, { useState, useEffect } from 'react';
import BookDataService from '../services/book.services';
import '../index.css';

const AddBook = ({ id, setBookId }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('Available');
  const [flag, setFlag] = useState(true);
  const [message, setMessage] = useState({ error: false, msg: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (title === '' || author === '') {
      setMessage({ error: true, msg: 'All fields are mandatory!' });
      return;
    }
    const newBook = {
      title,
      author,
      status,
    };
    console.log(newBook);

    try {
      if (id !== undefined && id !== '') {
        await BookDataService.updateBook(id, newBook);
        setBookId('');
        setMessage({ error: false, msg: 'Updated successfully!' });
      } else {
        await BookDataService.addBooks(newBook);
        setMessage({ error: false, msg: 'New Book added successfully!' });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setTitle('');
    setAuthor('');
  };

  const editHandler = async () => {
    setMessage('');
    try {
      const docSnap = await BookDataService.getBook(id);
      console.log('the record is :', docSnap.data());
      setTitle(docSnap.data().title);
      setAuthor(docSnap.data().author);
      setStatus(docSnap.data().status);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log('The id here is : ', id);
    if (id !== undefined && id !== '') {
      editHandler();
    }
  }, [id]);

  return (
    <div className="p-4 border rounded-md">
      {message?.msg && <div className={`p-2 mb-4 text-white ${message.error ? 'bg-red-500' : 'bg-teal-600'} rounded`}>{message.msg}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="block text-sm font-bold text-gray-700">
            Book Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-teal-600"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="author" className="block text-sm font-bold text-gray-700 ">
            Book Author
          </label>
          <input
            type="text"
            id="author"
            placeholder="Book Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-teal-600"
          />
        </div>

        <div className="mb-3 flex space-x-2">
          <button
            disabled={flag}
            className={`flex-1 text-sm md:text-base ${status === 'Available' ? 'bg-teal-700' : 'bg-teal-600'} hover:bg-teal-700 text-white font-bold py-2 rounded`}
            onClick={() => {
              setStatus('Available');
              setFlag(true);
            }}
          >
            Available
          </button>
          <button
            disabled={!flag}
            className={`flex-1 text-sm md:text-base ${status === 'Not Available' ? 'bg-teal-700' : 'bg-teal-600'}  text-white font-bold py-2 rounded`}
            onClick={() => {
              setStatus('Not Available');
              setFlag(false);
            }}
          >
            Not Available
          </button>
        </div>

        <div className="mt-4">
          <button type="submit" className="w-full text-base bg-teal-600  text-white font-bold py-2 rounded">
            Add/ Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
