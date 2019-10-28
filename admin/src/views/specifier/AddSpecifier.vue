<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col cols="12">
          <b-card
            header-tag="header"
            footer-tag="footer">
            <div slot="header">
              <i class="fa fa-align-justify"></i><strong> Add New Specifier</strong>
              <div class="card-header-actions">
                <!--Action to toggle will come here -->
              </div>
            </div>
            <b-row>
              <b-col sm="6">
                <b-card>
                  <div slot="header">
                    <strong>Specifiier Details</strong>
                  </div>
                  <b-form-group
                    description="Specifier name is required."
                    label="Specifier Name"
                    label-for="specifier_name"
                    :label-cols="3"
                    >
                    <b-form-input id="specifier_name" type="text" autocomplete="name"></b-form-input>
                  </b-form-group>
                  <b-form-group
                    label="Overview"
                    label-for="description"
                    :label-cols="3"
                    >
                    <b-form-textarea id="description" :rows="9" placeholder="please enter data to describe the specifier"></b-form-textarea>
                  </b-form-group>
                  <b-form-group>
                        <label for="specifier_type">Specifier Type</label>
                       <b-form-select id="specifier_type"
                          :plain="true"
                          v-model="specifier_type"
                         >
                          <option  v-for="types in specifierTypes" :key="types._id" :value="types._id">{{types.label}}</option>
                        </b-form-select>
                      </b-form-group>
                  <b-form-group>
                    <label for="company_logo">Logo</label> 
                    <input type="file" id="company_logo" ref="company_logo" :plain="true" @change="handleLogoUpload()"/>
                  </b-form-group>
                  
                </b-card>
              </b-col>
              <b-col sm="6">
                <b-card>
                  <div slot="header">
                    <strong>Main Contact Information</strong>
                  </div>
                  <b-form-group>
                    <label for="street">Street</label>
                    <b-form-input type="text" id="street" placeholder="Enter street name"></b-form-input>
                  </b-form-group>
                  <b-row>
                    <b-col sm="8">
                      <b-form-group>
                        <label for="contact_number">Office Number</label>
                        <b-form-input type="text" id="contact_number" placeholder="Enter your office landline"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col sm="4">
                      <b-form-group>
                        <label for="po_box">P.O Box</label>
                        <b-form-input type="text" id="po_box" placeholder="P.O BOX"></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="6">
                      <b-form-group>
                        <label for="company_email_address">Company Email</label>
                        <b-form-input type="text" id="company_email_address" placeholder="Enter company email address"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col sm="6">
                      <b-form-group>
                        <label for="website">Website</label>
                        <b-form-input type="text" id="website" placeholder="http://wida-me.com"></b-form-input>
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
                   
                </b-card>
              </b-col>
            </b-row>
            <b-row>
            <b-col md="6">
              <b-card>
                <div slot="header">
                  Main Contact Person
                </div>
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="text" placeholder="Name" name="main_contact" v-model="main_contact"></b-form-input>
                    </b-input-group>
                  </b-form-group>
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text> <i class="fa fa-suitcase"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="text" placeholder="Designation" name="designation" v-model="designation"></b-form-input>
                    </b-input-group>
                  </b-form-group>
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-envelope"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="email" placeholder="Email" autocomplete="email" name="main_email_address" v-model="main_email_address"></b-form-input>
                    </b-input-group>
                  </b-form-group>
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-phone "></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="text" placeholder="Phone" autocomplete="current-password" name="main_contact_number" v-model="main_contact_number"></b-form-input>
                    </b-input-group>
                  </b-form-group>
              </b-card>
            </b-col>
            <b-col md="6">
              <b-card>
                <div slot="header">
                  Secondary Contact Person
                </div>
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="text" placeholder="Name" name="secondary_contact" v-model="secondary_contact"></b-form-input>
                    </b-input-group>
                  </b-form-group>
                  <b-form-group>
                    <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text> <i class="fa fa-suitcase"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="text" placeholder="Designation" name="secondary_designation" v-model="secondary_designation"></b-form-input>
                    </b-input-group>
                  </b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-envelope"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="email" placeholder="Email" autocomplete="email" name="secondary_email_address" v-model="secondary_email_address"></b-form-input>
                    </b-input-group>
                  </b-form-group>
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-phone "></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="text" placeholder="Phone" autocomplete="current-password" name= "secondary_contact_number" v-model="secondary_contact_number"></b-form-input>
                    </b-input-group>
                  </b-form-group>
              </b-card>
            </b-col>
            </b-row>
            <div class="form-actions">
              <b-button type="submit" variant="primary" @click="submit()">Save Specifier</b-button>
            </div>
          </b-card>
        </b-col>
        
      </b-row>
    </div>
  </div>
</template>

<script>
import jsonToFormData from 'json-form-data';
export default {
  name: 'breadcrumbs',
  data() {
    return {
      specifier_name:'',
      description:'',
      specifier_type:[],
      company_logo:'',
      country: [],
      business_address: '',
      other_address: '',
      po_box: '',
      city: [],
      contact_number: '',
      company_email_address: '',
      website: '',
      designation:'',
      main_contact:'',
      main_contact_number:'',
      main_email_address:'',
      secondary_contact:'',
      secondary_contact_number:'',
      secondary_email_address:'',
      secondary_designation:'',
      show: true,
      disabled: 0,
      cartegories: false,
      togglePress: false
    };
  },
  methods: {
    IMAGE_PROCESS(image) {
      const extension = image.type.split('/')[1];
      const icon = new File([image], `${Date.now()}.${extension}`, {
        type: image.type
      });
      return icon;
    },
    submit() {
      let formData = {
        specifier_name:this.specifier_name,
        description:this.description,
        specifier_type:this.specifier_type,
        contact_info: {
          country: this.country,
          business_address: this.business_address,
          other_address: this.other_address,
          po_box: this.po_box,
          city: this.city,
          contact_number: this.contact_number,
          company_email_address: this.company_email_address,
          website: this.website,
          designation:this.designation,
          main_contact:this.main_contact,
          main_contact_number:this.main_contact,
          main_email_address:this.main_email_address,
          secondary_contact:this.secondary_contact,
          secondary_contact_number:this.secondary_contact_number,
          secondary_email_address:this.secondary_email_address,
          secondary_designation:this.secondary_designation,
        },
        company_logo: this.company_logo
          ? this.IMAGE_PROCESS(this.company_logo)
          : null,
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
      this.$store.dispatch('SAVE_SPECIFIER', {
        data: data,
        config
      });
    },
    handleLogoUpload() {
      this.company_logo = this.$refs.company_logo.files[0];
    },
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
    specifierTypes() {
      return this.$store.state.specifierType.specifiertype;
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