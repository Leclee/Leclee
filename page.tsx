'use client';
import { useState, useEffect, useRef } from 'react';
import HomePage from '@/components/HomePage';
import UploadPage from '@/components/UploadPage';
import AnalyzingPage from '@/components/AnalyzingPage';
import ResultPage from '@/components/ResultPage';

export default function QixiGame() {
  const [page, setPage] = useState('home');
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [partnerPhoto, setPartnerPhoto] = useState<string | null>(null);
  const [matchScore, setMatchScore] = useState(0);
  
  // 模拟AI匹配计算
  const calculateMatch = () => {
    return Math.floor(Math.random() * 41) + 60; // 随机生成60-100的匹配分数
  };
  
  const handleStart = () => {
    setPage('upload');
  };
  
  const handleUploadComplete = () => {
    setPage('analyzing');
    setTimeout(() => {
      const score = calculateMatch();
      setMatchScore(score);
      setPage('result');
    }, 4000); // 4秒后显示结果
  };
  
  const handleRetry = () => {
    setUserPhoto(null);
    setPartnerPhoto(null);
    setPage('home');
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      {page === 'home' && <HomePage onStart={handleStart} />}
      {page === 'upload' && (
        <UploadPage 
          userPhoto={userPhoto}
          partnerPhoto={partnerPhoto}
          setUserPhoto={setUserPhoto}
          setPartnerPhoto={setPartnerPhoto}
          onComplete={handleUploadComplete}
        />
      )}
      {page === 'analyzing' && <AnalyzingPage />}
      {page === 'result' && (
        <ResultPage 
          userPhoto={userPhoto!}
          partnerPhoto={partnerPhoto!}
          matchScore={matchScore}
          onRetry={handleRetry}
        />
      )}
    </div>
  );
}