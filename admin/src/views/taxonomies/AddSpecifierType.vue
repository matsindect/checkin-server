<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col cols="12">
          <b-card
            header-tag="header"
            footer-tag="footer">
            <div slot="header">
              <i class="fa fa-align-justify"></i><strong> Add Specifier Type</strong>
              <div class="card-header-actions">
                <!--Action to toggle will come here -->
              </div>
            </div>
            <b-row>
              <b-col sm="6">
                <b-card>
                  <div slot="header">
                    <strong>Specifier Type Details</strong>
                  </div>
                  <b-form-group>
                    <label for="label">Name</label>
                    <b-form-input type="text" id="label" placeholder="Enter taxonomy name" v-model="label" name="label"></b-form-input>
                  </b-form-group>
                  <b-form-group>
                    <label for="vat">Slug</label>
                    <b-form-input type="text" id="slug" placeholder="slug" ></b-form-input>
                  </b-form-group>
                  <b-form-group>
                    <div class="input-group mb-3">
                    <input type="file"  name="icon" id="icon"  ref="file" accept="image/*" v-on:change="handleFileUpload()"  class="custom-file-input"/>
                    <label class="custom-file-label" for="icon">Choose icon</label>
                    </div>
                  </b-form-group>
                  <div class="form-actions">
                    <b-button type="submit" variant="primary" v-on:click="submit()">Add New Category</b-button>
                  </div>

                  
                </b-card>
              </b-col>
              
              <b-col sm="6">
                
                  <transition name="slide">
                  <b-card>
                    <div slot="header" v-html="caption"></div>
                      <b-table :hover="hover" :striped="striped" :bordered="bordered" :small="small" :fixed="fixed" responsive="sm" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" @row-clicked="rowClicked">
                      <template slot="id" slot-scope="data">
                        <strong>{{data.item._id}}</strong>
                      </template>
                      <template slot="name" slot-scope="data">
                        <strong>{{data.item.label}}</strong>
                      </template>
                      <template slot="status" slot-scope="data">
                        <b-badge :variant="getBadge(data.item.status)">{{data.item.status}}</b-badge>
                      </template>
                    </b-table>
                    <nav>
                      <b-pagination size="sm" :total-rows="getRowCount(items)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
                    </nav>
                  </b-card>
                  </transition>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import jsonToFormData from 'json-form-data';
export default {
  name: 'breadcrumbs',
  props: {
    caption: {
      type: String,
      default: 'Specifier Types'
    },
    hover: {
      type: Boolean,
      default: true
    },
    striped: {
      type: Boolean,
      default: true
    },
    bordered: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      fields: [{ key: '_id' }, { key: 'label' }, { key: 'status' }],
      currentPage: 1,
      perPage: 5,
      totalRows: 0,
      show: true,
      label: '',
      icon: ''
    };
  },
  methods: {
    ...mapMutations(['ADD_SPECIFIERTYPE']),
    IMAGE_PROCESS(image) {
      const extension = image.type.split('/')[1];
      const icon = new File([image], `${Date.now()}.${extension}`, {
        type: image.type
      });
      return icon;
    },
    submit() {
      let formData = {
        label: this.label,
        icon: this.icon ? this.IMAGE_PROCESS(this.icon) : null
      };

      var options = {
        showLeafArrayIndexes: true,
        includeNullValues: false,
        mapping: function(value) {
          if (typeof value === 'boolean') {
            return +value ? '1' : '0';
          }
          return value;
        }
      };
      let config = {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
        }
      };
      let data = jsonToFormData(formData, options);
      this.$store.dispatch('SAVE_CATEGORIES', {
        data: data,
        config
      });
    },
    handleFileUpload() {
      this.icon = this.$refs.file.files[0];
    },
    getBadge(status) {
      return status === 'Active'
        ? 'true'
        : status === 'Inactive'
          ? 'false'
          : status === 'Pending'
            ? 'warning'
            : status === 'Banned' ? 'danger' : 'primary';
    },
    getRowCount(items) {
      return items.length;
    },
    userLink(_id) {
      return `addspecifiertype/${_id.toString()}`;
    },
    rowClicked(item) {
      const userLink = this.userLink(item._id);
      this.$router.push({ path: userLink });
    }
  },
  async created() {
    this.$store.dispatch('GET_SPECIFIERTYPE');
  },
  computed: {
    ...mapState({
      specifiertypes: state => state.specifiertype
    }),
    items() {
      return this.$store.state.specifierType.specifiertype;
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