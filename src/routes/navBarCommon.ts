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
        title: 'Application',
        icon: FileCopyIcon,
        href: PATH_NAME.APPLICATION,
        label: DRAWER_MENU_LABEL.APPLICATION,
        items: [
          {
            title: 'Add Application',
            icon: AddIcon,
            href: PATH_NAME.APPLICATION_ADD,
            label: DRAWER_MENU_LABEL.APPLICATION_ADD,
          },
          {
            title: 'List Application',
            icon: ViewListIcon,
            href: PATH_NAME.APPLICATION_LIST,
            label: DRAWER_MENU_LABEL.APPLICATION_LIST,
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
      {
        title: 'Solution',
        icon: CategoryIcon,
        href: PATH_NAME.SOLUTION,
        label: DRAWER_MENU_LABEL.SOLUTION,
        items: [
          {
            title: 'Add Solution',
            icon: AddIcon,
            href: PATH_NAME.SOLUTION_ADD,
            label: DRAWER_MENU_LABEL.SOLUTION_ADD,
          },
          {
            title: 'List Solution',
            icon: ViewListIcon,
            href: PATH_NAME.SOLUTION_LIST,
            label: DRAWER_MENU_LABEL.SOLUTION_LIST,
          },
        ],
      },
      {
        title: 'Manager',
        icon: CategoryIcon,
        href: PATH_NAME.MANAGER,
        label: DRAWER_MENU_LABEL.MANAGER,
        items: [
          {
            title: 'Add Manager',
            icon: AddIcon,
            href: PATH_NAME.MANAGER_ADD,
            label: DRAWER_MENU_LABEL.MANAGER_ADD,
          },
          {
            title: 'List Manager',
            icon: ViewListIcon,
            href: PATH_NAME.MANAGER_LIST,
            label: DRAWER_MENU_LABEL.MANAGER_LIST,
          },
        ],
      },
      {
        title: 'About Us',
        icon: CategoryIcon,
        href: PATH_NAME.ABOUTUS,
        label: DRAWER_MENU_LABEL.ABOUTUS,
        items: [
          {
            title: 'List About Us',
            icon: ViewListIcon,
            href: PATH_NAME.ABOUTUS_LIST,
            label: DRAWER_MENU_LABEL.ABOUTUS_LIST,
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
