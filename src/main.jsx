import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import TranslatePage from './pages/TranslatePage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import HowToUsePage from './pages/HowToUsePage.jsx';
import RoadmapPage from './pages/RoadmapPage.jsx';
import ChangeLogPage from './pages/ChangeLogPage.jsx';
import EnhancementsPage from './pages/EnhancementsPage.jsx';
import CreditsPage from './pages/CreditsPage.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'translate/:mode', element: <TranslatePage /> },
      { path: 'chat', element: <ChatPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'how-to-use', element: <HowToUsePage /> },
      { path: 'roadmap', element: <RoadmapPage /> },
      { path: 'changelog', element: <ChangeLogPage /> },
      { path: 'enhancements', element: <EnhancementsPage /> },
      { path: 'credits', element: <CreditsPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);