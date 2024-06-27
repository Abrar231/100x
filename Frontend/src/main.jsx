import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App.jsx'
import './index.css'
import HomeFeed from './pages/HomeFeed.jsx';
import Login from './pages/Login.jsx';
import UserProfile from './pages/UserProfile.jsx';
import Test from './pages/Test.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'
import { UserProvider } from './context/UserProvider.jsx'
import PrivateRoute from './components/PrivateRoute.jsx';
import PostPage from './pages/PostPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "home",
    element: <PrivateRoute component={<HomeFeed />} />,
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: ":username",
    element: <PrivateRoute component={<UserProfile />} />,
  },
  {
    path: "post/:id",
    element: <PrivateRoute component={<PostPage />} />,
  },
  {
    path: "test",
    element: <Test />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </AuthProvider>
  // </React.StrictMode>,
)
