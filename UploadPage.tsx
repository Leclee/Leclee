import { useState, useRef } from 'react';
import { Button } from "@/components/aily/Button";

interface UploadPageProps {
  userPhoto: string | null;
  partnerPhoto: string | null;
  setUserPhoto: (url: string | null) => void;
  setPartnerPhoto: (url: string | null) => void;
  onComplete: () => void;
}

export default function UploadPage({
  userPhoto,
  partnerPhoto,
  setUserPhoto,
  setPartnerPhoto,
  onComplete
}: UploadPageProps) {
  const userInputRef = useRef<HTMLInputElement>(null);
  const partnerInputRef = useRef<HTMLInputElement>(null);
  
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>, setPhoto: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhoto(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center space-y-16">
      <h1 className="text-4xl font-bold text-blue-300">上传你的星球</h1>
      
      <div className="flex w-full max-w-4xl justify-around">
        {/* 用户上传区域 */}
        <div className="flex flex-col items-center space-y-6">
          <div className="relative h-64 w-64">
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-dashed border-blue-400 p-2 [animation-duration:20s]">
              <div className="absolute inset-0 animate-spin rounded-full border-2 border-dashed border-purple-400 p-4 [animation-duration:25s]">
                <div className="absolute inset-0 animate-spin rounded-full border-2 border-dashed border-pink-400 p-6 [animation-duration:30s]"></div>
              </div>
            </div>
            
            {userPhoto ? (
              <div className="relative z-10 flex h-full w-full items-center justify-center overflow-hidden rounded-full">
                <img 
                  src={userPhoto} 
                  alt="你的照片" 
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <button
                className="relative z-10 flex h-full w-full flex-col items-center justify-center rounded-full bg-black bg-opacity-50 hover:bg-opacity-30"
                onClick={() => userInputRef.current?.click()}
              >
                <div className="text-6xl">🌍</div>
                <p className="mt-4 text-xl">上传你的星球</p>
              </button>
            )}
          </div>
          
          <input
            type="file"
            ref={userInputRef}
            className="hidden"
            accept="image/*"
            onChange={(e) => handleUpload(e, setUserPhoto)}
          />
          
          <Button
            variant="outline"
            onClick={() => userInputRef.current?.click()}
          >
            {userPhoto ? '更换照片' : '上传照片'}
          </Button>
        </div>
        
        {/* 伴侣上传区域 */}
        <div className="flex flex-col items-center space-y-6">
          <div className="relative h-64 w-64">
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-dashed border-pink-400 p-2 [animation-duration:25s]">
              <div className="absolute inset-0 animate-spin rounded-full border-2 border-dashed border-purple-400 p-4 [animation-duration:20s]">
                <div className="absolute inset-0 animate-spin rounded-full border-2 border-dashed border-blue-400 p-6 [animation-duration:30s]"></div>
              </div>
            </div>
            
            {partnerPhoto ? (
              <div className="relative z-10 flex h-full w-full items-center justify-center overflow-hidden rounded-full">
                <img 
                  src={partnerPhoto} 
                  alt="TA的照片" 
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <button
                className="relative z-10 flex h-full w-full flex-col items-center justify-center rounded-full bg-black bg-opacity-50 hover:bg-opacity-30"
                onClick={() => partnerInputRef.current?.click()}
              >
                <div className="text-6xl">🌌</div>
                <p className="mt-4 text-xl">上传TA的星球</p>
              </button>
            )}
          </div>
          
          <input
            type="file"
            ref={partnerInputRef}
            className="hidden"
            accept="image/*"
            onChange={(e) => handleUpload(e, setPartnerPhoto)}
          />
          
          <Button
            variant="outline"
            onClick={() => partnerInputRef.current?.click()}
          >
            {partnerPhoto ? '更换照片' : '上传照片'}
          </Button>
        </div>
      </div>
      
      <Button
        className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 px-10 py-6 text-xl disabled:opacity-50"
        onClick={onComplete}
        disabled={!userPhoto || !partnerPhoto}
      >
        立即匹配
      </Button>
    </div>
  );
}