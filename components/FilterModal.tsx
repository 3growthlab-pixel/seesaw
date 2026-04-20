
import React, { useState, useMemo } from 'react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
  totalCount: number;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, onApply, totalCount }) => {
  const [sort, setSort] = useState('추천순');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(308000);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedAges, setSelectedAges] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  // Simulate dynamic count based on selected filters
  const currentCount = useMemo(() => {
    let count = totalCount;
    if (selectedColors.length > 0) count -= selectedColors.length * 123;
    if (selectedAges.length > 0) count -= selectedAges.length * 456;
    if (selectedStyles.length > 0) count -= selectedStyles.length * 78;
    if (sort !== '추천순') count -= 12;
    return Math.max(1, count);
  }, [totalCount, selectedColors, selectedAges, selectedStyles, sort]);

  const colors = [
    { name: '옐로우', count: '3.8만', hex: '#FDE047' },
    { name: '실버', count: '1.7만', hex: '#E5E7EB' },
    { name: '블랙', count: '8,682', hex: '#1F2937' },
    { name: '그레이', count: '4.1만', hex: '#9CA3AF' },
    { name: '화이트', count: '1.1만', hex: '#FFFFFF' },
    { name: '핑크', count: '7,133', hex: '#F472B6' },
  ];

  const ages = [
    { name: '20대 중반', count: '5.9만' },
    { name: '20대 초반', count: '6.2만' },
    { name: '30대 이상', count: '4.9만' },
    { name: '20대 후반', count: '4.7만' },
    { name: '10대', count: '1.6만' },
  ];

  const styles = [
    { name: '캐주얼', count: '873' },
    { name: '로맨틱', count: '700' },
    { name: '스트릿', count: '340' },
    { name: '빈티지', count: '203' },
    { name: '비지니스캐주얼', count: '34' },
    { name: '에스닉', count: '31' },
    { name: '펑크', count: '24' },
    { name: '파티', count: '19' },
    { name: '웨딩', count: '17' },
    { name: '오피스', count: '16' },
  ];

  const handleReset = () => {
    setSort('추천순');
    setMinPrice(0);
    setMaxPrice(308000);
    setSelectedColors([]);
    setSelectedAges([]);
    setSelectedStyles([]);
  };

  const toggleItem = (list: string[], setList: (val: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col animate-slideUp">
      {/* Header */}
      <header className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
        <button onClick={onClose} className="p-1">
          <i className="fa-solid fa-xmark text-xl text-gray-400"></i>
        </button>
        <h1 className="text-lg font-bold">필터</h1>
        <div className="w-8"></div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Sort */}
        <section className="px-5 py-6 border-b border-gray-50">
          <h2 className="text-base font-bold mb-4">정렬</h2>
          <div className="space-y-4">
            {['추천순', '인기순', '최신순', '리뷰 많은순', '낮은 가격순', '높은 가격순'].map((item) => (
              <label key={item} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${sort === item ? 'border-gray-900' : 'border-gray-200'}`}>
                  {sort === item && <div className="w-2.5 h-2.5 rounded-full bg-gray-900"></div>}
                </div>
                <span className={`text-sm font-medium ${sort === item ? 'text-gray-900' : 'text-gray-400'}`}>{item}</span>
                <input type="radio" className="hidden" name="sort" checked={sort === item} onChange={() => setSort(item)} />
              </label>
            ))}
          </div>
        </section>

        {/* Price */}
        <section className="px-5 py-6 border-b border-gray-50">
          <h2 className="text-base font-bold mb-4">가격</h2>
          <div className="flex items-center gap-2 mb-6">
            <div className="flex-1 border border-gray-200 rounded-lg px-3 py-3 flex items-center justify-between">
              <input 
                type="number" 
                value={minPrice} 
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="w-full text-right font-bold outline-none"
              />
              <span className="ml-1 text-sm font-bold">원</span>
            </div>
            <span className="text-gray-400">~</span>
            <div className="flex-1 border border-gray-200 rounded-lg px-3 py-3 flex items-center justify-between">
              <input 
                type="number" 
                value={maxPrice} 
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full text-right font-bold outline-none"
              />
              <span className="ml-1 text-sm font-bold">원</span>
            </div>
            <button className="text-blue-500 font-bold text-sm ml-2">적용</button>
          </div>
          
          {/* Mock Histogram Slider */}
          <div className="relative h-20 flex items-end gap-0.5 px-2">
            {Array.from({ length: 40 }).map((_, i) => (
              <div 
                key={i} 
                className="flex-1 bg-blue-50 rounded-t-sm" 
                style={{ height: `${Math.random() * 100}%`, opacity: i < 10 ? 0.3 : 1 }}
              ></div>
            ))}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 bg-white border-2 border-blue-500 rounded-full shadow-md -translate-x-1/2 translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-white border-2 border-blue-500 rounded-full shadow-md translate-x-1/2 translate-y-1/2"></div>
          </div>
        </section>

        {/* Color */}
        <section className="px-5 py-6 border-b border-gray-50">
          <h2 className="text-base font-bold mb-4">색상</h2>
          <div className="grid grid-cols-3 gap-3">
            {colors.map((color) => (
              <button 
                key={color.name}
                onClick={() => toggleItem(selectedColors, setSelectedColors, color.name)}
                className={`flex items-center gap-2 px-3 py-3 rounded-lg border transition-all ${selectedColors.includes(color.name) ? 'border-gray-900 bg-gray-50' : 'border-gray-100 bg-white'}`}
              >
                <div className="w-5 h-5 rounded-full border border-gray-200" style={{ backgroundColor: color.hex }}></div>
                <div className="flex flex-col items-start">
                  <span className="text-xs font-bold">{color.name}</span>
                  <span className="text-[10px] text-gray-400">{color.count}</span>
                </div>
              </button>
            ))}
          </div>
          <button className="mt-6 text-gray-400 text-xs font-bold flex items-center gap-1">
            필터 더보기 <i className="fa-solid fa-chevron-down text-[8px]"></i>
          </button>
        </section>

        {/* Age */}
        <section className="px-5 py-6 border-b border-gray-50">
          <h2 className="text-base font-bold mb-4">연령대</h2>
          <div className="flex flex-wrap gap-2">
            {ages.map((age) => (
              <button 
                key={age.name}
                onClick={() => toggleItem(selectedAges, setSelectedAges, age.name)}
                className={`px-4 py-2 rounded-full border text-xs font-bold transition-all ${selectedAges.includes(age.name) ? 'bg-gray-800 border-gray-800 text-white' : 'bg-white border-gray-100 text-gray-400'}`}
              >
                {age.name} {age.count}
              </button>
            ))}
          </div>
        </section>

        {/* Style */}
        <section className="px-5 py-6 border-b border-gray-50">
          <h2 className="text-base font-bold mb-4">스타일</h2>
          <div className="flex flex-wrap gap-2">
            {styles.map((style) => (
              <button 
                key={style.name}
                onClick={() => toggleItem(selectedStyles, setSelectedStyles, style.name)}
                className={`px-4 py-2 rounded-full border text-xs font-bold transition-all ${selectedStyles.includes(style.name) ? 'bg-gray-800 border-gray-800 text-white' : 'bg-white border-gray-100 text-gray-400'}`}
              >
                {style.name} {style.count}
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-5 py-3 flex items-center gap-3 z-50">
        <button 
          onClick={handleReset}
          className="px-6 py-4 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 active:scale-95 transition-transform"
        >
          초기화
        </button>
        <button 
          onClick={() => {
            onApply({ sort, minPrice, maxPrice, selectedColors, selectedAges, selectedStyles, currentCount });
            onClose();
          }}
          className="flex-1 bg-red-500 text-white font-bold py-4 rounded-lg active:scale-95 transition-transform shadow-lg shadow-red-100"
        >
          {currentCount.toLocaleString()}개 결과보기
        </button>
      </div>
    </div>
  );
};

export default FilterModal;
