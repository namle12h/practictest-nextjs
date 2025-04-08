"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function Post() {
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true); // Thêm loading state

  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/posts");
        console.log(response.data); // Log the response data to check the structure
        setPosts(response.data.data); // Assuming the API returns data in the 'data' key
      } catch (error: any) {
        console.error("Error fetching posts:", error);
        setError("Unable to fetch posts.");
      } finally {
        setLoading(false); // Đảm bảo loading sẽ tắt khi API đã được gọi xong
      }
    };
    fetchPosts();
  }, []);

  // Nếu đang tải dữ liệu, hiển thị thông báo loading
  if (loading) {
    return <div className="text-center text-gray-600">Loading posts...</div>;
  }

  return (
    <div className="max-w-8xl mx-auto p-8">
      <h1 className="text-4xl font-semibold text-gray-900 mb-6">Post List</h1>

      {/* Display error message if fetching fails */}
      {error && <p className="text-red-600">{error}</p>}

      {/* Display no posts message if posts list is empty */}
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {posts.map((post) => (
            <div key={post._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                {/* Display image from API */}
                {post.image && (
                  <img
                    // src={post.image} // Đã có URL đầy đủ, không cần phải thêm localhost:8080 nữa
                    src={post.image}
                    alt={post.title}
                    className="w-full h-64 object-cover"
                  />
                )}

                <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-4">
                  <span className="block">{new Date(post.date).toLocaleDateString()}</span>
                  <span className="block text-sm">01 min read</span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  <Link href={`/post/${post._id}`}>{post.title}</Link>
                </h2>
                <p className="text-gray-600 mt-2">{post.description}</p>
                <Link href={`/post/${post._id}`} className="text-blue-600 mt-4 inline-block">
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
