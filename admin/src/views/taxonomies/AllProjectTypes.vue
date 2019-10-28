<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col cols="12">
          <b-card
            header-tag="header"
            footer-tag="footer">
            <div slot="header">
              <i class="fa fa-align-justify"></i><strong> Edit Project Type</strong>
              <div class="card-header-actions">
                <!--Action to toggle will come here -->
              </div>
            </div>
            <b-row>
              <b-col sm="6">
                <b-card>
                  <div slot="header">
                    <strong>Project Type Details</strong>
                  </div>
                  <b-form-group>
                    <label for="label">Name</label>
                    <b-form-input type="text" id="label" placeholder="Enter taxonomy name" @input="updatelabel" :value="findProjectType($route.params.id).label" name="label"></b-form-input>
                  </b-form-group>
                  <b-form-group>
                    <label for="vat">Slug</label>
                    <b-form-input type="text" id="slug" placeholder="slug" @input="updateslug" :value="findProjectType($route.params.id).slug"></b-form-input>
                  </b-form-group>
                  <b-form-group>
                    <input type="file"  name="icon" id="icon"  ref="file" accept="image/*" v-on:change="handleFileUpload()"  />
                  </b-form-group>
                  <div class="form-actions">
                    <b-button type="submit" variant="primary" v-on:click="submit()">Update changes</b-button>
                  </div>

                  
                </b-card>
              </b-col>
              
              <b-col sm="6">
                
                    <b-card no-header>
                      <template slot="header">
                        Project id:  {{ $route.params.id }}
                      </template>
                      <b-table striped small fixed responsive="sm" :items="items($route.params.id)" :fields="fields">
                        <template slot="value" slot-scope="data">
                          <strong>{{data.item.value}}</strong>
                        </template>
                      </b-table>
                      <template slot="footer">
                        <b-button @click="goBack">Back</b-button>
                      </template>
                    </b-card>
                  </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import jsonToFormData from 'json-form-data';
export default {
  name: 'breadcrumbs',
  props: {
    caption: {
      type: String,
      default: 'Project Types'
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
      items: _id => {
        const projecttype = this.$store.state.projectType.projecttype.find(
          projecttypes => projecttypes._id.toString() === _id
        );
        const Projecttypes = projecttype
          ? Object.entries(projecttype)
          : [['id', 'Not found']];
        return Projecttypes.map(([key, value]) => {
          return { key: key, value: value };
        });
      },
      fields: [{ key: 'key' }, { key: 'value' }],
      label: '',
      icon: '',
      slug: ''
    };
  },
  computed: {
    ...mapGetters(['findProjectType'])
  },
  methods: {
    goBack() {
      this.$router.go(-1);
      // this.$router.replace({path: '/users'})
    },
    IMAGE_PROCESS(image) {
      const extension = image.type.split('/')[1];
      const icon = new File([image], `${Date.now()}.${extension}`, {
        type: image.type
      });
      return icon;
    },
    submit() {
      const projecttype = this.findProjectType(this.$route.params.id);
      const CatId = projecttype._id;
      let formData = {
        label: this.label || projecttype.label,
        slug: this.slug || projecttype.slug,
        icon: this.icon ? this.IMAGE_PROCESS(this.icon) : projecttype.icon
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
      let headers = {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
      };
      let data = jsonToFormData(formData, options);
      this.$store.dispatch('UPDATE_PROJECTTYPE', {
        id: CatId,
        payload: data,
        config: headers
      });
    },
    handleFileUpload() {
      this.icon = this.$refs.file.files[0];
    },
    updatelabel(e) {
      this.label = e;
    },
    updateslug(e) {
      this.slug = e;
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