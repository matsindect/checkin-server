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
                    <b-form-input id="specifier_name" type="text" autocomplete="name" :value="findSpecifier($route.params.id).specifier_name" @input="input_specifier_name"></b-form-input>
                  </b-form-group>
                  <b-form-group
                    label="Overview"
                    label-for="description"
                    :label-cols="3"
                    >
                    <b-form-textarea id="description" :rows="9" placeholder="please enter data to describe the specifier" :value="findSpecifier($route.params.id).description" @input="input_description"></b-form-textarea>
                  </b-form-group>
                  <b-form-group>
                        <label for="specifier_type">Specifier Type</label>
                       <b-form-select id="specifier_type"
                          :plain="true"
                          :value="findSpecifier($route.params.id).specifier_type[0]._id"
                          @input="input_specifier_type"
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
                    <label for="business_address">Street</label>
                    <b-form-input type="text" id="business_address" placeholder="Enter street name" :value="findSpecifier($route.params.id).contact_info.business_address" @input="input_business_address"></b-form-input>
                  </b-form-group>
                  <b-row>
                    <b-col sm="8">
                      <b-form-group>
                        <label for="contact_number">Office Number</label>
                        <b-form-input type="text" id="contact_number" placeholder="Enter your office landline" :value="findSpecifier($route.params.id).contact_info.contact_number" @input="input_contact_number"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col sm="4">
                      <b-form-group>
                        <label for="po_box">P.O Box</label>
                        <b-form-input type="text" id="po_box" placeholder="P.O BOX" :value="findSpecifier($route.params.id).contact_info.po_box" @input="input_po_box"></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="6">
                      <b-form-group>
                        <label for="company_email_address">Company Email</label>
                        <b-form-input type="text" id="company_email_address" placeholder="Enter company email address" :value="findSpecifier($route.params.id).contact_info.company_email_address" @input="input_company_email_address"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col sm="6">
                      <b-form-group>
                        <label for="website">Website</label>
                        <b-form-input type="text" id="website" placeholder="http://wida-me.com" :value="findSpecifier($route.params.id).contact_info.website" @input="input_website"></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                      <b-form-group>
                        <label for="city">City</label>
                        <b-form-select id="city"
                          :plain="true"
                          :value="findSpecifier($route.params.id).contact_info.city[0]._id"
                          @input="input_city"
                          >
                          <option v-for="types in cities" :key="types._id" :value="types._id">{{types.label}}</option>
                        </b-form-select>
                      </b-form-group>
                  <b-form-group>
                    <label for="country">Country</label>
                    <b-form-select id="country"
                          :plain="true"
                          :value="findSpecifier($route.params.id).contact_info.country[0]._id"
                          @input="input_country"
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
                      <b-form-input type="text" placeholder="Name" name="main_contact" :value="findSpecifier($route.params.id).contact_info.main_contact"></b-form-input>
                    </b-input-group>
                  </b-form-group>
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text> <i class="fa fa-suitcase"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="text" placeholder="Designation" name="designation" :value="findSpecifier($route.params.id).contact_info.designation" @input="input_designation"></b-form-input>
                    </b-input-group>
                  </b-form-group>
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-envelope"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="email" placeholder="Email" autocomplete="email" name="main_email_address" :value="findSpecifier($route.params.id).contact_info.main_email_address" @input="input_main_email_address"></b-form-input>
                    </b-input-group>
                  </b-form-group>
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-phone "></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="text" placeholder="Phone" autocomplete="current-password"  name="main_contact_number" :value="findSpecifier($route.params.id).contact_info.main_contact_number" @input="input_main_contact_number"></b-form-input>
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
                      <b-form-input type="text" placeholder="Name" name="secondary_contact" :value="findSpecifier($route.params.id).contact_info.secondary_contact" @input="input_secondary_contact"></b-form-input>
                    </b-input-group>
                  </b-form-group>
                  <b-form-group>
                    <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text> <i class="fa fa-suitcase"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="text" placeholder="Designation" name="secondary_designation" :value="findSpecifier($route.params.id).contact_info.secondary_designation" @input="input_secondary_designation"></b-form-input>
                    </b-input-group>
                  </b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-envelope"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="email" placeholder="Email" autocomplete="email" name="secondary_email_address" :value="findSpecifier($route.params.id).contact_info.secondary_email_address" @input="input_secondary_email_address"></b-form-input>
                    </b-input-group>
                  </b-form-group>
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-phone "></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="text" placeholder="Phone" autocomplete="current-password" name= "secondary_contact_number" :value="findSpecifier($route.params.id).contact_info.secondary_contact_number" @input="input_secondary_contact_number"></b-form-input>
                    </b-input-group>
                  </b-form-group>
              </b-card>
            </b-col>
            </b-row>
            <div class="form-actions">
              <b-row>
              <b-col md="8">
              <b-button type="submit" variant="primary" v-on:click="submit()">Update Specifier</b-button>
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
import jsonToFormData from "json-form-data";
export default {
  name: "breadcrumbs",
  data() {
    return {
      specifier_name: "",
      description: "",
      specifier_type: [],
      company_logo: "",
      country: [],
      business_address: "",
      other_address: "",
      po_box: "",
      city: [],
      contact_number: "",
      company_email_address: "",
      website: "",
      designation: "",
      main_contact: "",
      main_contact_number: "",
      main_email_address: "",
      secondary_contact: "",
      secondary_contact_number: "",
      secondary_email_address: "",
      secondary_designation: "",
      show: true,
      disabled: 0,
      cartegories: false,
      togglePress: false
    };
  },
  methods: {
    IMAGE_PROCESS(image) {
      const extension = image.type.split("/")[1];
      const icon = new File([image], `${Date.now()}.${extension}`, {
        type: image.type
      });
      return icon;
    },
    submit() {
      let specifier = this.findSpecifier(this.$route.params.id);
      console.log(specifier);
      let formData = {
        specifier_name: this.specifier_name || specifier.specifier_name,
        description: this.description || specifier.description,
        specifier_type: this.specifier_type || specifier.specifier_type,
        contact_info: {
          _id: specifier.contact_info ? specifier.contact_info._id : null,
          country: this.country || specifier.contact_info.country,
          business_address:
            this.business_address || specifier.contact_info.business_address,
          other_address:
            this.other_address || specifier.contact_info.other_address,
          po_box: this.po_box || specifier.contact_info.po_box,
          city: this.city || specifier.contact_info.city,
          contact_number:
            this.contact_number || specifier.contact_info.contact_number,
          company_email_address:
            this.company_email_address ||
            specifier.contact_info.company_email_address,
          website: this.website || specifier.contact_info.website,
          designation: this.designation || specifier.contact_info.designation,
          main_contact:
            this.main_contact || specifier.contact_info.main_contact,
          main_contact_number:
            this.main_contact_number ||
            specifier.contact_info.main_contact_number,
          secondary_contact:
            this.secondary_contact || specifier.contact_info.secondary_contact,
          secondary_contact_number:
            this.secondary_contact_number ||
            specifier.contact_info.secondary_contact_number,
          secondary_email_address:
            this.secondary_email_address ||
            specifier.contact_info.secondary_email_address,
          secondary_designation:
            this.secondary_designation ||
            specifier.contact_info.secondary_designation
        },
        company_attachments: {
          _id: specifier.company_attachments
            ? specifier.company_attachments._id
            : null
        },
        company_logo: this.company_logo
          ? this.IMAGE_PROCESS(this.company_logo)
          : specifier.company_attachments
            ? specifier.company_attachments.company_logo
            : null
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
      this.$store.dispatch("UPDATE_SPECIFIER", {
        id: this.$route.params.id,
        payload: data,
        config
      });
    },
    goBack() {
      this.$router.go(-1);
      // this.$router.replace({path: '/users'})
    },
    handleLogoUpload() {
      this.company_logo = this.$refs.company_logo.files[0];
    },
    input_specifier_name(e) {
      this.main_contact = e;
    },
    input_description(e) {
      this.description = e;
    },
    input_other_address(e) {
      this.other_address = e;
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
    input_specifier_type(e) {
      this.specifier_type = e;
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
      "findSpecifier",
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
    specifierTypes() {
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