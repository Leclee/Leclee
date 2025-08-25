import { useEffect, useState } from 'react';

export default function AnalyzingPage() {
  const [stage, setStage] = useState(1); // 1: 星球飞向中央, 2: 鹊桥连接, 3: 星河注入
  
  useEffect(() => {
    const timer1 = setTimeout(() => setStage(2), 1000);
    const timer2 = setTimeout(() => setStage(3), 2000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);
  
  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black">
      {/* 星球飞行动画 */}
      <div className={`absolute flex w-full justify-around transition-all duration-1000 ${stage > 1 ? 'opacity-0' : 'opacity-100'}`}>
        <div className="h-40 w-40 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg shadow-blue-500/50"></div>
        <div className="h-40 w-40 rounded-full bg-gradient-to-br from-pink-500 to-red-500 shadow-lg shadow-pink-500/50"></div>
      </div>
      
      {/* 鹊桥连接动画 */}
      <div className={`absolute flex w-full justify-center transition-all duration-1000 ${stage === 2 ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center">
          <div className="h-32 w-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg shadow-blue-500/50"></div>
          
          {/* 鹊桥 */}
          <div className="relative mx-4 h-1 w-64 overflow-hidden bg-gradient-to-r from-blue-400 to-pink-400">
            {[...Array(50)].map((_, i) => (
              <div 
                key={i}
                className="absolute top-1/2 h-4 w-1 -translate-y-1/2 rounded-full bg-white"
                style={{
                  left: `${(i / 50) * 100}%`,
                  animation: `pulse 1.5s infinite ${i * 0.1}s`,
                }}
              />
            ))}
          </div>
          
          <div className="h-32 w-32 rounded-full bg-gradient-to-br from-pink-500 to-red-500 shadow-lg shadow-pink-500/50"></div>
        </div>
      </div>
      
      {/* 星河能量注入动画 */}
      <div className={`absolute flex flex-col items-center transition-all duration-1000 ${stage === 3 ? 'opacity-100' : 'opacity-0'}`}>
        <div className="relative h-64 w-64 rounded-full border-4 border-blue-400">
          <div className="absolute inset-0 flex animate-spin items-center justify-center [animation-duration:15s]">
            <div className="h-48 w-48 rounded-full border-4 border-purple-400">
              <div className="absolute inset-0 flex animate-spin items-center justify-center [animation-duration:20s]">
                <div className="h-32 w-32 rounded-full border-4 border-pink-400">
                  <div className="absolute inset-0 flex animate-spin items-center justify-center [animation-duration:25s]">
                    <div className="h-16 w-16 rounded-full bg-white bg-opacity-20"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 能量注入效果 */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute h-64 w-64 animate-pulse rounded-full"
              style={{
                boxShadow: `0 0 30px ${i % 2 === 0 ? '#60a5fa' : '#ec4899'}`,
                animationDelay: `${i * 0.2}s`,
                opacity: 0.6,
              }}
            />
          ))}
        </div>
        
        <p className="mt-8 text-2xl text-blue-300">星河能量注入中...</p>
      </div>
      
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}