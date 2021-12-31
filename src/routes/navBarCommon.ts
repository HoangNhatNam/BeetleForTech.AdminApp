// material icon
import AddIcon from '@material-ui/icons/Add';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ViewListIcon from '@material-ui/icons/ViewList';
import PeopleIcon from '@material-ui/icons/People';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import CategoryIcon from '@material-ui/icons/Category';

// configs
import { PATH_NAME, DRAWER_MENU_LABEL } from 'configs';

export const navBarCommon = [
  {
    subheader: 'Application',
    items: [
      {
        title: 'Report',
        href: PATH_NAME.DASHBOARD,
        icon: DashboardIcon,
        label: DRAWER_MENU_LABEL.DASHBOARD,
      },
    ],
  },
  {
    subheader: 'Dashboard',
    items: [
      {
        title: 'Post',
        icon: FileCopyIcon,
        href: PATH_NAME.POST,
        label: DRAWER_MENU_LABEL.POST,
        items: [
          {
            title: 'Add Post',
            icon: AddIcon,
            href: PATH_NAME.POST_ADD,
            label: DRAWER_MENU_LABEL.POST_ADD,
          },
          {
            title: 'List Post',
            icon: ViewListIcon,
            href: PATH_NAME.POST_LIST,
            label: DRAWER_MENU_LABEL.POST_LIST,
          },
        ],
      },
      {
        title: 'Contact',
        icon: ContactMailIcon,
        href: PATH_NAME.CONTACT,
        label: DRAWER_MENU_LABEL.CONTACT,
        items: [
          {
            title: 'List Contact',
            icon: ViewListIcon,
            href: PATH_NAME.CONTACT_LIST,
            label: DRAWER_MENU_LABEL.CONTACT_LIST,
          },
        ],
      },
      {
        title: 'Demo',
        icon: ContactMailIcon,
        href: PATH_NAME.DEMO,
        label: DRAWER_MENU_LABEL.DEMO,
        items: [
          {
            title: 'List Demo',
            icon: ViewListIcon,
            href: PATH_NAME.DEMO_LIST,
            label: DRAWER_MENU_LABEL.DEMO_LIST,
          },
          {
            title: 'Tools Manages',
            icon: ViewListIcon,
            href: PATH_NAME.TOOLSMANAGES_LIST,
            label: DRAWER_MENU_LABEL.TOOLSMANAGES_LIST,
          },
        ],
      },
      {
        title: 'Category',
        icon: CategoryIcon,
        href: PATH_NAME.CATEGORY,
        label: DRAWER_MENU_LABEL.CATEGORY,
        items: [
          {
            title: 'List Category',
            icon: ViewListIcon,
            href: PATH_NAME.CATEGORY_LIST,
            label: DRAWER_MENU_LABEL.CATEGORY_LIST,
          },
        ],
      },
      {
        title: 'Partner',
        icon: CategoryIcon,
        href: PATH_NAME.PARTNER,
        label: DRAWER_MENU_LABEL.PARTNER,
        items: [
          {
            title: 'Add Partner',
            icon: AddIcon,
            href: PATH_NAME.PARTNER_ADD,
            label: DRAWER_MENU_LABEL.PARTNER_ADD,
          },
          {
            title: 'List Partner',
            icon: ViewListIcon,
            href: PATH_NAME.PARTNER_LIST,
            label: DRAWER_MENU_LABEL.PARTNER_LIST,
          },
        ],
      },
    ],
  },
  {
    subheader: 'Users',
    items: [
      {
        title: 'Users',
        icon: PeopleIcon,
        href: PATH_NAME.USERS,
        label: DRAWER_MENU_LABEL.USERS,
      },
    ],
  },
];
