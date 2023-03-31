import Dashboard from '../containers/Admin/Dashboard/Loadable';

import MediaPage from '../containers/Admin/Media';

import ContentAddEdit from '../containers/Admin/SectionContent/AddEditPage/index';
import Content from '../containers/Admin/SectionContent/Loadable';

import AssignmentAddEdit from '../containers/Admin/Assignment/AddEditPage/index';
import Assignment from '../containers/Admin/Assignment/Loadable';
import NotificationPage from '../containers/Admin/Notification/Loadable';
import NotificationCatManagePage from '../containers/Admin/NotificationCategory/Loadable';
import NotificationAddEdit from '../containers/Admin/Notification/AddEditPage/Loadable';
import NotificationCatAddEditPage from '../containers/Admin/NotificationCategory/AddEdit/Loadable';
import Contact from '../containers/Admin/Contact';
import ContactView from '../containers/Admin/Contact/ViewContactList';
const adminRoutes = [
  {
    exact: true,
    path: 'dashboard',
    element: <Dashboard />,
  },
  {
    exact: true,
    path: 'section-content',
    element: <Content />,
  },
  {
    exact: true,
    path: 'section-content/add',
    element: <ContentAddEdit />,
  },
  {
    exact: true,
    path: 'section-content/edit/:id',
    element: <ContentAddEdit />,
  },

  {
    exact: true,
    path: 'assignments',
    element: <Assignment />,
  },
  {
    exact: true,
    path: 'assignments/add',
    element: <AssignmentAddEdit />,
  },
  {
    exact: true,
    path: 'assignments/edit/:id',
    element: <AssignmentAddEdit />,
  },

  {
    exact: true,
    path: 'notification-manage',
    element: <NotificationPage />,
  },
  {
    exact: true,
    path: 'notification-manage/add',
    element: <NotificationAddEdit />,
  },
  {
    path: 'notification-manage/edit/:id',
    element: <NotificationAddEdit />,
    exact: true,
  },
  {
    exact: true,
    path: 'notification-cat-manage',
    element: <NotificationCatManagePage />,
  },
  {
    exact: true,
    path: 'notification-cat-manage/add',
    element: <NotificationCatAddEditPage />,
  },
  {
    exact: true,
    path: 'notification-cat-manage/edit/:id',
    element: <NotificationCatAddEditPage />,
  },
  {
    path: 'contact-manage',
    element: <Contact />,
    exact: true,
  },
  {
    path: 'contact-manage/view/:id',
    element: <ContactView />,
    exact: true,
  },

  {
    path: 'media-manage',
    element: <MediaPage />,
    exact: true,
  },
];

export default adminRoutes;
