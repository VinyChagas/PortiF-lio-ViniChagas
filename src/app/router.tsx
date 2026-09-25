import { Route, Routes } from 'react-router-dom';
import { RouteTransition } from '@/app/RouteTransition';
import { HomePage } from '@/pages/Home';
import { NotFoundPage } from '@/pages/NotFound';
import { ProjectDetailPage } from '@/pages/Projects/ProjectDetail';
import { ProjectsPage } from '@/pages/Projects';

export function AppRouter() {
  return (
    <RouteTransition
      renderRoutes={(location) => (
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projetos" element={<ProjectsPage />} />
          <Route path="/projetos/:slug" element={<ProjectDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      )}
    />
  );
}
