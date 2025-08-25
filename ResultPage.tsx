import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/aily/Button";

interface ResultPageProps {
  userPhoto: string;
  partnerPhoto: string;
  matchScore: number;
  onRetry: () => void;
}

export default function ResultPage({ userPhoto, partnerPhoto, matchScore, onRetry }: ResultPageProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  
  useEffect(() => {
    // 淡入结果海报
    setTimeout(() => setShowResult(true), 500);
    
    // 数字滚动动画
    let start = 0;
    const duration = 2000; // 2秒完成滚动
    const increment = matchScore / (duration / 16); // 每16ms增加的值
    
    const animate = () => {
      start += increment;
      if (start >= matchScore) {
        setDisplayScore(matchScore);
      } else {
        setDisplayScore(Math.floor(start));
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [matchScore]);
  
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-black to-purple-900 p-4">
      <div className={`relative w-full max-w-3xl rounded-3xl bg-gradient-to-b from-gray-900 to-black p-8 shadow-2xl shadow-purple-500/20 transition-opacity duration-1000 ${showResult ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 rounded-3xl border border-purple-500/30"></div>
        
        <div className="relative z-10 text-center">
          <h1 className="mb-2 text-4xl font-bold text-pink-400">七夕星缘匹配结果</h1>
          <p className="text-blue-300">两颗星球的奇妙相遇</p>
          
          <div className="my-12 flex items-center justify-center">
            {/* 用户照片 */}
            <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-blue-500 shadow-xl shadow-blue-500/30">
              <img 
                src={userPhoto} 
                alt="你的照片" 
                className="h-full w-full object-cover"
              />
            </div>
            
            {/* 匹配分数 */}
            <div className="relative mx-8 flex h-48 w-48 flex-col items-center justify-center rounded-full border-4 border-pink-500 bg-gradient-to-br from-purple-900 to-pink-900 shadow-2xl shadow-pink-500/30">
              <div className="text-5xl font-bold text-white">{displayScore}</div>
              <div className="mt-1 text-blue-300">匹配指数</div>
              
              {/* 装饰性星星 */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute h-full w-full animate-spin"
                  style={{
                    animationDuration: `${15 + i * 3}s`,
                  }}
                >
                  <div 
                    className="absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-white"
                    style={{
                      transform: `rotate(${i * 45}deg)`,
                    }}
                  />
                </div>
              ))}
            </div>
            
            {/* 伴侣照片 */}
            <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-pink-500 shadow-xl shadow-pink-500/30">
              <img 
                src={partnerPhoto} 
                alt="TA的照片" 
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          
          {/* 匹配描述 */}
          <div className="mb-10 mt-6 rounded-2xl bg-black/30 p-6 backdrop-blur-sm">
            <h2 className="mb-4 text-2xl font-bold text-blue-400">
              {matchScore >= 90 ? '天作之合' : 
               matchScore >= 80 ? '佳偶天成' : 
               matchScore >= 70 ? '情投意合' : 
               '有缘相遇'}
            </h2>
            <p className="text-lg text-gray-300">
              {matchScore >= 90 ? '你们的缘分如同牛郎织女，穿越星河只为相遇' : 
               matchScore >= 80 ? '星空中最亮的组合，彼此照亮前行的路' : 
               matchScore >= 70 ? '在浩瀚星海中找到彼此，是宇宙的礼物' : 
               '每一次相遇都是星空的安排，珍惜这份缘分'}
            </p>
          </div>
          
          <Button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 px-10 py-6 text-xl hover:from-blue-700 hover:to-purple-700"
            onClick={onRetry}
          >
            再测一次
          </Button>
        </div>
        
        {/* 星空背景装饰 */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          {[...Array(80)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3}px`,
                height: `${Math.random() * 3}px`,
                opacity: Math.random() * 0.5 + 0.2,
                animation: `twinkle ${Math.random() * 3 + 2}s infinite ${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}