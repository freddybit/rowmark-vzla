import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'admin',
    renderMode: RenderMode.Client,
  },
  {
    path: 'admin/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'admin/**',
    renderMode: RenderMode.Client,
  },
  {
    path: 'login',
    renderMode: RenderMode.Client,
  },

  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
