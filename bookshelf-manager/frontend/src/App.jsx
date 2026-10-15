import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import './App.css';
import BookForm from './components/BookForm';
import BookList from './components/BookList';

const API_URL = 'https://backend-pink-two-41.vercel.app/books';

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setBooks(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching books:', error);
        toast.error('Failed to load books');
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // Add Book
  const handleAddBook = async (bookData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData),
      });
      const newBook = await response.json();

      if (response.ok) {
        setBooks((prev) => [newBook, ...prev]);
        toast.success('Book added successfully!');
      } else {
        toast.error(newBook.error || 'Failed to add book');
      }
    } catch (error) {
      console.error('Error adding book:', error);
      toast.error('Failed to add book');
    }
  };

  // Delete Book
  const handleDeleteBook = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBooks((prev) => prev.filter((book) => book.id !== id));
        toast.success('Book deleted');
      } else {
        toast.error('Failed to delete book');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      toast.error('Failed to delete book');
    }
  };

  // Toggle Read Status
  const handleToggleRead = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
      });
      const updatedBook = await response.json();

      if (response.ok) {
        setBooks((prev) =>
          prev.map((book) => (book.id === id ? updatedBook : book))
        );
        toast.success('Status updated!');
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating book status:', error);
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/40 to-violet-50 pb-16">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-indigo-100 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-200">
              <span className="text-xl">📚</span>
            </div>
            <div>
              <span className="font-bold text-xl text-gray-900 tracking-tight">
                BookShelf
              </span>
              <p className="text-xs text-indigo-500 font-medium -mt-0.5">
                Personal Reading Journey
              </p>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            BookShelf Manager
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Track, organize & celebrate your reading journey
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl shadow-indigo-100/50 border border-indigo-50 p-6 lg:sticky lg:top-24">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <span className="text-lg">✨</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800">Add New Book</h2>
            </div>
            <BookForm onAddBook={handleAddBook} />
          </div>

          {/* List Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl shadow-indigo-100/50 border border-indigo-50 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center">
                  <span className="text-lg">📖</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800">Your Books</h2>
              </div>
              {!loading && books.length > 0 && (
                <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                  {books.length} {books.length === 1 ? 'book' : 'books'}
                </span>
              )}
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin mb-4" />
                <p>Loading your shelf...</p>
              </div>
            ) : (
              <BookList
                books={books}
                onDelete={handleDeleteBook}
                onToggleRead={handleToggleRead}
              />
            )}
          </div>
        </div>
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: '12px',
            background: '#1e1b4b',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#a78bfa',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
}

export default App;