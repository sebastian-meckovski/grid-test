import { withNavigationWatcher } from './contexts/navigation';
import { HomePage, TasksPage, Tasks2Page, ProfilePage } from './pages';

const routes = [
  {
    path: '/tasks',
    component: TasksPage
  },
  {
    path: '/tasks2',
    component: Tasks2Page
  },
  {
    path: '/profile',
    component: ProfilePage
  },
  {
    path: '/home',
    component: HomePage
  }
];

 export default routes.map(route => {
  return {
    ...route,
    component: withNavigationWatcher(route.component)
  };
});
