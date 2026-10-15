import BookItem from './BookItem';

const BookList = ({ books, onDelete, onToggleRead }) => {
  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center mb-5">
          <span className="text-4xl">📚</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-1">
          Your shelf is empty
        </h3>
        <p className="text-sm text-gray-500 max-w-xs">
          Add your first book using the form on the left and start tracking your reading journey!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {books.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          onDelete={onDelete}
          onToggleRead={onToggleRead}
        />
      ))}
    </div>
  );
};

export default BookList;