import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 포트: PORT 환경변수가 있으면 그 값, 없으면 5180 (mijbot의 5173과 겹치지 않게)
export default defineConfig({
  plugins: [react()],
  server: { port: Number(process.env.PORT) || 5180, host: true },
});
