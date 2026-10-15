import { useState } from 'react';

const BookForm = ({ onAddBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;

    setIsSubmitting(true);
    await onAddBook({ title: title.trim(), author: author.trim() });
    setTitle('');
    setAuthor('');
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Title */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Book Title <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Atomic Habits"
          required
          className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                     transition-all placeholder:text-gray-400"
        />
      </div>

      {/* Author */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Author <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="e.g. James Clear"
          required
          className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                     transition-all placeholder:text-gray-400"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 
                   bg-gradient-to-r from-indigo-600 to-violet-600 
                   hover:from-indigo-700 hover:to-violet-700 
                   text-white font-semibold text-sm py-3 px-4 rounded-xl 
                   shadow-lg shadow-indigo-200 hover:shadow-indigo-300
                   transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Adding...
          </>
        ) : (
          <>
            <span>＋</span>
            Add to Shelf
          </>
        )}
      </button>
    </form>
  );
};

export default BookForm;