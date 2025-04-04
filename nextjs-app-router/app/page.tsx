

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import SimpleSlider from "@/ui/Slider";

export default function Home() {
  const router = useRouter();
  const [articles, setArticles] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  const imageArray = [
    "apple.jpg",
    "newandroi.png",
    "googlepx6.jpg",
    "ios15.jpg",
    "maxresdefault.jpg"
  ];


  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imageArray.length);
    return `/images/${imageArray[randomIndex]}`;
  };
  // Lấy dữ liệu bài viết từ API khi trang được load
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/articles");
        console.log(response.data);  // Kiểm tra phản hồi dữ liệu từ API
        setArticles(response.data.data); // Lưu danh sách bài viết vào state
      } catch (error) {
        console.error("Error fetching articles:", error);
        setError("Unable to fetch articles."); // Thêm thông báo lỗi khi có sự cố
      }
    };
    fetchArticles();
  }, []);


  return (
    
    <div className="max-w-8xl mx-auto p-8">
         <SimpleSlider></SimpleSlider>
      <h1 className="text-4xl font-semibold text-gray-900 mb-6 pt-3">New Feed</h1>
      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {articles.map((article) => (
            <div key={article._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                {/* Sử dụng dynamic image từ `article.imageUrl` */}
                <img
                   src={getRandomImage()}
                  alt={article.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-4">
                  <span className="block">{article.date}</span>
                  <span className="block text-sm">01 min read</span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  <Link href={`/blog/${article._id}`}>{article.title}</Link>
                </h2>
                <p className="text-gray-600 mt-2">{article.description}</p>
                <Link href={`/blog/${article._id}`} className="text-blue-600 mt-4 inline-block">
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