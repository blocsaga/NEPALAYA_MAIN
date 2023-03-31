import EditorFileSelectPage from '../containers/EditorFileSelect';
import ForgotPasswordUserPage from '../containers/ForgotPasswordUserPage/Loadable';
import HomePage from '../containers/HomePage';
import LoginUserPage from '../containers/LoginUserPage/Loadable';
import ResetPasswordPage from '../containers/ResetPasswordPage/Loadable';
import SignupUserPage from '../containers/SignupUserPage/Loadable';
import VerifyEmail from '../containers/VerifyEmail/Loadable';

const publicRoutes = [
  {
    exact: true,
    path: '/',
    element: <HomePage />,
  },
  {
    exact: true,
    path: '/verify/:email/:code',
    element: <VerifyEmail />,
  },
  {
    exact: true,
    path: '/verify/:email',
    element: <VerifyEmail />,
  },
  {
    exact: true,
    path: '/editor-file-select',
    element: <EditorFileSelectPage />,
  },
  {
    exact: true,
    path: '/login',
    element: <LoginUserPage />,
  },
  {
    exact: true,
    path: '/signup',
    element: <SignupUserPage />,
  },
  {
    exact: true,
    path: '/forgot-password-user',
    element: <ForgotPasswordUserPage />,
  },
  {
    exact: true,
    path: '/reset-password/:email/:code',
    element: <ResetPasswordPage />,
  },
  {
    exact: true,
    path: '/reset-password/:email',
    element: <ResetPasswordPage />,
  },
];

export default publicRoutes;
