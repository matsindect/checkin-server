<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col cols="12">
          <b-card
            header-tag="header"
            footer-tag="footer">
            <div slot="header">
              <i class="fa fa-align-justify"></i><strong>Projects</strong>
            </div>
            <table class="table table-sm">
  <thead class="thead-default">
    <tr>
      <th>#</th>
      <th>Project Name</th>
      <th>Project Type</th>
      <th>Project Stage</th>
      <th>Project Owner</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="project in projects" :key="project._id" @click="rowClicked(project)">
      <th scope="row">1</th>
      <td>{{project.project_name}}</td>
      <td>{{project.project_type[0].label}}</td>
      <td>{{project.project_stage}}</td>
      <td>{{project.project_owner}}</td>
    </tr>
    <nav>
      <b-pagination size="sm" :total-rows="getRowCount(projects)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
    </nav>
  </tbody>
</table>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'breadcrumbs',
  data() {
    return {
      items: [],
      show: true,
      currentPage: 1,
      perPage: 5,
      totalRows: 0,
      show: true
    };
  },
  methods: {
    getRowCount(items) {
      return items.length;
    },
    userLink(_id) {
      return `allprojects/${_id.toString()}`;
    },
    rowClicked(item) {
      const userLink = this.userLink(item._id);
      this.$router.push({ path: userLink });
    }
  },
  computed: {
    projects() {
      return this.$store.state.Projects.projects;
    }
  }
};
</script>
<style scoped>
.btn.disabled {
  cursor: auto;
}
.fade-enter-active {
  transition: all 0.3s ease;
}
.fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter,
.fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>