import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectLetter1: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const navigate = useNavigate();
  const hasLoadedChartData = useRef(false);

  useEffect(() => {
    // Setup Chart.js only once if not loaded
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
              labels: ['캠페인 접촉', '필요성 공감', '실제 참여'],
              datasets: [{
                label: '비율 (%)',
                data: [90, 72, 21.5],
                backgroundColor: ['#fdf1da', '#f6c577', '#F3A634'],
                borderRadius: 6,
                barThickness: 24, // reduced for mobile
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: { beginAtZero: true, max: 100, grid: { color: '#f3f4f6' }, ticks: { font: { weight: 'bold' } } },
                x: { grid: { display: false }, ticks: { font: { weight: 'bold' }, color: '#4b5563' } }
              },
              plugins: { legend: { display: false }, tooltip: { callbacks: { label: (c: any) => c.dataIndex === 2 ? '18~25%' : c.parsed.y + '%' } } }
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
                barThickness: 14 // reduced for mobile
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
      // We don't necessarily destroy Charts manually here because we unmount the component anyway
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col relative z-50 pb-20">
      <header className="sticky top-0 bg-[#fafafa]/90 backdrop-blur-md px-5 py-4 flex justify-between items-center z-50 border-b border-gray-200">
        <button onClick={onBack} className="p-1">
          <i className="fa-solid fa-chevron-left text-lg"></i>
        </button>
        <span className="font-bold text-sm">독립 후손 프로젝트</span>
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
            <img src="https://i.ifh.cc/CBB4sT.jpg" alt="독립운동가 썸네일" className="bbi-project-thumb" />
            <div className="bbi-text-area">
              <div style={{background:'#d1fae5', color:'#065f46', padding:'6px 12px', fontSize:'13px', fontWeight:700, borderRadius:'999px'}}>✅ 진행 완료</div>
              <div className="bbi-title">희생을 잇는 힘:<br/>독립 후손을 위한 캠페인</div>
              <p className="bbi-subtitle">단순한 후원 요청이 아닌, 당신의 참여와 기록으로 증명하는 사회적 명분</p>
              <div className="bbi-info">
                <div className="bbi-info-item">📅 2026.02.01 ~ 2026.03.07</div>
                <div className="bbi-info-item">🤝 참여형 캠페인</div>
                <div className="bbi-info-item">👥 대상: 20대 청년 누구나</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bbi-wrapper">
          <div className="bbi-section-box">
            <div className="bbi-section-title">1. 독립유공자 후손 지원의 구조적 한계</div>
            <div className="bbi-section-content">
              <p>대한민국의 독립을 위해 헌신한 독립운동가는 공식적으로 <strong>약 15,000명 이상</strong>으로 추정됩니다.</p>
              <p>현행 제도상 주요 지원은 직계 1~2대 중심으로 제한되어 <strong>세대가 내려갈수록 실질적인 지원은 급격히 줄어듭니다.</strong></p>
              <div className="bbi-benefit-box">
                <div style={{fontWeight: 800, marginBottom: '8px'}}>⚠️ 실태 파악 현황</div>
                <ul style={{margin:0, paddingLeft: '16px', fontSize: '13px'}}>
                  <li>기초생활 수준 이하의 삶을 유지하는 가구 존재</li>
                  <li>안정적인 주거 환경을 확보하지 못한 사례</li>
                  <li>의료비 부담으로 치료를 미루는 사례</li>
                </ul>
              </div>
              <p>우리는 ‘기억하겠다’고 말해왔지만, <span className="bbi-highlight-text">그 기억이 후손들의 삶까지 이어지지는 못했습니다.</span></p>
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
                    <div style={{fontSize: '11px', color: '#ef4444', marginTop: '8px', textAlign: 'center', fontWeight: 'bold'}}>마음은 움직였지만 행동으로 이어지지 않습니다.</div>
                  </div>
                  <div>
                    <div style={{fontSize: '12px', fontWeight: 700, marginBottom: '8px', marginTop: '16px'}}>후원 참여 저해 요인</div>
                    <div className="bbi-chart-wrapper" style={{height: '140px'}}><canvas id="bbiReasonChart"></canvas></div>
                  </div>
                </div>
              </div>
              <p>결국 문제는 무관심이 아니라, <strong>참여 방식이 맞지 않았다는 데</strong> 있습니다.</p>
            </div>
          </div>

          <div className="bbi-section-box">
            <div className="bbi-section-title">3. 신규 프로젝트 소개</div>
            <div className="bbi-section-content">
              <p style={{fontWeight: 'bold', marginBottom: '12px'}}>뻔한 후원 방식으로는 더 이상 움직이지 않습니다.</p>
              <p>그래서 우리는 <strong>방식을 바꿨습니다.</strong></p>
              <p>누구나 참여할 수 있는 구조로 시작합니다. 그 현실에 대한 청년의 생각과 지지를 <span className="bbi-highlight-text">‘서명’과 ‘기록’으로 남기는 것.</span></p>
              <p>전시와 캠페인 자료로 연결되고, 청년들의 실제 목소리는 기업과 사회에 전달됩니다.</p>
            </div>
          </div>

          <div className="bbi-section-box">
            <div className="bbi-section-title">4. 핵심 결과</div>
            <div className="bbi-section-content">
              <div className="bbi-grid-list">
                <div className="bbi-grid-item" style={{borderLeft: '4px solid #F3A634'}}>
                  <div className="bbi-grid-title" style={{color: '#F3A634'}}>💡 1. 청년 지지 데이터</div>
                  <div className="bbi-grid-desc">청년들의 어떤 방식으로 공감하고 행동하는지에 대한 참여 데이터 확보.</div>
                </div>
                <div className="bbi-grid-item" style={{borderLeft: '4px solid #D98918'}}>
                  <div className="bbi-grid-title" style={{color: '#D98918'}}>📂 2. 기록 기반 인식 아카이브</div>
                  <div className="bbi-grid-desc">독립운동가 후손의 현실과 세대 간 반응을 담은 아카이브 구축.</div>
                </div>
                <div className="bbi-grid-item" style={{borderLeft: '4px solid #BC6D0E'}}>
                  <div className="bbi-grid-title" style={{color: '#BC6D0E'}}>💬 3. 기업 설득용 사회적 명분</div>
                  <div className="bbi-grid-desc">결론적으로 기업이 사회공헌과 후원에 참여할 수 있는 근거 제공.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bbi-right-section">
            <div className="bbi-tags">
              <span className="bbi-tag">#독립운동가후손</span>
              <span className="bbi-tag">#참여형캠페</span>
              <span className="bbi-tag">#인식아카이브</span>
            </div>
            <div className="bbi-right-title">프로젝트 요약</div>
            <div className="bbi-highlight-summary">
              <div className="bbi-summary-row">
                <div className="bbi-summary-label">방 식</div>
                <div style={{color: '#F3A634', fontWeight: 800}}>서명 및 캠페인 참여</div>
              </div>
              <div className="bbi-summary-row">
                <div className="bbi-summary-label">목 표</div>
                <div>사회적 명분 확보 및 기업 지원 유도</div>
              </div>
            </div>
            <div style={{marginTop: '20px'}}>
              <button
                disabled
                style={{width: '100%', background: '#e5e7eb', color: '#9ca3af', padding: '16px', border: 'none', borderRadius: '12px', fontWeight: 800, fontSize: '15px', cursor: 'not-allowed'}}
              >
                ✅ 진행 완료된 프로젝트입니다
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectLetter1;
