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
                    <b-form-input id="project_name" type="text" autocomplete="name"></b-form-input>
                  </b-form-group>
                  <b-form-group
                    label="Overview"
                    label-for="description"
                    :label-cols="3"
                    >
                    <b-form-textarea id="description" :rows="9" placeholder="please enter data to describe the specifier"></b-form-textarea>
                  </b-form-group>
                  <b-form-group
                    label="Project Type" label-for="project_type"
                    :label-cols="3"
                    >
                      <b-form-select id="project_type"
                          :plain="true"
                          :options="['Please select Project Type','Option 1', 'Option 2', 'Option 3']"
                          value="Please Select Project Type">
                      </b-form-select>
                  </b-form-group>
                  <b-form-group
                    label="Project Owner" label-for="project_owner"
                    :label-cols="3"
                    >
                    <b-form-input id="project_owner" type="text" autocomplete="name"></b-form-input>
                  </b-form-group>
                   <b-form-group
                    description="whta stage is the project."
                    label="Project Stage"
                    label-for="project_stage"
                    :label-cols="3"
                    >
                    <b-form-input id="project_stage" type="text" autocomplete="name"></b-form-input>
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
                    <b-form-input type="text" id="business_address" placeholder="Enter street name"></b-form-input>
                  </b-form-group>
                  <b-form-group>
                    <label for="business_address">Other Street</label>
                     <b-form-input type="text" id="other_address" placeholder="Enter other street name"></b-form-input>
                  </b-form-group>
                  <b-row>
                    <b-col sm="8">
                      <b-form-group>
                        <label for="contact_number">Office Number</label>
                        <b-form-input type="text" id="contact_number" placeholder="Enter your office landline"></b-form-input>
                      </b-form-group>
                    </b-col>
                    
                  </b-row>
                  
                  <b-row>
                    <b-col sm="8">
                      <b-form-group>
                        <label for="city">City</label>
                        <b-form-input type="text" id="city" placeholder="Enter your city"></b-form-input>
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
                    <label for="country">Country</label>
                    <b-form-input type="text" id="country" placeholder="Country name"></b-form-input>
                  </b-form-group>
                  <b-row>
                    <b-col sm="6">
                      <b-form-group>
                        <label for="company_email_address">Company Email</label>
                        <b-form-input type="email" id="company_email_address" placeholder="Enter company email address"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col sm="6">
                      <b-form-group>
                        <label for="website">Website</label>
                        <b-form-input type="text" id="website" placeholder="http://wida-me.com"></b-form-input>
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
                              <multiselect v-model="value" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name" track-by="code" :options="options" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
                              
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
              <b-button type="submit" variant="primary">Save changes</b-button>
              <b-button type="button" variant="secondary">Cancel</b-button>
            </div>
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
      items: [
        {
          text: 'Admin',
          href: '#'
        },
        {
          text: 'Manage',
          href: '#'
        },
        {
          text: 'Library',
          active: true
        }
      ],
      value: [],
      options: [
        { name: 'Vue.js', code: 'vu' },
        { name: 'Javascript', code: 'js' },
        { name: 'Open Source', code: 'os' }
      ],
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