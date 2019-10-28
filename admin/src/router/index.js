import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/store';
// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer');

// Views
const Dashboard = () => import('@/views/Dashboard');

const Colors = () => import('@/views/theme/Colors');
const Typography = () => import('@/views/theme/Typography');

const Charts = () => import('@/views/Charts');
const Widgets = () => import('@/views/Widgets');

// Views - Components
const Cards = () => import('@/views/base/Cards');
const AddSpecifier = () => import('@/views/specifier/AddSpecifier');
const AllSpecifiers = () => import('@/views/specifier/AllSpecifiers');
const EditSpecifier = () => import('@/views/specifier/EditSpecifier');
const AddSupplierType = () => import('@/views/taxonomies/AddSupplierType');
const EditSupplierType = () => import('@/views/taxonomies/EditSupplierType');
const AllSuppliers = () => import('@/views/supplier/AllSuppliers');
const EditSupplier = () => import('@/views/supplier/EditSupplier');
const AddSuppliers = () => import('@/views/supplier/AddSupplier');
const AllContacts = () => import('@/views/contacts/AllContacts');
const EditContacts = () => import('@/views/contacts/EditContacts');
const AddContacts = () => import('@/views/contacts/Contacts');
const AllProjects = () => import('@/views/projects/AllProjects');
const AddProject = () => import('@/views/projects/AddProject');
const EditProjects = () => import('@/views/projects/EditProjects');
const AllSpecifierTypes = () => import('@/views/taxonomies/AllSpecifierTypes');
const AddSpecifierType = () => import('@/views/taxonomies/AddSpecifierType');
const AllProjectTypes = () => import('@/views/taxonomies/AllProjectTypes');
const AddProjectType = () => import('@/views/taxonomies/AddProjectType');
const AllCategories = () => import('@/views/taxonomies/AllCategories');
const AddCategory = () => import('@/views/taxonomies/AddCategory');
const AllKeyProjects = () => import('@/views/taxonomies/AllKeyProjects');
const AddKeyProject = () => import('@/views/taxonomies/AddKeyProject');
const AllKeyClients = () => import('@/views/taxonomies/AllKeyClients');
const AddKeyClient = () => import('@/views/taxonomies/AddKeyClient');
const AllSectors = () => import('@/views/taxonomies/AllSectors');
const AddSector = () => import('@/views/taxonomies/AddSector');
const AllProducts = () => import('@/views/taxonomies/AllProducts');
const AddProduct = () => import('@/views/taxonomies/AddProduct');
const Forms = () => import('@/views/base/Forms');
const Switches = () => import('@/views/base/Switches');
const Tables = () => import('@/views/base/Tables');
const Tabs = () => import('@/views/base/Tabs');
const Breadcrumbs = () => import('@/views/base/Breadcrumbs');
const Carousels = () => import('@/views/base/Carousels');
const Collapses = () => import('@/views/base/Collapses');
const Jumbotrons = () => import('@/views/base/Jumbotrons');
const ListGroups = () => import('@/views/base/ListGroups');
const Navs = () => import('@/views/base/Navs');
const Navbars = () => import('@/views/base/Navbars');
const Paginations = () => import('@/views/base/Paginations');
const Popovers = () => import('@/views/base/Popovers');
const ProgressBars = () => import('@/views/base/ProgressBars');
const Tooltips = () => import('@/views/base/Tooltips');

// Views - Buttons
const StandardButtons = () => import('@/views/buttons/StandardButtons');
const ButtonGroups = () => import('@/views/buttons/ButtonGroups');
const Dropdowns = () => import('@/views/buttons/Dropdowns');
const BrandButtons = () => import('@/views/buttons/BrandButtons');

// Views - Icons
const Flags = () => import('@/views/icons/Flags');
const FontAwesome = () => import('@/views/icons/FontAwesome');
const SimpleLineIcons = () => import('@/views/icons/SimpleLineIcons');
const CoreUIIcons = () => import('@/views/icons/CoreUIIcons');

// Views - Notifications
const Alerts = () => import('@/views/notifications/Alerts');
const Badges = () => import('@/views/notifications/Badges');
const Modals = () => import('@/views/notifications/Modals');

// Views - Pages
const Page404 = () => import('@/views/pages/Page404');
const Page500 = () => import('@/views/pages/Page500');
const Login = () => import('@/views/pages/Login');
const Register = () => import('@/views/pages/Register');

// Users
const Users = () => import('@/views/users/Users');
const User = () => import('@/views/users/User');

Vue.use(Router);

