"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";  
import axios from "axios";

export default function BlogDetail() {
  const { id } = useParams(); // Lấy tham số 'id' từ URL
  const [article, setArticle] = useState<any>(null);


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
  }, [id]);  

  if (!article) return <p>Loading...</p>; 

 
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-900">{article.title}</h1>
      <div className="text-gray-500 mt-2">
        <span>{article.date}</span> | <span>01 min read</span>
      </div>
      <div className="mt-6">
        <img 
          src="/images/apple.jpg" 
          alt={article.title} 
          className="w-full h-80 object-cover rounded-lg" 
        />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Introduction</h2>
        <p className="text-lg text-gray-700 mb-6">
          {article.introduction} 
        </p>
        
        <h3 className="text-xl font-medium text-gray-800 mb-4"></h3>
        <p className="text-lg text-gray-700 mb-6">
          {article.content} 
        </p>

        <div className="mt-6">
          <img 
            src="/images/AI-Tech-Stack.jpg" 
            alt="Technology" 
            className="w-160 h-80 object-cover rounded-lg mb-6 " 
          />
        </div>

        <h3 className="text-xl  text-gray-800 mb-4 ">AI Applications in Industry</h3>
        <p className="text-lg text-gray-700 ">
        AI is not limited to personal assistance; it is also revolutionizing major industries. In manufacturing, AI optimizes production processes and machine maintenance, minimizing errors and risks. Companies are leveraging AI to analyze big data, predict market trends, and make informed decisions that were once beyond human capability.

Challenges and Opportunities
While AI presents vast opportunities for growth, it also brings challenges. One of the primary concerns is the potential job displacement caused by automation. However, experts believe that AI will not only create new job opportunities but also enhance existing roles by automating repetitive tasks, enabling workers to focus on more complex and creative aspects of their jobs.

As AI continues to evolve, the future of work is likely to be reshaped in ways we are just beginning to understand.
          {article.conclusion} 
        </p>
      </div>
    </div>
  );

}
