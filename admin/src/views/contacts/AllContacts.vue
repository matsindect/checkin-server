<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col cols="12">
          <b-card
            header-tag="header"
            footer-tag="footer">
            <div slot="header">
              <i class="fa fa-align-justify"></i><strong>Contacts</strong>
            </div>
            <table class="table table-sm">
  <thead class="thead-default">
    <tr>
      <th>#</th>
      <th>Contacts Name</th>
      <th>Telephone</th>
      <th>Mobile Phone</th>
      <th>Email Address</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="contact in contacts" :key="contact._id" @click="rowClicked(contact)">
      <th scope="row">1</th>
      <td>{{contact.contact_name}}</td>
      <td>{{contact.company_contact_number}}</td>
      <td>{{contact.main_contact_number}}</td>
      <td>{{contact.company_email_address}}</td>
    </tr>
    <nav>
      <b-pagination size="sm" :total-rows="getRowCount(contacts)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
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
      return `allcontacts/${_id.toString()}`;
    },
    rowClicked(item) {
      const userLink = this.userLink(item._id);
      this.$router.push({ path: userLink });
    }
  },
  computed: {
    contacts() {
      return this.$store.state.Contacts.contacts;
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