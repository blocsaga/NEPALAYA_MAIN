import { Route, Routes } from 'react-router-dom';
import NotFoundPage from '../../containers/NotFoundPage';
import routes from '../../routes/user';

const switchRoutes = (
  <Routes>
    {routes.map((prop) => (
      <Route key={prop.path} {...prop} />
    ))}
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

const UserLayout = () => (
  <>
    <div className="flex-1">
      <div>{switchRoutes}</div>
    </div>
  </>
);

export default UserLayout;
