import React, { Fragment, lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// configs
import { PATH_NAME, USER_ROLE } from 'configs';

// types
import { IRoutes } from 'models/IRoutes';

// layouts
import MainLayout from 'layouts/MainLayout';

// containers
import AuthGuard from 'guards/AuthGuard';
import GuestGuard from 'guards/GuestGuard';

// route
import RoleRoute from './RoleRoute';

// modules
const Error404View = lazy(() => import('features/Error404View'));
const DenyView = lazy(() => import('features/DenyView'));

const PostAdd = lazy(() => import('features/Post/PostAdd'));
const PostList = lazy(() => import('features/Post/PostList'));
const PostDetail = lazy(() => import('features/Post/PostDetail'));
const PostEdit = lazy(() => import('features/Post/PostEdit'));

const ContactList = lazy(() => import('features/Contact/ContactList'));
const ContactDetail = lazy(() => import('features/Contact/ContactDetail'));

const DemoList = lazy(() => import('features/Demo/DemoList'));
const DemoDetail = lazy(() => import('features/Demo/DemoDetail'));

const ToolsManaAdd = lazy(() => import('features/ToolsManages/ToolsManaAdd'));
const ToolsManaList = lazy(() => import('features/ToolsManages/ToolsManaList'));
const ToolsManaEdit = lazy(() => import('features/ToolsManages/ToolsManaEdit'));

const CategoryAdd = lazy(() => import('features/Category/CategoryAdd'));
const CategoryList = lazy(() => import('features/Category/CategoryList'));
const CategoryEdit = lazy(() => import('features/Category/CategoryEdit'));

const PartnerAdd = lazy(() => import('features/Partner/PartnerAdd'));
const PartnerList = lazy(() => import('features/Partner/PartnerList'));
const PartnerEdit = lazy(() => import('features/Partner/PartnerEdit'));

const Users = lazy(() => import('features/Users'));
const UserAdd = lazy(() => import('features/Users/UserAdd'));
const UserEdit = lazy(() => import('features/Users/UserEdit'));
const UserDetail = lazy(() => import('features/Users/UserDetail'));

const ApplicationAdd = lazy(() => import('features/Application/AppAdd'));
const ApplicationList = lazy(() => import('features/Application/AppList'));
const ApplicationEdit = lazy(() => import('features/Application/AppEdit'));
const ApplicationDetail = lazy(() => import('features/Application/AppDetail'));

const SolutionAdd = lazy(() => import('features/Solution/SolutionAdd'));
const SolutionList = lazy(() => import('features/Solution/SolutionList'));
const SolutionEdit = lazy(() => import('features/Solution/SolutionEdit'));

const ManaAdd = lazy(() => import('features/Manager/ManagerAdd'));
const ManaList = lazy(() => import('features/Manager/ManagerList'));
const ManaEdit = lazy(() => import('features/Manager/ManagerEdit'));
const ManaDetail = lazy(() => import('features/Manager/ManagerDetail'));

const AboutList = lazy(() => import('features/AboutUs/AboutList'));
const AboutEdit = lazy(() => import('features/AboutUs/AboutEdit'));

const Dashboard = lazy(() => import('features/Dashboard'));
const Login = lazy(() => import('features/Login'));

const routesConfig: IRoutes[] = [
  {
    exact: true,
    path: '/',
    component: () => <Redirect to={PATH_NAME.DASHBOARD} />,
  },
  {
    exact: true,
    path: PATH_NAME.ERROR_404,
    component: Error404View,
  },
  {
    exact: true,
    guard: GuestGuard,
    path: PATH_NAME.LOGIN,
    component: Login,
  },
  {
    exact: true,
    path: PATH_NAME.ERROR_403,
    component: DenyView,
  },
  {
    path: '/',
    guard: AuthGuard,
    layout: MainLayout,
    routes: [
      {
        exact: true,
        path: PATH_NAME.DASHBOARD,
        component: Dashboard,
        requireRoles: [USER_ROLE.ADMIN, USER_ROLE.LEAD],
      },
      {
        exact: true,
        path: PATH_NAME.POST_LIST,
        component: PostList,
        requireRoles: [USER_ROLE.ADMIN, USER_ROLE.LEAD],
      },
      {
        exact: true,
        path: PATH_NAME.POST_ADD,
        component: PostAdd,
        requireRoles: [USER_ROLE.ADMIN],
      },
      {
        exact: true,
        path: PATH_NAME.POST_DETAIL,
        component: PostDetail,
        requireRoles: [USER_ROLE.ADMIN],
      },
      {
        exact: true,
        path: PATH_NAME.POST_EDIT,
        component: PostEdit,
        requireRoles: [USER_ROLE.ADMIN],
      },
      {
        exact: true,
        path: PATH_NAME.CONTACT_LIST,
        component: ContactList,
        requireRoles: [USER_ROLE.ADMIN],
      },
      {
        exact: true,
        path: PATH_NAME.CONTACT_DETAIL,
        component: ContactDetail,
        requireRoles: [USER_ROLE.ADMIN],
      },
      {
        exact: true,
        path: PATH_NAME.DEMO_LIST,
        component: DemoList,
        requireRoles: [USER_ROLE.ADMIN],
      },
      {
        exact: true,
        path: PATH_NAME.DEMO_DETAIL,
        component: DemoDetail,
        requireRoles: [USER_ROLE.ADMIN],
      },
      {
        exact: true,
        path: PATH_NAME.TOOLSMANAGES_ADD,
        component: ToolsManaAdd,
        requireRoles: [USER_ROLE.ADMIN],
      },
      {
        exact: true,
        path: PATH_NAME.TOOLSMANAGES_EDIT,
        component: ToolsManaEdit,
        requireRoles: [USER_ROLE.ADMIN],
      },
      {
        exact: true,
        path: PATH_NAME.TOOLSMANAGES_LIST,
        component: ToolsManaList,
        requireRoles: [USER_ROLE.ADMIN],
      },
      {
        exact: true,
        path: PATH_NAME.CATEGORY_ADD,
        component: CategoryAdd,
        requireRoles: [USER_ROLE.ADMIN],
      },
      {
        exact: true,
        path: PATH_NAME.CATEGORY_EDIT,
        component: CategoryEdit,
        requireRoles: [USER_ROLE.ADMIN],
      },
      {
        exact: true,
        path: PATH_NAME.CATEGORY_LIST,
        component: CategoryList,
        requireRoles: [USER_ROLE.ADMIN],
      },
      {
        exact: true,
        path: PATH_NAME.PARTNER_ADD,
        component: PartnerAdd,
        requireRoles: [USER_ROLE.ADMIN],
      },
      {
        exact: true,
        path: PATH_NAME.PARTNER_EDIT,
        component: PartnerEdit,
        requireRoles: [USER_ROLE.ADMIN],
      },
      {
        exact: true,
        path: PATH_NAME.PARTNER_LIST,
        component: PartnerList,
        requireRoles: [USER_ROLE.ADMIN],
      },
      {
        exact: true,
        path: PATH_NAME.USERS,
        component: Users,
        requireRoles: [USER_ROLE.ADMIN, USER_ROLE.LEAD],
      },
      {
        exact: true,
        path: PATH_NAME.USERS_ADD,
        component: UserAdd,
        requireRoles: [USER_ROLE.ADMIN],
      },
      {
        exact: true,
        path: PATH_NAME.USERS_EDIT,
        component: UserEdit,
        requireRoles: [USER_ROLE.ADMIN],
      },
      {
        exact: true,
        path: PATH_NAME.USERS_DETAIL,
        component: UserDetail,
        requireRoles: [USER_ROLE.ADMIN],
      },
      {
        exact: true,
        path: PATH_NAME.APPLICATION_ADD,
        component: ApplicationAdd,
        requireRoles: [USER_ROLE.ADMIN],
      },
      {
        exact: true,
        path: PATH_NAME.APPLICATION_LIST,
        component: ApplicationList,
        requireRoles: [USER_ROLE.ADMIN],
      },
      {
        exact: true,
        path: PATH_NAME.APPLICATION_EDIT,
        component: ApplicationEdit,
        requireRoles: [USER_ROLE.ADMIN],
      },
      {
        exact: true,
        path: PATH_NAME.APPLICATION_DETAIL,
        component: ApplicationDetail,
        requireRoles: [USER_ROLE.ADMIN],
      },
      {
        exact: true,
        path: PATH_NAME.SOLUTION_ADD,
        component: SolutionAdd,
        requireRoles: [USER_ROLE.ADMIN],
      },
      {
        exact: true,
        path: PATH_NAME.SOLUTION_LIST,
        component: SolutionList,
        requireRoles: [USER_ROLE.ADMIN],
      },
      {
        exact: true,
        path: PATH_NAME.SOLUTION_EDIT,
        component: SolutionEdit,
        requireRoles: [USER_ROLE.ADMIN],
      },
      {
        exact: true,
        path: PATH_NAME.MANAGER_ADD,
        component: ManaAdd,
        requireRoles: [USER_ROLE.ADMIN],
      },
      {
        exact: true,
        path: PATH_NAME.MANAGER_LIST,
        component: ManaList,
        requireRoles: [USER_ROLE.ADMIN],
      },
      {
        exact: true,
        path: PATH_NAME.MANAGER_EDIT,
        component: ManaEdit,
        requireRoles: [USER_ROLE.ADMIN],
      },
      {
        exact: true,
        path: PATH_NAME.MANAGER_DETAIL,
        component: ManaDetail,
        requireRoles: [USER_ROLE.ADMIN],
      },
      {
        exact: true,
        path: PATH_NAME.ABOUTUS_LIST,
        component: AboutList,
        requireRoles: [USER_ROLE.ADMIN],
      },
      {
        exact: true,
        path: PATH_NAME.ABOUTUS_EDIT,
        component: AboutEdit,
        requireRoles: [USER_ROLE.ADMIN],
      },
      {
        component: () => <Redirect to={PATH_NAME.ERROR_404} />,
      },
    ],
  },
  {
    path: '*',
    routes: [
      {
        exact: true,
        path: '/app',
        component: MainLayout,
      },
      {
        component: () => <Redirect to={PATH_NAME.ERROR_404} />,
      },
    ],
  },
];

const renderRoutes = (routes: IRoutes[]) => {
  return (
    <>
      {routes ? (
        <Suspense fallback={<div />}>
          <Switch>
            {routes.map((route: IRoutes, idx: number) => {
              const Guard = route.guard || Fragment;
              const Layout = route.layout || Fragment;
              const Component = route.component;
              const requireRoles = route.requireRoles || [];

              return (
                <Route
                  key={`routes-${idx}`}
                  path={route.path}
                  exact={route.exact}
                  render={(props: any) => (
                    <Guard>
                      <Layout>
                        {route.routes ? (
                          renderRoutes(route.routes)
                        ) : (
                          <RoleRoute requireRoles={requireRoles}>
                            <Component {...props} />
                          </RoleRoute>
                        )}
                      </Layout>
                    </Guard>
                  )}
                />
              );
            })}
          </Switch>
        </Suspense>
      ) : null}
    </>
  );
};

function Routes() {
  return renderRoutes(routesConfig);
}

export default Routes;
