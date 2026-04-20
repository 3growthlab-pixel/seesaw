import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectLetter2: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const navigate = useNavigate();
  const hasLoadedChartData = useRef(false);

  useEffect(() => {
    if (hasLoadedChartData.current) return;
    
    let isMounted = true;
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/chart.js";
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      if (typeof window.Chart !== 'undefined' && isMounted) {
        hasLoadedChartData.current = true;
        // @ts-ignore
        const Chart = window.Chart;
        Chart.defaults.font.family = "'Pretendard', sans-serif";
        Chart.defaults.color = '#6b7280';

        const funnelCanvas = document.getElementById('bbiFunnelChart');
        if (funnelCanvas) {
          // @ts-ignore
          new Chart(funnelCanvas.getContext('2d'), {
            type: 'bar',
            data: {
              labels: ['광고 접촉', '도와야 함 공감', '실제 참여'],
              datasets: [{
                label: '경험 비율 (%)',
                data: [90, 72, 21.5],
                backgroundColor: ['#fdf1da', '#f6c577', '#F3A634'],
                borderRadius: 6,
                barThickness: 24
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: { beginAtZero: true, max: 100, grid: { color: '#f3f4f6' }, ticks: { font: { weight: 'bold' } } },
                x: { grid: { display: false } }
              },
              plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c: any) => c.parsed.y + '%' } } }
            }
          });
        }

        const reasonCanvas = document.getElementById('bbiReasonChart');
        if (reasonCanvas) {
          // @ts-ignore
          new Chart(reasonCanvas.getContext('2d'), {
            type: 'bar',
            data: {
              labels: ['경제적 부담', '지속적인 부담', '효과 불확실성', '참여방식 거리감'],
              datasets: [{
                label: '저해 요인 (%)',
                data: [63, 58, 49, 41],
                backgroundColor: ['#ef4444', '#f87171', '#fca5a5', '#fecaca'],
                borderRadius: 6,
                barThickness: 14
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              indexAxis: 'y',
              layout: { padding: { right: 20 } },
              scales: {
                x: { display: false, max: 70, beginAtZero: true },
                y: { grid: { display: false, drawBorder: false }, ticks: { font: { weight: 'bold', size: 10 }, color: '#4b5563' } }
              },
              plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c: any) => c.parsed.x + '%' } } }
            }
          });
        }
      }
    };
    document.body.appendChild(script);

    return () => {
      isMounted = false;
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col relative z-50 pb-20">
      <header className="sticky top-0 bg-[#fafafa]/90 backdrop-blur-md px-5 py-4 flex justify-between items-center z-50 border-b border-gray-200">
        <button onClick={onBack} className="p-1">
          <i className="fa-solid fa-chevron-left text-lg"></i>
        </button>
        <span className="font-bold text-sm">보라보훈 프로젝트</span>
      </header>

      <style dangerouslySetInnerHTML={{ __html: `
        .bbi-project-container { font-family: 'Pretendard', sans-serif; background: #fafafa; color: #4b5563; padding-bottom: 20px; width: 100%; overflow-x: hidden; }
        .bbi-hero { height: 240px; background: linear-gradient(135deg, #F3A634 0%, #E08B1B 100%); width: 100%; }
        .bbi-white-box { width: 90%; max-width: 400px; margin: -60px auto 0; background: #fff; border-radius: 16px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); padding: 24px; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 16px; position: relative; z-index: 10; }
        .bbi-project-thumb { width: 100px; height: 100px; border-radius: 16px; border: 4px solid #fff; background: #f8fafc; margin-top: -50px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); object-fit: contain; }
        .bbi-status-button { background: linear-gradient(135deg, #F3A634 0%, #E08B1B 100%); color: #fff; padding: 6px 12px; font-size: 13px; font-weight: 700; border-radius: 999px; animation: bbi-pulse 2s infinite; }
        @keyframes bbi-pulse { 0% { box-shadow: 0 0 0 0 rgba(243,166,52,0.4); } 70% { box-shadow: 0 0 0 8px rgba(243,166,52,0); } 100% { box-shadow: 0 0 0 0 rgba(243,166,52,0); } }
        .bbi-title { font-size: 22px; font-weight: 900; color: #111827; line-height: 1.3; margin-bottom: 8px; }
        .bbi-subtitle { font-size: 14px; color: #6b7280; font-weight: 500; }
        .bbi-info { display: flex; gap: 8px; font-size: 13px; justify-content: center; flex-wrap: wrap; margin-top: 10px;}
        .bbi-info-item { background: #f8fafc; padding: 6px 10px; border-radius: 6px; font-weight: 600; }
        
        .bbi-wrapper { padding: 24px 16px; display: flex; flex-direction: column; gap: 24px; }
        .bbi-section-box { background: #fff; padding: 24px; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .bbi-section-title { font-size: 18px; font-weight: 800; color: #111827; margin-bottom: 16px; display: flex; align-items: center; gap: 10px; line-height: 1.3; }
        .bbi-section-title::before { content: ''; width: 4px; height: 18px; background: linear-gradient(135deg, #F3A634 0%, #E08B1B 100%); border-radius: 4px; display: block; }
        .bbi-section-content { font-size: 14px; line-height: 1.6; color: #4b5563; }
        .bbi-section-content p { margin-bottom: 12px; }
        .bbi-highlight-text { background: linear-gradient(120deg, #fdf1da 0%, rgba(253,241,218,0.5) 100%); padding: 2px 4px; font-weight: 700; color: #F3A634; border-radius: 4px; }
        .bbi-benefit-box { background: linear-gradient(to right bottom, #ffffff, #f8fafc); border: 1px solid #fdf1da; border-left: 4px solid #F3A634; padding: 16px; border-radius: 12px; margin: 16px 0; }
        
        .bbi-chart-grid { display: flex; flex-direction: column; gap: 24px; }
        .bbi-chart-wrapper { height: 160px; width: 100%; position: relative; }
        
        .bbi-grid-list { display: flex; flex-direction: column; gap: 16px; margin-top: 16px; }
        .bbi-grid-item { background: #f8fafc; border: 1px solid #e5e7eb; padding: 16px; border-radius: 12px; }
        .bbi-grid-title { font-size: 15px; font-weight: 800; margin-bottom: 6px; }
        .bbi-grid-desc { font-size: 13px; color: #6b7280; line-height: 1.5; }
        
        .bbi-right-section { background: #fff; padding: 24px; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .bbi-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
        .bbi-tag { background: #fef0d8; color: #d97706; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 700; }
        .bbi-right-title { font-size: 16px; font-weight: 800; color: #111827; margin-bottom: 12px; }
        .bbi-highlight-summary { background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; font-size: 13px; }
        .bbi-summary-row { display: flex; margin-bottom: 10px; }
        .bbi-summary-row:last-child { margin-bottom: 0; }
        .bbi-summary-label { font-weight: 800; color: #1f2937; min-width: 60px; }
      `}} />

      <div className="bbi-project-container">
        {/* Hero Section */}
        <div className="bbi-hero-wrap">
          <div className="bbi-hero"></div>
          <div className="bbi-white-box">
            <img src="https://i.ifh.cc/lsGxPr.jpg" alt="참전용사 썸네일" className="bbi-project-thumb" />
            <div className="bbi-text-area">
              <div className="bbi-status-button">🚀 새로운 프로젝트 시작</div>
              <div className="bbi-title">희생을 기억하며:<br/>참전용사 프로젝트</div>
              <p className="bbi-subtitle">일회성 보상을 넘어, 참여를 통해 사회적 인식을 바꾸고 변화를 만드는 구조</p>
              <div className="bbi-info">
                <div className="bbi-info-item">🤝 참여형 캠페인</div>
                <div className="bbi-info-item">👥 대상: 20대 청년 누구나</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bbi-wrapper">
          <div className="bbi-section-box">
            <div className="bbi-section-title">1. 참전용사 지원의 구조적 한계</div>
            <div className="bbi-section-content">
              <p style={{fontWeight: 'bold', marginBottom: '12px'}}>우리 참전용사 vs. 미국 참전용사</p>

              <div style={{display:'flex', flexDirection:'column', gap: '16px', marginBottom: '16px'}}>
                <div style={{background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px'}}>
                  <h4 style={{color: '#1e3a8a', fontWeight: 'bold', marginBottom: '8px', fontSize:'14px'}}>🇺🇸 미국 참전용사</h4>
                  <ul style={{margin:0, paddingLeft: '20px', fontSize: '13px', lineHeight: 1.6}}>
                    <li>VA를 통한 철저한 보상 및 지원 시스템</li>
                    <li>가족까지 지원 받는 전방위적 혜택 제공</li>
                  </ul>
                </div>
                <div style={{background: '#fff5f5', border: '1px solid #fecaca', borderRadius: '12px', padding: '16px'}}>
                  <h4 style={{color: '#b91c1c', fontWeight: 'bold', marginBottom: '8px', fontSize:'14px'}}>🇰🇷 우리 참전용사</h4>
                  <ul style={{margin:0, paddingLeft: '20px', fontSize: '13px', lineHeight: 1.6}}>
                    <li>물질적인 보상에 머무르는 기초 체계</li>
                    <li>실제 생활고를 겪는 참전용사 다수 존재</li>
                  </ul>
                </div>
              </div>
              <p>우리는 참전용사들에게 그만큼 충분한 지원을 하지 못하고 있습니다. 참전용사들이 겪고 있는 현실을 사회적으로 공감하고 해결해야 하는 이유는 바로 이 마음과 제도의 격차에 있습니다.</p>
            </div>
          </div>

          <div className="bbi-section-box">
            <div className="bbi-section-title">2. 문제 정의</div>
            <div className="bbi-section-content">
              <p><strong>(1) 청년은 이미 ‘후원’을 알고 있습니다</strong></p>
              <div style={{background: '#f8fafc', borderRadius: '12px', padding: '16px', margin: '16px 0', border: '1px solid #e5e7eb'}}>
                <h4 style={{fontSize: '14px', fontWeight: 800, color: '#F3A634', marginBottom: '16px'}}>📊 후원 인식과 행동 간격 데이터</h4>
                <div className="bbi-chart-grid">
                  <div>
                    <div style={{fontSize: '12px', fontWeight: 700, marginBottom: '8px'}}>후원 캠페인 인식률 및 참여율</div>
                    <div className="bbi-chart-wrapper"><canvas id="bbiFunnelChart"></canvas></div>
                  </div>
                  <div>
                    <div style={{fontSize: '12px', fontWeight: 700, marginBottom: '8px', marginTop: '16px'}}>후원 참여 저해 요인</div>
                    <div className="bbi-chart-wrapper" style={{height: '140px'}}><canvas id="bbiReasonChart"></canvas></div>
                  </div>
                </div>
              </div>
              <p>문제는 무관심이 아니라, <strong>참여 방식이 맞지 않았다는 데</strong> 있습니다.</p>
            </div>
          </div>

          <div className="bbi-section-box">
            <div className="bbi-section-title">3. 신규 프로젝트 소개</div>
            <div className="bbi-section-content">
              <p>우리는 <strong>방식을 바꿨습니다.</strong></p>
              <p>후원이 아니라 <span className="bbi-highlight-text">편지를 읽고, 그에 대한 답장을 작성하는 것.</span> 이 편지들은 전시로 이어지고, 청년의 실제 목소리는 기업에 전달됩니다.</p>
            </div>
          </div>

          <div className="bbi-section-box">
            <div className="bbi-section-title">4. 핵심 결과</div>
            <div className="bbi-section-content">
              <div className="bbi-grid-list">
                <div className="bbi-grid-item" style={{borderLeft: '4px solid #F3A634'}}>
                  <div className="bbi-grid-title" style={{color: '#F3A634'}}>💡 1. 청년 참여 데이터</div>
                  <div className="bbi-grid-desc">청년들이 사회 문제에 공감하는 방식 기반 행동 데이터 확보.</div>
                </div>
                <div className="bbi-grid-item" style={{borderLeft: '4px solid #D98918'}}>
                  <div className="bbi-grid-title" style={{color: '#D98918'}}>📂 2. 편지 기반 감정 아카이브</div>
                  <div className="bbi-grid-desc">참전용사의 이야기와 청년의 답장이 연결된 기록 구축.</div>
                </div>
                <div className="bbi-grid-item" style={{borderLeft: '4px solid #BC6D0E'}}>
                  <div className="bbi-grid-title" style={{color: '#BC6D0E'}}>💬 3. 기업 연계 지원 명분</div>
                  <div className="bbi-grid-desc">전시 및 기업 후원으로 이어지는 지속 가능한 후원 시스템 구축.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bbi-right-section">
            <div className="bbi-tags">
              <span className="bbi-tag">#참전용사지원</span>
              <span className="bbi-tag">#참여형캠페인</span>
              <span className="bbi-tag">#감정아카이브</span>
            </div>
            <div className="bbi-right-title">프로젝트 요약</div>
            <div className="bbi-highlight-summary">
              <div className="bbi-summary-row">
                <div className="bbi-summary-label">방 식</div>
                <div style={{color: '#F3A634', fontWeight: 800}}>답장 작성 및 캠페인 참여</div>
              </div>
              <div className="bbi-summary-row">
                <div className="bbi-summary-label">목 표</div>
                <div>아카이브 전시 및 지속적 지원 명분 확보</div>
              </div>
            </div>
            <div style={{marginTop: '20px'}}>
              <button 
                onClick={() => navigate('/form-soldier')}
                style={{width: '100%', background: 'linear-gradient(135deg, #F3A634 0%, #E08B1B 100%)', color: '#fff', padding: '16px', border: 'none', borderRadius: '12px', fontWeight: 800, fontSize: '15px'}}
              >
                보라보훈 연대하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectLetter2;
