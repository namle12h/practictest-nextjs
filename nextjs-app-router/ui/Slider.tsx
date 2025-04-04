import { useState, useEffect } from 'react';

export default function SimpleSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "/images/banner.webp",  // Thay thế bằng đường dẫn ảnh của bạn
    "/images/iphone16.webp",
    "/images/samsung.jpg",
  ];

  // Hàm chuyển slide tự động
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000); // 5000ms = 5 giây

    // Dọn dẹp interval khi component unmount
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className="w-full flex transition-transform duration-700" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((src, index) => (
          <div key={index} className="flex-shrink-0 w-full">
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-120 object-cover" // Điều chỉnh kích thước của ảnh ở đây
            />
          </div>
        ))}
      </div>

      {/* Các nút điều khiển */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
      >
        &#10094;
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
      >
        &#10095;
      </button>

      {/* Nội dung slide */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-white text-center">
        <p className="text-lg">Discover New Possibilities</p>
        <button className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-full">
          Try it yourself. Click here
        </button>
      </div>
    </div>
  );
}
