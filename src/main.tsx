import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { applyTheme, loadTheme } from './theme';
import 'gyeol/gyeol.css'; // 결(gyeol) 디자인 시스템: 색 토큰, 겹 소재, 버튼 등
import './styles.css';

// 저장된 테마(라이트/다크)를 화면 그리기 전에 먼저 적용 (깜빡임 방지)
applyTheme(loadTheme());

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
