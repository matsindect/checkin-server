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
                    <b-form-input id="project_name" type="text" autocomplete="name" v-model="project_name"></b-form-input>
                  </b-form-group>
                  <b-form-group
                    label="Overview"
                    label-for="description"
                    :label-cols="3"
                    >
                    <b-form-textarea id="description" :rows="9" placeholder="please enter data to describe the specifier" v-model="description"></b-form-textarea>
                  </b-form-group>
                  <b-form-group>
                        <label for="project_type">Project Type</label>
                       <b-form-select id="project_type"
                          :plain="true"
                          v-model="project_type"
                         >
                          <option  v-for="types in projectType" :key="types._id" :value="types._id">{{types.label}}</option>
                        </b-form-select>
                      </b-form-group>
                  
                  <b-form-group
                    label="Project Owner" label-for="project_owner"
                    :label-cols="3"
                    >
                    <b-form-input id="project_owner" type="text" autocomplete="name" v-model="project_owner"></b-form-input>
                  </b-form-group>
                   <b-form-group
                    description="whta stage is the project."
                    label="Project Stage"
                    label-for="project_stage"
                    :label-cols="3"
                    >
                    <b-form-input id="project_stage" type="text" autocomplete="name" v-model="project_stage"></b-form-input>
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
                    <b-form-input type="text" id="business_address" placeholder="Enter street name" v-model="business_address"></b-form-input>
                  </b-form-group>
                  <b-form-group>
                    <label for="business_address">Other Street</label>
                     <b-form-input type="text" id="other_address" placeholder="Enter other street name" v-model="other_address"></b-form-input>
                  </b-form-group>
                  <b-row>
                    <b-col sm="8">
                      <b-form-group>
                        <label for="contact_number">Office Number</label>
                        <b-form-input type="text" id="contact_number" placeholder="Enter your office landline" v-model="contact_number"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col sm="4">
                      <b-form-group>
                        <label for="po_box">Postal Code</label>
                        <b-form-input type="text" id="po_box" placeholder="Postal Code" v-model="po_box"></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  
                  
                    <b-form-group>
                        <label for="city">City</label>
                       <b-form-select id="city"
                          :plain="true"
                          v-model="city"
                          >
                          <option v-for="types in cities" :key="types._id" :value="types._id">{{types.label}}</option>
                        </b-form-select>
                      </b-form-group>
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
                        <label for="company_email_address">Company Email</label>
                        <b-form-input type="email" id="company_email_address" placeholder="Enter company email address" v-model="company_email_address"></b-form-input>
                      </b-form-group>
                    </b-col>
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
            <b-row>
            <b-col md="6">
              <b-card>
                <div slot="header">
                  Stackholders
                </div>
                 <b-form-group>
                            <label for="products">Select Stackholders</label>
                            <div>
                              <multiselect v-model="value" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="specifier_name" track-by="_id" :options="options" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
                              
                            </div>
                          </b-form-group>
              </b-card>
            </b-col>
            <b-col md="6">
              <b-card>
                <div slot="header">
                  Project Attachments
                </div>
                <b-form-group>
                    <label for="street">Owner Logo</label> 
                    <input type="file" id="fileInput" :plain="true" name="company_logo" ref="company_logo" @change=" handleLogoUpload()"/>
                  </b-form-group>
                  <b-form-group>
                    <label for="street">Preview Image</label> 
                    <input type="file" id="fileInput" :plain="true" name="gallary_image" ref="gallary_image" @change="handleGallaryUpload()"/>
                  </b-form-group>
              </b-card>
            </b-col>
            </b-row>
            
            <div class="form-actions">
              <b-button type="submit" variant="primary" @click="submit()">Save Project</b-button>
            </div>
          </b-card>
        </b-col>
        
      </b-row>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import jsonToFormData from 'json-form-data';
export default {
  name: 'breadcrumbs',
  components: {
    Multiselect
  },
  data() {
    return {
      value: [],
      company_logo:'',
      gallary_image:'',
      country: [],
      project_type:[],
      project_name:'',
      description:'',
      project_type:'',
      project_owner:'',
      project_stage:'',
      business_address: '',
      other_address: '',
      po_box: '',
      city: [],
      contact_number: '',
      company_email_address: '',
      website: '',
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
      const extension = image.type.split('/')[1];
      const icon = new File([image], `${Date.now()}.${extension}`, {
        type: image.type
      });
      return icon;
    },
    submit() {
      let formData = {
        project_name:this.project_name,
        description:this.description,
        project_type:this.project_type,
        project_owner:this.project_owner,
        project_stage:this.project_stage,
        contact_info: {
          country: this.country,
          business_address: this.business_address,
          other_address: this.other_address,
          po_box: this.po_box,
          city: this.city,
          contact_number: this.contact_number,
          company_email_address: this.company_email_address,
          website: this.website,
        },
        company_logo: this.company_logo
          ? this.IMAGE_PROCESS(this.company_logo)
          : null,
        gallary_image: this.gallary_image
          ? this.IMAGE_PROCESS(this.gallary_image)
          : null
  
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
      this.$store.dispatch('SAVE_PROJECT', {
        data: data,
        config
      });
    },
    handleLogoUpload() {
      this.company_logo = this.$refs.company_logo.files[0];
    },
    handleGallaryUpload() {
      this.gallary_image = this.$refs.gallary_image.files[0];
    }
  },
  computed: {
    options(){
      return this.$store.state.Specifier.specifier
    },
     cities() {
      return this.$store.state.city.city;
    },
    countries() {
      return this.$store.state.country.country;
    },
    projectType() {
      return this.$store.state.projectType.projecttype;
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