import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DevRenderer, DevTreeDiagramRenderer } from "@mind-architect/renderer";

// const renderer = new DevRenderer();
const renderer = new DevTreeDiagramRenderer();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App renderer={renderer} />
  </StrictMode>,
)
