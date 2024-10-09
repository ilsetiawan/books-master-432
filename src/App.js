import { useState } from 'react';
import AddBook from './components/AddBook';
import BooksList from './components/BooksList';
import './index.css';

function App() {
  const [bookId, setBookId] = useState('');

  const getBookIdHandler = (id) => {
    console.log('The ID of document to be edited: ', id);
    setBookId(id);
  };

  return (
    <>
      <header className="bg-teal-600 text-white py-4 px-8 flex justify-between items-center z-50 fixed right-0 left-0 top-0">
        <div className="">
          <h1 className="text-sm md:text-2xl lg:text-32xl">5220411432</h1>
          <h1 className="text-sm md:text-2xl lg:text-3xl font-bold">Muhammad Ilham Setiawan</h1>
        </div>
        <h1 className="t2ext-base md:text-2xl lg:text-3xl font-bold">Design Front-end (H)</h1>
      </header>

      <div className="w-5/6 md:w-1/2 mx-auto mt-36 md:mt-40  shadow-full shadow-teal-600 rounded-md md:rounded-lg">
        <AddBook id={bookId} setBookId={setBookId} />
      </div>

      <div className="w-full md:w-3/4 mx-auto my-10 md:mt-14 border-2 border-teal-600 rounded-lg md:shadow-full md:shadow-teal-600 md:border-none">
        <BooksList getBookId={getBookIdHandler} />
      </div>
    </>
  );
}

export default App;
