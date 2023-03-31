import {
  FaAddressCard,
  FaAlignLeft,
  FaBoxes,
  FaBoxOpen,
  FaChartBar,
  FaChartPie,
  FaCogs,
  FaEnvelope,
  FaExclamationTriangle,
  FaFileAlt,
  FaImages,
  FaLink,
  FaMailBulk,
  FaPencilAlt,
  FaPhotoVideo,
  FaPuzzlePiece,
  FaRegFile,
  FaRss,
  FaShieldAlt,
  FaSitemap,
  FaTenge,
  FaThLarge,
  FaUserShield,
  FaBell,
  FaStickyNote,
} from 'react-icons/fa';

const menu = [
  {
    key: '1',
    name: 'Dashboard',
    icon: <FaChartPie />,
    link: '/admin/dashboard',
  },
  {
    key: '2',
    name: 'For College',
    icon: <FaFileAlt />,
    menu: [
      {
        key: '2.1',
        name: 'Routine',
        icon: <FaAlignLeft />,
        link: '/admin/section-content',
      },
      {
        key: '2.2',
        name: 'Assignment',
        icon: <FaStickyNote />,
        link: '/admin/assignments',
      },
      {
        key: '2.3',
        name: 'Media',
        icon: <FaImages />,
        link: '/admin/media-manage',
      },
    ],
  },
  {
    key: '4',
    name: 'Notification',
    icon: <FaBell />,
    menu: [
      {
        key: '4.1',
        name: 'notification',
        icon: <FaPencilAlt />,
        link: '/admin/notification-manage',
      },
      {
        key: '4.2',
        name: 'Category',
        icon: <FaThLarge />,
        link: '/admin/notification-cat-manage',
      },
    ],
  },

  {
    key: '5',
    name: 'Contacts',
    icon: <FaAddressCard />,
    link: '/admin/contact-manage',
  },
];
export default menu;
