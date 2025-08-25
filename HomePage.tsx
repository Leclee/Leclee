import { Button } from "@/components/aily/Button";
import { useState, useEffect } from 'react';

interface HomePageProps {
  onStart: () => void;
}

export default function HomePage({ onStart }: HomePageProps) {
  const [starsVisible, setStarsVisible] = useState(true);
  
  const handleStartClick = () => {
    setStarsVisible(false);
    setTimeout(onStart, 1500); // 1.5秒后切换到上传页
  };
  
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      {/* 星云背景 */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${starsVisible ? 'opacity-100' : 'opacity-0'}`}>
        {[...Array(150)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4}px`,
              height: `${Math.random() * 4}px`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}
      </div>
      
      {/* 星门汇聚动画 */}
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${starsVisible ? 'scale-100 opacity-100' : 'scale-150 opacity-0'}`}>
        <div className="relative h-64 w-64">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute h-full w-full animate-spin"
              style={{
                animationDuration: `${Math.random() * 5 + 3}s`,
                animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
              }}
            >
              <div
                className="absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-blue-400"
                style={{
                  transform: `rotate(${i * 12}deg)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center space-y-8">
        <h1 className="text-5xl font-bold tracking-wider text-white">七夕星缘</h1>
        <p className="text-xl text-blue-200">连接星空，寻找你的牛郎织女</p>
        <Button 
          className="mt-8 bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6 text-xl font-bold transition-all hover:scale-105 hover:from-purple-700 hover:to-pink-700"
          onClick={handleStartClick}
        >
          开启星缘
        </Button>
      </div>
    </div>
  );
}