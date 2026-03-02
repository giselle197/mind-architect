import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DevRenderer } from "@mind-architect/renderer";

const renderer = new DevRenderer();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App renderer={renderer} />
  </StrictMode>,
)