function configRoutes() {
  return [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: DefaultContainer,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'theme',
          redirect: '/theme/colors',
          name: 'Theme',
          component: {
            render(c) {
              return c('router-view');
            }
          },
          children: [
            {
              path: 'colors',
              name: 'Colors',
              component: Colors
            },
            {
              path: 'typography',
              name: 'Typography',
              component: Typography
            }
          ]
        },
        {
          path: 'charts',
          name: 'Charts',
          component: Charts
        },
        {
          path: 'widgets',
          name: 'Widgets',
          component: Widgets
        },
        {
          path: 'users',
          meta: { label: 'Users' },
          component: {
            render(c) {
              return c('router-view');
            }
          },
          children: [
            {
              path: '',
              component: Users
            },
            {
              path: ':id',
              meta: { label: 'User Details' },
              name: 'User',
              component: User
            }
          ]
        },
        {
          path: 'supplier',
          redirect: '/supplier/addsuppliers',
          name: 'Supplier',
          component: {
            render(c) {
              return c('router-view');
            }
          },
          children: [
            {
              path: 'allsuppliers',
              meta: { label: 'All Supplier' },
              component: {
                render(c) {
                  return c('router-view');
                }
              },
              children: [
                {
                  path: '',
                  component: AllSuppliers
                },
                {
                  path: ':id',
                  meta: { label: 'Supplier Details' },
                  name: 'Edit Supplier',
                  component: EditSupplier
                }
              ]
            },
            {
              path: 'addsuppliers',
              name: 'Add Supplier',
              component: AddSuppliers
            }
          ]
        },
        {
          path: 'specifier',
          redirect: '/specifier/addspecifier',
          name: 'Specifier',
          component: {
            render(c) {
              return c('router-view');
            }
          },
          children: [
            {
              path: 'allspecifier',
              meta: { label: 'All Specifiers' },
              component: {
                render(c) {
                  return c('router-view');
                }
              },
              children: [
                {
                  path: '',
                  component: AllSpecifiers
                },
                {
                  path: ':id',
                  meta: { label: 'Specifier Details' },
                  name: 'Edit Specifier',
                  component: EditSpecifier
                }
              ]
            },
            {
              path: 'addspecifier',
              name: 'Add Specifier',
              component: AddSpecifier
            }
          ]
        },
        {
          path: 'projects',
          redirect: '/projects/addproject',
          name: 'Projects',
          component: {
            render(c) {
              return c('router-view');
            }
          },
          children: [
            {
              path: 'allprojects',
              meta: { label: 'All Projects' },
              component: {
                render(c) {
                  return c('router-view');
                }
              },
              children: [
                {
                  path: '',
                  component: AllProjects
                },
                {
                  path: ':id',
                  meta: { label: 'Project Details' },
                  name: 'Edit Project',
                  component: EditProjects
                }
              ]
            },
            {
              path: 'addproject',
              name: 'Add Project',
              component: AddProject
            }
          ]
        },
        {
          path: 'contacts',
          redirect: '/contacts/addcontacts',
          name: 'Contacts',
          component: {
            render(c) {
              return c('router-view');
            }
          },
          children: [
            {
              path: 'allcontacts',
              meta: { label: 'All Contacts' },
              component: {
                render(c) {
                  return c('router-view');
                }
              },
              children: [
                {
                  path: '',
                  component: AllContacts
                },
                {
                  path: ':id',
                  meta: { label: 'Supplier Details' },
                  name: 'Edit Supplier',
                  component: EditContacts
                }
              ]
            },
            {
              path: 'addcontacts',
              name: 'Add Contacts',
              component: AddContacts
            }
          ]
        },
        {
          path: 'taxonomies',
          redirect: '/taxonomies/allspecifiertypes',
          name: 'Taxonomies',
          meta: {
            requiresAuth: true
          },
          component: {
            render(c) {
              return c('router-view');
            }
          },
          children: [
            {
              path: 'addspecifiertype',
              meta: { label: 'Specifier Type' },
              component: {
                render(c) {
                  return c('router-view');
                }
              },
              children: [
                {
                  path: '',
                  component: AddSpecifierType
                },
                {
                  path: ':id',
                  meta: { label: 'Specifier Type Details' },
                  name: 'Specifier Type',
                  component: AllSpecifierTypes
                }
              ]
            },
            {
              path: 'addprojecttype',
              meta: { label: 'Project Type' },
              component: {
                render(c) {
                  return c('router-view');
                }
              },
              children: [
                {
                  path: '',
                  component: AddProjectType
                },
                {
                  path: ':id',
                  meta: { label: 'Project Type Details' },
                  name: 'Project Type',
                  component: AllProjectTypes
                }
              ]
            },
            {
              path: 'addcategory',
              meta: { label: 'Categories' },
              component: {
                render(c) {
                  return c('router-view');
                }
              },
              children: [
                {
                  path: '',
                  component: AddCategory
                },
                {
                  path: ':id',
                  meta: { label: 'Category Details' },
                  name: 'Category',
                  component: AllCategories
                }
              ]
            },
            {
              path: 'addsupplier-type',
              meta: { label: 'Supplier Types' },
              component: {
                render(c) {
                  return c('router-view');
                }
              },
              children: [
                {
                  path: '',
                  component: AddSupplierType
                },
                {
                  path: ':id',
                  meta: { label: 'Supplier Type Details' },
                  name: 'Supplier Type',
                  component: EditSupplierType
                }
              ]
            },
            {
              path: 'addkeyprojects',
              meta: { label: 'Key Project' },
              component: {
                render(c) {
                  return c('router-view');
                }
              },
              children: [
                {
                  path: '',
                  component: AddKeyProject
                },
                {
                  path: ':id',
                  meta: { label: 'Key Project Details' },
                  name: 'Key Project',
                  component: AllKeyProjects
                }
              ]
            },
            {
              path: 'addsector',
              meta: { label: 'Sector' },
              component: {
                render(c) {
                  return c('router-view');
                }
              },
              children: [
                {
                  path: '',
                  component: AddSector
                },
                {
                  path: ':id',
                  meta: { label: 'Sector Details' },
                  name: 'Sector',
                  component: AllSectors
                }
              ]
            },
            {
              path: 'addproduct',
              meta: { label: 'Product' },
              component: {
                render(c) {
                  return c('router-view');
                }
              },
              children: [
                {
                  path: '',
                  component: AddProduct
                },
                {
                  path: ':id',
                  meta: { label: 'Product Details' },
                  name: 'Product',
                  component: AllProducts
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render(c) {
          return c('router-view');
        }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        }
      ]
    }
  ];
}

let router = new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next('/');
  } else {
    next();
  }
});
export default router;
