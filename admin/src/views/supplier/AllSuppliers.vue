<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col cols="12">
          <b-card
            header-tag="header"
            footer-tag="footer">
            <div slot="header">
              <i class="fa fa-align-justify"></i><strong>Suppliers</strong>
            </div>
            <table class="table table-sm">
  <thead class="thead-default">
    <tr>
      <th>#</th>
      <th>Trade Name</th>
      <th>Supplier Type</th>
      <th>Established date</th>
      <th>Verified</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="supplier in suppliers" :key="supplier._id" @click="rowClicked(supplier)">
      <th scope="row">1</th>
      <td>{{supplier.trade_name}}</td>
      <td>{{supplier.listing_type[0].label}}</td>
      <td>{{supplier.established_date}}</td>
      <td>{{supplier.veryfied}}</td>
    </tr>
    <nav>
      <b-pagination size="sm" :total-rows="getRowCount(suppliers)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
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
      return `allsuppliers/${_id.toString()}`;
    },
    rowClicked(item) {
      const userLink = this.userLink(item._id);
      this.$router.push({ path: userLink });
    }
  },
  computed: {
    suppliers() {
      return this.$store.state.Suppliers.supplier;
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