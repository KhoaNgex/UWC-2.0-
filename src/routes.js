import { Navigate, useRoutes } from 'react-router-dom';

import AppLayout from './layouts';

import LoginPage from './pages/login-page';
import ShiftPage from './pages/shift-page';
import TaskPage from './pages/task-page';
import EmployeePage from './pages/employee-page';
import VehiclePage from './pages/vehicle-page';
import MCPPage from './pages/mcp-page';
import NotFoundPage from './pages/not-found-page';

import { AddTaskPage } from './pages/add-edit-task-page';
import { EditTaskPage } from './pages/add-edit-task-page';
import TaskDetailPage from './pages/task-detail-page';
import RoutePlannerPage from './pages/route-planner-page';
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/app',
      element: <AppLayout />,
      children: [
        { element: <Navigate to="/app/shift" />, index: true },
        {
          path: 'shift',
          element: <ShiftPage />,
        },
        { path: 'shift/:shiftid', element: <TaskPage /> },
        { path: 'task/:taskid', element: <TaskDetailPage /> },
        { path: 'route-planner/:taskid', element: <RoutePlannerPage /> },
        { path: 'addTask', element: <AddTaskPage /> },
        { path: 'editTask/:taskid', element: <EditTaskPage /> },
        { path: 'employee', element: <EmployeePage /> },
        { path: 'vehicle', element: <VehiclePage /> },
        { path: 'mcp', element: <MCPPage /> },
      ],
    },
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      path: '/uwc-bit-by-bit-deploy',
      element: <LoginPage />,
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);
  return routes;
}
