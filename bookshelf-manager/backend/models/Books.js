import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Title is required"], trim: true }, author: { type: String, required: [true, "Author is required"], trim: true },
  status: { type: String, enum: ["unread", "read"], default: "unread" },
  createdAt: { type: Date, default: Date.now },
})
// Return _id as id and hide __v -> { id, title, author, status, createdAt }
bookSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const Books = mongoose.model("Book", bookSchema);