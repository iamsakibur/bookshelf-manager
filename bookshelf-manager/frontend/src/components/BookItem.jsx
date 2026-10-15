import { FaCheckCircle, FaUndo, FaTrash, FaBookOpen } from 'react-icons/fa';

const BookItem = ({ book, onDelete, onToggleRead }) => {
  const isRead = book.status === 'read';

  return (
    <div
      className={`group flex items-center justify-between gap-4 p-4 rounded-2xl border transition-all duration-300
        ${
          isRead
            ? 'bg-gradient-to-r from-emerald-50/80 to-white border-emerald-100 hover:border-emerald-200'
            : 'bg-white border-gray-100 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-50'
        }`}
    >
      {/* Left */}
      <div className="flex items-start gap-4 min-w-0">
        <div
          className={`mt-0.5 flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-colors
            ${
              isRead
                ? 'bg-emerald-100 text-emerald-600'
                : 'bg-indigo-100 text-indigo-600 group-hover:bg-indigo-200'
            }`}
        >
          {isRead ? (
            <FaCheckCircle className="text-lg" />
          ) : (
            <FaBookOpen className="text-lg" />
          )}
        </div>

        <div className="min-w-0">
          <h3
            className={`font-semibold text-base leading-snug transition-all
              ${isRead ? 'line-through text-gray-400' : 'text-gray-800'}`}
          >
            {book.title}
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">by {book.author}</p>

          <span
            className={`inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 text-xs font-semibold rounded-full
              ${
                isRead
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-amber-100 text-amber-700'
              }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isRead ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
            />
            {isRead ? 'Read' : 'Unread'}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => onToggleRead(book.id)}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl transition-all
            ${
              isRead
                ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm shadow-emerald-200'
            }`}
          title={isRead ? 'Mark as Unread' : 'Mark as Read'}
        >
          {isRead ? <FaUndo className="text-xs" /> : <FaCheckCircle className="text-xs" />}
          <span className="hidden sm:inline">
            {isRead ? 'Unread' : 'Read'}
          </span>
        </button>

        <button
          onClick={() => onDelete(book.id)}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl
                     bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all"
          title="Delete Book"
        >
          <FaTrash className="text-xs" />
          <span className="hidden sm:inline">Delete</span>
        </button>
      </div>
    </div>
  );
};

export default BookItem;