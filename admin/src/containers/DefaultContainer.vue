<template>
  <div class="app">
    <DefaultHeader/>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader/>
        <SidebarForm/>
        <SidebarNav :navItems="nav"></SidebarNav>
        <SidebarFooter/>
        <SidebarMinimizer/>
      </AppSidebar>
      <main class="main">
        <Breadcrumb :list="list"/>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
      <AppAside fixed>
        <!--aside-->
        <DefaultAside/>
      </AppAside>
    </div>
    <DefaultFooter/>
  </div>
</template>

<script>
import nav from '@/_nav';
import {
  Sidebar as AppSidebar,
  SidebarFooter,
  SidebarForm,
  SidebarHeader,
  SidebarMinimizer,
  SidebarNav,
  Aside as AppAside,
  Breadcrumb
} from '@coreui/vue';
import DefaultAside from './DefaultAside';
import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt';
import DefaultHeader from './DefaultHeader';
import DefaultFooter from './DefaultFooter';

export default {
  name: 'DefaultContainer',
  components: {
    AppSidebar,
    AppAside,
    Breadcrumb,
    DefaultAside,
    DefaultHeaderDropdownAccnt,
    SidebarForm,
    SidebarFooter,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer,
    DefaultFooter,
    DefaultHeader
  },
  data() {
    return {
      nav: nav.items
    };
  },
  computed: {
    name() {
      return this.$route.name;
    },
    list() {
      return this.$route.matched.filter(
        route => route.name || route.meta.label
      );
    }
  },
  async created() {
    this.$store.dispatch('GET_CATEGORIES');
    this.$store.dispatch('GET_SPECIFIERTYPE');
    this.$store.dispatch('GET_SUPPLIERTYPE');
    this.$store.dispatch('GET_PROJECTTYPE');
    this.$store.dispatch('GET_CONTACT');
    this.$store.dispatch('GET_PROJECT');
    this.$store.dispatch('GET_SPECIFIER');
    this.$store.dispatch('GET_SUPPLIER');
    this.$store.dispatch('GET_SECTOR');
    this.$store.dispatch('GET_PRODUCTS');
    this.$store.dispatch('GET_KEYPROJECTS');
    this.$store.dispatch('GET_CITY');
    this.$store.dispatch('GET_COUNTRY');
  }
};
</script>
