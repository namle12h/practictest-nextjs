"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function Blog() {
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  const [newPost, setNewPost] = useState({
    title: "",
    keyword: "",
    description: "",
    content: "",
    date: "",
    image: null as File | null,  // Kiểu dữ liệu của image là File hoặc null
  });

  const [loading, setLoading] = useState(false);

  // Hàm xử lý thay đổi giá trị trong form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  // Hàm xử lý thay đổi ảnh trong form
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewPost({ ...newPost, image: e.target.files[0] });
    }
  };

  // Hàm thêm bài viết
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", newPost.title);
    formData.append("keyword", newPost.keyword);
    formData.append("description", newPost.description);
    formData.append("content", newPost.content);
    formData.append("date", newPost.date);
    if (newPost.image) {
      formData.append("image", newPost.image);  // Đảm bảo file ảnh được thêm vào FormData
    }

    try {
      const response = await axios.post("http://localhost:8080/api/v1/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",  // Cần sử dụng multipart/form-data khi gửi file
        },
      });
      setPosts([response.data.data, ...posts]); // Thêm bài viết mới vào danh sách
      setNewPost({
        title: "",
        keyword: "",
        description: "",
        content: "",
        date: "",
        image: null,
      }); // Reset form
      alert("Post added successfully!");
    } catch (error) {
      setError("Unable to add post.");
      console.error("Error adding post:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/posts");
        setPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Unable to fetch posts.");
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="max-w-8xl mx-auto p-8">
      <h1 className="text-4xl font-semibold text-gray-900 mb-6">Blog Posts</h1>
      <div className="mb-6">
        <h2 className="text-3xl font-semibold">Add New Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={newPost.title}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium">Keyword</label>
            <input
              type="text"
              name="keyword"
              value={newPost.keyword}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium">Description</label>
            <textarea
              name="description"
              value={newPost.description}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-lg font-medium">Content</label>
            <textarea
              name="content"
              value={newPost.content}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-lg font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={newPost.date}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              accept="image/*"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Post"}
            </button>
          </div>
        </form>
      </div>

      {/* Display posts */}
      {error && <p className="text-red-600">{error}</p>}
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {posts.map((post) => (
            <div key={post._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-4">
                  <span className="block">{new Date(post.date).toLocaleDateString()}</span>
                  <span className="block text-sm">01 min read</span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  <Link href={`/blog/${post._id}`}>{post.title}</Link>
                </h2>
                <p className="text-gray-600 mt-2">{post.description}</p>
                <Link href={`/blog/${post._id}`} className="text-blue-600 mt-4 inline-block">
                  Read more
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
