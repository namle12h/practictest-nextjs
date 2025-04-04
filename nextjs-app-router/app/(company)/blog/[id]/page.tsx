"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";  // Sử dụng useParams từ next/navigation
import axios from "axios";

export default function BlogDetail() {
  const { id } = useParams(); // Lấy tham số 'id' từ URL
  const [article, setArticle] = useState<any>(null);

  // Lấy dữ liệu bài viết chi tiết từ API khi trang được load
  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/v1/articles/${id}`);
          setArticle(response.data.data); // Lưu dữ liệu bài viết vào state
        } catch (error) {
          console.error("Error fetching article:", error);
        }
      };
      fetchArticle();
    }
  }, [id]);  // Chạy lại khi ID thay đổi

  if (!article) return <p>Loading...</p>;  // Hiển thị khi dữ liệu chưa được tải

  // return (
  //   <div> {/* Mở div bao quanh các phần tử */}
  //     <h1>{article.title}</h1>
  //     <p><strong>Keyword:</strong> {article.keyword}</p>
  //     <p>{article.content}</p>
  //     <p><strong>Published on:</strong> {article.date}</p>
  //   </div> // Đóng div
  // );
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-900">{article.title}</h1>
      <div className="text-gray-500 mt-2">
        <span>{article.date}</span> | <span>01 min read</span>
      </div>
      <div className="mt-6">
        <img src="/images/apple.jpg" alt={article.title} className="w-full h-80 object-cover rounded-lg" />
      </div>
      <div className="mt-8">
        <p className="text-lg text-gray-700">{article.content}</p>
      </div>
    </div>
  );

}
