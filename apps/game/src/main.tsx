import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { FlatRenderer } from "@mind-architect/renderer-flat/src/FlatRenderer";

const renderer = new FlatRenderer();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App renderer={renderer} />
  </StrictMode>,
)
