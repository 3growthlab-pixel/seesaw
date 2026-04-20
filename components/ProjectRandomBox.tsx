import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface BoxItem {
  id: number;
  label: string;
  desc: string;
  icon: string;
  className: string;
  delay: number;
}

const BOXES: BoxItem[] = [
  { id: 1, label: 'A 박스', desc: '설레는 빨간 상자', icon: '🎁', className: 'option-1', delay: 0 },
  { id: 2, label: 'B 박스', desc: '신비로운 보라 상자', icon: '🔮', className: 'option-2', delay: 0.2 },
  { id: 3, label: 'C 박스', desc: '빛나는 노란 상자', icon: '✨', className: 'option-3', delay: 0.4 },
  { id: 4, label: 'D 박스', desc: '기분 좋은 초록 상자', icon: '🍀', className: 'option-4', delay: 0.6 },
];

const ProjectRandomBox: React.FC = () => {
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [openedBoxIds, setOpenedBoxIds] = useState<number[]>([]);
  const [shakingBoxId, setShakingBoxId] = useState<number | null>(null);
  const [modalState, setModalState] = useState({ isOpen: false, icon: '', title: '', msg: '' });

  const handleBoxClick = (id: number) => {
    if (openedBoxIds.includes(id) || isAnimating) return;

    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);
    setIsAnimating(true);
    setShakingBoxId(id);

    setTimeout(() => {
      setShakingBoxId(null);
      setOpenedBoxIds(prev => [...prev, id]);
      setIsAnimating(false);

      if (newClickCount === 1) {
        setModalState({
          isOpen: true,
          icon: '💨',
          title: '앗! 상자가 비어있어요',
          msg: '아쉬워하지 마세요!<br/>남은 상자 중 <b>하나 더</b> 열어볼까요?'
        });
      } else if (newClickCount === 2) {
        // Mark all as opened to disable them
        setOpenedBoxIds(BOXES.map(b => b.id));
        setModalState({
          isOpen: true,
          icon: '🎉',
          title: '축하합니다! 당첨!',
          msg: '<b>[기업 연계 컨설팅 1:1 이용권]</b>을 찾으셨어요!'
        });
      }
    }, 1200);
  };

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
    if (clickCount >= 2) {
      // After winning, maybe navigate back or do something else
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col relative z-50">
      <header className="sticky top-0 bg-[#fafafa]/90 backdrop-blur-md px-5 py-4 flex items-center z-50">
        <button onClick={() => navigate(-1)} className="p-1">
          <i className="fa-solid fa-chevron-left text-lg"></i>
        </button>
      </header>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes floatIcon {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes shadowScale {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(0.8); opacity: 0.1; }
        }
        @keyframes shakeIcon {
          0% { transform: rotate(0deg) scale(1.1); }
          25% { transform: rotate(10deg) scale(1.1); }
          50% { transform: rotate(-10deg) scale(1.1); }
          75% { transform: rotate(10deg) scale(1.1); }
          100% { transform: rotate(0deg) scale(1.1); }
        }
        @keyframes popUp { 
          from { transform: scale(0.8); opacity: 0; } 
          to { transform: scale(1); opacity: 1; } 
        }

        .rb-float { animation: floatIcon 3s ease-in-out infinite; }
        .rb-shadow { animation: shadowScale 3s ease-in-out infinite; }
        .rb-shake { animation: shakeIcon 0.3s infinite linear !important; }

        .option-1:hover:not(.opened) { border-color: #ff6b6b; background: #fff5f5; }
        .option-2:hover:not(.opened) { border-color: #cc5de8; background: #f3f0ff; }
        .option-3:hover:not(.opened) { border-color: #fcc419; background: #fff9db; }
        .option-4:hover:not(.opened) { border-color: #51cf66; background: #ebfbee; }

        .opened { opacity: 0.4; pointer-events: none; background: #f5f5f5 !important; border-color: #ddd !important; }
      `}} />

      <div className="flex-1 w-full max-w-lg mx-auto text-center px-5 pt-8 pb-16 font-pretendard">
        <div className="text-[22px] font-extrabold text-gray-800 mb-2">🎁 두근두근! '청년 응원 시크릿 랜덤박스' 🎁</div>
        <div className="text-sm text-gray-500 mb-8">마음에 드는 상자를 선택해보세요.</div>

        <div className="grid grid-cols-2 gap-4">
          {BOXES.map((box) => {
            const isOpened = openedBoxIds.includes(box.id);
            const isShaking = shakingBoxId === box.id;
            
            return (
              <div 
                key={box.id}
                onClick={() => handleBoxClick(box.id)}
                className={`bg-white border-2 border-gray-200 rounded-2xl py-6 px-2 cursor-pointer transition-all shadow-sm hover:-translate-y-1 hover:shadow-md active:scale-95 relative overflow-hidden ${box.className} ${isOpened ? 'opened' : ''}`}
              >
                <div className="relative h-16 mb-2">
                  <div 
                    className={`text-4xl relative z-10 ${isShaking ? 'rb-shake' : 'rb-float'}`} 
                    style={{ animationDelay: isShaking ? '0s' : `${box.delay}s` }}
                  >
                    {box.icon}
                  </div>
                  <div 
                    className={`w-8 h-1.5 bg-black rounded-full mx-auto relative z-0 -mt-1 ${isShaking ? '' : 'rb-shadow'}`}
                    style={{ animationDelay: isShaking ? '0s' : `${box.delay}s` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600 leading-tight mt-3">
                  <span className="font-bold text-gray-800 text-base">{box.label}</span><br/>
                  {box.desc}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal */}
        {modalState.isOpen && (
          <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-[20px] text-center w-[85%] max-w-[340px] shadow-2xl" style={{animation: 'popUp 0.3s ease-out'}}>
              <div className="text-5xl mb-4">{modalState.icon}</div>
              <div className="text-xl font-extrabold text-gray-800 mb-2 leading-tight">{modalState.title}</div>
              <div className="text-[15px] text-gray-600 leading-relaxed mb-6" dangerouslySetInnerHTML={{__html: modalState.msg}}></div>
              <button 
                onClick={closeModal}
                className="w-full bg-gray-800 text-white border-none py-3 rounded-xl text-base font-bold cursor-pointer transition-colors hover:bg-black"
              >
                {clickCount >= 2 ? '닫기' : '확인'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectRandomBox;
