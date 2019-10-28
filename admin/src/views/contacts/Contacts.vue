<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col cols="12">
          <b-card
            header-tag="header"
            footer-tag="footer">
            <div slot="header">
              <i class="fa fa-align-justify"></i><strong> Add New Contacts</strong>
              <div class="card-header-actions">
                <!--Action to toggle will come here -->
              </div>
            </div>
            <b-row>
            <b-col md="6">
              <b-card>
                <div slot="header">
                Contact Person
                </div>
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="text" placeholder="Name" name="contact_name"></b-form-input>
                    </b-input-group>
                  </b-form-group>
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text> <i class="fa fa-suitcase"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="text" placeholder="Designation" name="designation"></b-form-input>
                    </b-input-group>
                  </b-form-group>
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-envelope"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="email" placeholder="Email" autocomplete="email" name="main_email_address"></b-form-input>
                    </b-input-group>
                  </b-form-group>
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-phone "></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="text" placeholder="Phone" autocomplete="current-password" name="main_contact_number"></b-form-input>
                    </b-input-group>
                  </b-form-group>
              </b-card>
            </b-col>
            <b-col md="6">
              <b-card>
                <div slot="header">
                Company and Projects Involved in
                </div>
                <b-col md="12">
                    <b-form-group>
                        <label for="categories">Projects</label>
                    <div>
                    <multiselect v-model="project" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="project_name" track-by="_id" :options="projects" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
                             
                    </div>
                    </b-form-group>
                </b-col>
                <b-col md="12">
                    <b-form-group>
                        <label for="sector">Specifier</label>
                    <div>
                    <multiselect v-model="specifier" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="specifier_name" track-by="_id" :options="specifiers" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
                    </div>
                    </b-form-group>
                </b-col>
              </b-card>
            </b-col>
            </b-row>
            <b-row>
                <b-col md="6">
              <b-card>
                <div slot="header">
                Secondary Contacts
                </div>
                  
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-envelope"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="email" placeholder="Email" autocomplete="email" name="secondary_email_address"></b-form-input>
                    </b-input-group>
                  </b-form-group>
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-phone "></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="text" placeholder="Phone" autocomplete="current-password" name="secondary_contact"></b-form-input>
                    </b-input-group>
                  </b-form-group>
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-phone "></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="text" placeholder="Company Phone" autocomplete="current-password" name="company_contact_number"></b-form-input>
                    </b-input-group>
                  </b-form-group>
              </b-card>
            </b-col>
            <b-col md="6">
            <b-card>
                  <div slot="header">
                    Main Contact Information
                  </div>
                  
                  <b-row>
                    <b-col sm="8">
                      <b-form-group>
                        <label for="city">City</label>
                       <b-form-select id="city"
                          :plain="true"
                          v-model="city"
                          >
                          <option v-for="types in cities" :key="types._id" :value="types._id">{{types.label}}</option>
                        </b-form-select>
                      </b-form-group>
                    </b-col>
                    <b-col sm="4">
                      <b-form-group>
                        <label for="po_box">P.O Box</label>
                        <b-form-input type="text" id="po_box" placeholder="P.O BOX" v-model="po_box"></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  
                      <b-form-group>
                        <label for="country">Country</label>
                       <b-form-select id="country"
                          :plain="true"
                          v-model="country"
                          >
                          <option v-for="types in countries" :key="types._id" :value="types._id">{{types.label}}</option>
                        </b-form-select>
                      </b-form-group>
                  <b-row>
                    <b-col sm="6">
                      <b-form-group>
                        <label for="website">Website</label>
                        <b-form-input type="text" id="website" placeholder="http://wida-me.com" v-model="website"></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
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
import Multiselect from 'vue-multiselect';
export default {
  name: 'breadcrumbs',
  components: {
    Multiselect
  },
  data() {
    return {
        project:[],
        specifier:[],
        country:'',
        city:'',
        po_box:'',
        website:'',
        company_email_address:'',
        designation:'',
        main_email_address:'',
        secondary_email_address:'',
        secondary_contact:'',
        main_contact_number:'',
        company_contact_number:'',
        contact_name:''
    };
  },
  methods: {
      addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000)
      };
      this.options.push(tag);
      this.value.push(tag);
    },
  },
  computed: {
    specifiers() {
      return this.$store.state.Specifier.specifier;
    },
    projects() {
      return this.$store.state.Projects.projects;
    },
    cities() {
      return this.$store.state.city.city;
    },
    countries() {
      return this.$store.state.country.country;
    },
  },
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