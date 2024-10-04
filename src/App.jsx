import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './assets/pages/Home';
import Tour from './assets/pages/Tour';
import Login from './assets/pages/Login';
import SignUp from './assets/pages/SignUp';
import { useMemo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from './assets/pages/UserContext';
import NotFound from './assets/pages/NotFoudn';
import Profile from './assets/pages/Profile';
import ResetPassword from './assets/pages/ResetPassword';

const queryClient = new QueryClient();

function App() {
  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/view/:slug',
          element: <Tour />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/signup',
          element: <SignUp />,
        },
        {
          path: '/profile',
          element: <Profile />,
          errorElement: <NotFound />,
        },
        {
          path: '/resetPassword/:token',
          element: <ResetPassword />,
          errorElement: <NotFound />
        },
        {
          path: '*',
          element: <NotFound />,
        },
        
      ]),
    []
  );

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
