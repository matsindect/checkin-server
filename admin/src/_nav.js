export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer'
    },
    {
      title: true,
      name: 'Listing Types',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Suppliers',
      url: '/supplier',
      icon: 'fa fa-vcard',
      children: [
        {
          name: 'All Suppliers',
          url: '/supplier/allsuppliers'
        },
        {
          name: 'Add New Supplier',
          url: '/supplier/addsuppliers'
        }
      ]
    },
    {
      name: 'Specifiers',
      url: '/specifier',
      icon: 'fa fa-archive',
      children: [
        {
          name: 'All Specifiers',
          url: '/specifier/allspecifier'
        },
        {
          name: 'Add New Specifier',
          url: '/specifier/addspecifier'
        }
      ]
    },
    {
      name: 'Projects',
      url: '/projects',
      icon: 'fa fa-puzzle-piece',
      children: [
        {
          name: 'All Projects',
          url: '/projects/allprojects'
        },
        {
          name: 'Add New Projects',
          url: '/projects/addproject'
        }
      ]
    },
    {
      name: 'Contacts',
      url: '/contacts',
      icon: 'fa fa-address-book-o',
      children: [
        {
          name: 'All Contatcs',
          url: '/contacts/allcontacts'
        },
        {
          name: 'Add New Contact',
          url: '/contacts/addcontacts'
        }
      ]
    },
    {
      title: true,
      name: 'Taxonomies',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Supplier type',
      url: '/taxonomies/addsupplier-type',
      icon: 'icon-star'
    },
    {
      name: 'Specifier Types',
      url: '/taxonomies/addspecifiertype',
      icon: 'icon-star'
    },
    {
      name: 'Project Types',
      url: '/taxonomies/addprojecttype',
      icon: 'icon-star'
    },
    {
      name: 'Categories',
      url: '/taxonomies/addcategory',
      icon: 'icon-star'
    },
    {
      name: 'Key Project',
      url: '/taxonomies/addkeyprojects',
      icon: 'icon-star'
    },
    {
      name: 'Sectors',
      url: '/taxonomies/addsector',
      icon: 'icon-star'
    },
    {
      name: 'Products',
      url: '/taxonomies/addproduct',
      icon: 'icon-star'
    },
    {
      divider: true
    },
    {
      title: true,
      name: 'Extras'
    },
    {
      name: 'Pages',
      url: '/pages',
      icon: 'icon-star',
      children: [
        {
          name: 'Login',
          url: '/pages/login',
          icon: 'icon-star'
        },
        {
          name: 'Register',
          url: '/pages/register',
          icon: 'icon-star'
        },
        {
          name: 'Error 404',
          url: '/pages/404',
          icon: 'icon-star'
        },
        {
          name: 'Error 500',
          url: '/pages/500',
          icon: 'icon-star'
        }
      ]
    },
    {
      name: 'Disabled',
      url: '/dashboard',
      icon: 'icon-ban',
      badge: {
        variant: 'secondary',
        text: 'NEW'
      },
      attributes: { disabled: true }
    }
  ]
};
