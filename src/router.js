import React from 'react';
import { useRoutes } from 'react-router-dom';
import { Home } from './pages/home';
import { Header } from './components/header';
import { Bottom } from './components/bottom';
import { Practice } from './pages/practice';
import { StoryTelling } from './pages/story';
import style from './app.module.scss';

export default function Router() {
  const routes = useRoutes([
    { path: 'story', element: <StoryTelling /> },
    { path: 'practice', element: <Practice /> },
    {
      path: '*',
      element: (
        <div className={style.container}>
          <Header />
          <Home />
          <Bottom />
        </div>
      ),
    },
  ]);
  return routes;
}
