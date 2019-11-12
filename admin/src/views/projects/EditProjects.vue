<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col cols="12">
          <b-card
            header-tag="header"
            footer-tag="footer">
            <div slot="header">
              <i class="fa fa-align-justify"></i><strong> Add New Project</strong>
              <div class="card-header-actions">
                <!--Action to toggle will come here -->
              </div>
            </div>
            <b-row>
              <b-col sm="6">
                <b-card>
                  <div slot="header">
                    <strong>Project Details</strong>
                  </div>
                  <b-form-group
                    description="Project name is required."
                    label="Project Name"
                    label-for="project_name"
                    :label-cols="3"
                    >
                    <b-form-input id="project_name" type="text" autocomplete="name" :value="findProjects($route.params.id).project_name ? findProjects($route.params.id).project_name : ''" @input="input_project_name"></b-form-input>
                  </b-form-group>
                  <b-form-group
                    label="Overview"
                    label-for="description"
                    :label-cols="3"
                    >
                    <b-form-textarea id="description" :rows="9" placeholder="please enter data to describe the specifier" :value="findProjects($route.params.id).description" @input="input_description"></b-form-textarea>
                  </b-form-group>
                  <b-form-group>
                        <label for="project_type">Specifier Type</label>
                       <b-form-select id="project_type"
                          :plain="true"
                          :value="findProjects($route.params.id).project_type[0]._id"
                          @input="input_project_type"
                         >
                          <option  v-for="types in projectType" :key="types._id" :value="types._id">{{types.label}}</option>
                        </b-form-select>
                      </b-form-group>
                  
                  <b-form-group
                    label="Project Owner" label-for="project_owner"
                    :label-cols="3"
                    >
                    <b-form-input id="project_owner" type="text" autocomplete="name" :value="findProjects($route.params.id).project_owner" @input="input_project_owner"></b-form-input>
                  </b-form-group>
                   <b-form-group
                    description="whta stage is the project."
                    label="Project Stage"
                    label-for="project_stage"
                    :label-cols="3"
                    >
                    <b-form-input id="project_stage" type="text" autocomplete="name" :value="findProjects($route.params.id).project_stage" @input="input_project_owner"></b-form-input>
                  </b-form-group>
                </b-card>
              </b-col>
              <b-col sm="6">
                <b-card>
                  <div slot="header">
                    <strong>Main Contact Information</strong>
                  </div>
                  <b-form-group>
                    <label for="business_address">Street</label>
                    <b-form-input type="text" id="business_address" placeholder="Enter street name" :value="findProjects($route.params.id).project_contacts ? findProjects($route.params.id).project_contacts.business_address : ''" @input="input_business_address"></b-form-input>
                  </b-form-group>
                  <b-form-group>
                    <label for="business_address">Other Street</label>
                     <b-form-input type="text" id="other_address" placeholder="Enter other street name" :value="findProjects($route.params.id).project_contacts ? findProjects($route.params.id).project_contacts.other_address : ''" @input="input_other_address"></b-form-input>
                  </b-form-group>
                  <b-row>
                    <b-col sm="8">
                      <b-form-group>
                        <label for="contact_number">Office Number</label>
                        <b-form-input type="text" id="contact_number" placeholder="Enter your office landline" :value="findProjects($route.params.id).project_contacts ? findProjects($route.params.id).project_contacts.contact_number : ''" @input="input_contact_number"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col sm="4">
                      <b-form-group>
                        <label for="project_location">Postal Code</label>
                        <b-form-input type="text" id="project_location" placeholder="Postal Code"></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                     <b-form-group>
                        <label for="city">City</label>
                        <b-form-select id="city"
                          :plain="true"
                          :value="findProjects($route.params.id).project_contacts ? findProjects($route.params.id).project_contacts.city[0]._id : ''"
                          @input="input_city"
                          >
                          <option v-for="types in cities" :key="types._id" :value="types._id">{{types.label}}</option>
                        </b-form-select>
                      </b-form-group>
                  <b-form-group>
                    <label for="country">Country</label>
                    <b-form-select id="country"
                          :plain="true"
                          :value="findProjects($route.params.id).project_contacts ? findProjects($route.params.id).project_contacts.country[0]._id : ''"
                          @input="input_country"
                          >
                          <option v-for="types in countries" :key="types._id" :value="types._id">{{types.label}}</option>
                        </b-form-select>
                  </b-form-group>
                  <b-row>
                    <b-col sm="6">
                      <b-form-group>
                        <label for="company_email_address">Company Email</label>
                        <b-form-input type="email" id="company_email_address" placeholder="Enter company email address" :value="findProjects($route.params.id).project_contacts ? findProjects($route.params.id).project_contacts.company_email_address : ''" @input="input_company_email_address"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col sm="6">
                      <b-form-group>
                        <label for="website">Website</label>
                        <b-form-input type="text" id="website" placeholder="http://wida-me.com" :value="findProjects($route.params.id).project_contacts ? findProjects($route.params.id).project_contacts.website : ''" @input="input_website"></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </b-card>
              </b-col>
            </b-row>
            <b-row>
            <b-col md="6">
              <b-card>
                <div slot="header">
                  Stackholders
                </div>
                 <b-form-group>
                            <label for="products">Select Stackholders</label>
                            <div>
                              <multiselect v-model="value" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="specifier_name" track-by="_id" :options="options" :multiple="true" :taggable="true" @tag="addTag"  @input="input_stackholders"></multiselect>
                              
                            </div>
                          </b-form-group>
              </b-card>
            </b-col>
            <b-col md="6">
              <b-card>
                <div slot="header">
                  Supplier Attachments
                </div>
                <b-form-group>
                    <label for="street">Owner Logo</label> 
                    <b-form-file id="fileInput" :plain="true" name="company_logo"></b-form-file>
                  </b-form-group>
                  <b-form-group>
                    <label for="street">Preview Image</label> 
                    <b-form-file id="fileInput" :plain="true" name="gallary_image"></b-form-file>
                  </b-form-group>
              </b-card>
            </b-col>
            </b-row>
            
            <div class="form-actions">
              <b-row>
              <b-col md="8">
              <b-button type="submit" variant="primary" v-on:click="submit()">Update Project</b-button>
              </b-col>
              <b-col md="4">
              <b-button @click="goBack">Back</b-button>
              </b-col>
              </b-row>
            </div>
          </b-card>
        </b-col>
        
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Multiselect from "vue-multiselect";
import jsonToFormData from "json-form-data";
export default {
  name: "breadcrumbs",
  components: {
    Multiselect
  },
  data() {
    return {
      value: [],
      company_logo: "",
      gallary_image: "",
      country: [],
      project_type: [],
      project_name: "",
      description: "",
      project_type: "",
      project_owner: "",
      project_stage: "",
      business_address: "",
      other_address: "",
      po_box: "",
      stackholders: [],
      city: [],
      contact_number: "",
      company_email_address: "",
      website: "",
      show: true,
      disabled: 0,
      cartegories: false,
      togglePress: false
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
    IMAGE_PROCESS(image) {
      const extension = image.type.split("/")[1];
      const icon = new File([image], `${Date.now()}.${extension}`, {
        type: image.type
      });
      return icon;
    },
    submit() {
      let projects = this.findProjects(this.$route.params.id);
      let formData = {
        project_name: this.project_name || projects.project_name,
        description: this.description || projects.description,
        project_type: this.project_type || projects.project_type,
        project_owner: this.project_owner || projects.project_owner,
        project_stage: this.project_stage || projects.project_stage,
        stackholders: this.value || projects.stackholders,
        project_contacts: {
          _id: projects.project_contacts ? projects.project_contacts._id : null,
          country: this.country || projects.country,
          business_address: this.business_address || projects.business_address,
          other_address: this.other_address || projects.other_address,
          po_box: this.po_box || projects.po_box,
          city: this.city || projects.city,
          contact_number: this.contact_number || projects.contact_number,
          company_email_address:
            this.company_email_address || projects.company_email_address,
          website: this.website || projects.website
        },
        company_attachments: {
          _id: projects.company_attachments._id || null
        },
        company_logo: this.company_logo
          ? this.IMAGE_PROCESS(this.company_logo)
          : projects.company_attachments.company_logo,
        gallary_image: this.gallary_image
          ? this.IMAGE_PROCESS(this.gallary_image)
          : projects.company_attachments.gallary_image
      };

      var options = {
        showLeafArrayIndexes: true,
        includeNullValues: false,
        mapping: function(value) {
          if (typeof value === "boolean") {
            return +value ? "1" : "0";
          }
          return value;
        }
      };
      let config = {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`
        }
      };
      let data = jsonToFormData(formData, options);
      this.$store.dispatch("UPDATE_PROJECT", {
        id: projects._id,
        payload: data,
        config
      });
    },
    handleLogoUpload() {
      this.company_logo = this.$refs.company_logo.files[0];
    },
    handleGallaryUpload() {
      this.gallary_image = this.$refs.gallary_image.files[0];
    },
    goBack() {
      this.$router.go(-1);
      // this.$router.replace({path: '/users'})
    },
    handleLogoUpload() {
      this.company_logo = this.$refs.company_logo.files[0];
    },
    input_project_name(e) {
      this.project_name = e;
    },
    input_description(e) {
      this.description = e;
    },
    input_project_owner() {
      this.project_owner = e;
    },
    input_other_address(e) {
      this.other_address = e;
    },
    input_stackholders(e) {
      this.value = e;
    },
    input_business_address(e) {
      this.business_address = e;
    },
    input_contact_number(e) {
      this.contact_number = e;
    },
    input_po_box(e) {
      this.po_box = e;
    },
    input_city(e) {
      this.city = e;
    },
    input_country(e) {
      this.country = e;
    },
    input_project_type(e) {
      this.project_type = e;
    },
    input_company_email_address(e) {
      this.company_email_address = e;
    },
    input_website(e) {
      this.website = e;
    },
    input_main_contact(e) {
      this.main_contact = e;
    },
    input_designation(e) {
      this.designation = e;
    },
    input_project_owner(e) {
      this.project_owner = e;
    },
    input_main_email_address(e) {
      this.main_email_address = e;
    },
    input_main_contact_number(e) {
      this.main_contact_number = e;
    },
    input_secondary_contact(e) {
      this.secondary_contact = e;
    },
    input_secondary_designation(e) {
      this.secondary_designation = e;
    },
    input_secondary_email_address(e) {
      this.secondary_email_address = e;
    },
    input_secondary_contact_number(e) {
      this.secondary_contact_number = e;
    }
  },
  computed: {
    ...mapGetters([
      "findProjects",
      "findCategory",
      "findCity",
      "findCountry",
      "findKeyProjects",
      "findProducts",
      "findSectors"
    ]),
    options() {
      return this.$store.state.Specifier.specifier;
    },
    cities() {
      return this.$store.state.city.city;
    },
    countries() {
      return this.$store.state.country.country;
    },
    projectType() {
      return this.$store.state.projectType.projecttype;
    }
  },

  created() {
    let project = this.findProjects(this.$route.params.id);
    this.value = project.stackholders;
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