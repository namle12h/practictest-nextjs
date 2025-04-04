"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddArticle() {
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImage(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      setMessage("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("keyword", keyword);
    formData.append("description", description);
    formData.append("content", content);
    formData.append("date", date);

    try {
      const response = await axios.post("http://localhost:8080/api/v1/articles", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Article added successfully");
      router.push(`/blog/${response.data.data._id}`);
    } catch (error) {
      setMessage("Error adding article");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold">Add New Article</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md"
        >
          Add Article
        </button>
      </form>
      {message && <p className="text-center mt-4">{message}</p>}
    </div>
  );
}
