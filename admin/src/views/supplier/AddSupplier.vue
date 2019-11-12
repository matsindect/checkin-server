<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col cols="12">
          <b-card
            header-tag="header"
            footer-tag="footer">
            <div slot="header">
              <i class="fa fa-align-justify"></i><strong> Add New Supplier</strong>
              <div class="card-header-actions">
                <!--Action to toggle will come here -->
              </div>
            </div>
            <b-row>
              <b-col sm="6">
                <b-card>
                  <div slot="header">
                    <strong>Supplier Details</strong>
                  </div>
                  <b-form-group
                    description="Suppier name is required."
                    label="Supplier Name"
                    label-for="trade_name"
                    :label-cols="3"
                    >
                    <b-form-input id="trade_name" type="text" autocomplete="name" v-model="trade_name"></b-form-input>
                  </b-form-group>
                  <b-form-group
                    label="Overview"
                    label-for="about_company"
                    :label-cols="3"
                    >
                    <b-form-textarea id="about_company" :rows="9" placeholder="please enter data to describe the specifier" v-model="about_company"></b-form-textarea>
                  </b-form-group>
                  <b-row>
                    <b-col sm="8">
                      <b-form-group>
                        <label for="listing_type">Supplier Type</label>
                       <b-form-select id="listing_type"
                          :plain="true"
                          v-model="listing_type"
                         >
                          <option  v-for="types in supplierType" :key="types._id" :value="types._id">{{types.label}}</option>
                        </b-form-select>
                      </b-form-group>
                    </b-col>
                    <b-col sm="4">
                      <b-form-group>
                        <label for="listing_type">Verified</label>
                       <b-form-select id="listing_type"
                          :plain="true"
                          v-model="veryfied">
                          <option value="true">Verifies</option>
                          <option value="false">Under Review</option>
                        </b-form-select>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-form-group
                    label="Date Established" label-for="established_date"
                    :label-cols="3"
                    >
                    <b-form-input type="date" id="established_date" v-model="established_date"></b-form-input>
                  </b-form-group>
                   <b-form-group
                    description="supplier vat registration number."
                    label="VAT Number"
                    label-for="vat_number"
                    :label-cols="3"
                    >
                    <b-form-input id="vat_number" type="text" autocomplete="name" v-model="vat_number"></b-form-input>
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
                    <b-form-input type="text" id="business_address" placeholder="Enter street name" v-model="contact_info.business_address"></b-form-input>
                  </b-form-group>
                  <b-form-group>
                    <label for="business_address">Other Street</label>
                     <b-form-input type="text" id="other_address" placeholder="Enter other street name" v-model="contact_info.other_address"></b-form-input>
                  </b-form-group>
                  <b-row>
                    <b-col sm="8">
                      <b-form-group>
                        <label for="contact_number">Office Number</label>
                        <b-form-input type="text" id="contact_number" placeholder="Enter your office landline" v-model="contact_info.contact_number"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col sm="4">
                      <b-form-group>
                        <label for="po_box">P.O Box</label>
                        <b-form-input type="text" id="po_box" placeholder="P.O BOX" v-model="contact_info.po_box"></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-form-group>
                        <label for="city">City</label>
                       <b-form-select id="city"
                          :plain="true"
                          v-model="contact_info.city"
                          >
                          <option v-for="types in city" :key="types._id" :value="types._id">{{types.label}}</option>
                        </b-form-select>
                      </b-form-group>
                      <b-form-group>
                        <label for="country">Country</label>
                       <b-form-select id="country"
                          :plain="true"
                          v-model="contact_info.country"
                          >
                          <option v-for="types in country" :key="types._id" :value="types._id">{{types.label}}</option>
                        </b-form-select>
                      </b-form-group>
                  <b-row>
                    <b-col sm="6">
                      <b-form-group>
                        <label for="company_email_address">Company Email</label>
                        <b-form-input type="email" id="company_email_address" placeholder="Enter company email address" v-model="contact_info.company_email_address"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col sm="6">
                      <b-form-group>
                        <label for="website">Website</label>
                        <b-form-input type="text" id="website" placeholder="http://wida-me.com" v-model="contact_info.website"></b-form-input>
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
                  Main Contact Person
                </div>
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="text" placeholder="Name" name="main_contact" v-model="contact_info.main_contact"></b-form-input>
                    </b-input-group>
                  </b-form-group>
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text> <i class="fa fa-suitcase"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="text" placeholder="Designation" name="designation" v-model="contact_info.designation"></b-form-input>
                    </b-input-group>
                  </b-form-group>
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-envelope"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="email" placeholder="Email" autocomplete="email" name="main_email_address" v-model="contact_info.main_email_address"></b-form-input>
                    </b-input-group>
                  </b-form-group>
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-phone "></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="text" placeholder="Phone" autocomplete="current-password" name="main_contact_number" v-model="contact_info.main_contact_number"></b-form-input>
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
                      <b-form-input type="text" placeholder="Name" name="secondary_contact" v-model="contact_info.secondary_contact"></b-form-input>
                    </b-input-group>
                  </b-form-group>
                  <b-form-group>
                    <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text> <i class="fa fa-suitcase"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="text" placeholder="Designation" name="secondary_designation" v-model="contact_info.secondary_designation"></b-form-input>
                    </b-input-group>
                  </b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-envelope"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="email" placeholder="Email" autocomplete="email" name="secondary_email_address" v-model="contact_info.secondary_email_address"></b-form-input>
                    </b-input-group>
                  </b-form-group>
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-phone "></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="text" placeholder="Phone" autocomplete="current-password" name= "secondary_contact_number" v-model="contact_info.secondary_contact_number"></b-form-input>
                    </b-input-group>
                  </b-form-group>
              </b-card>
            </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
              <b-card>
                <div slot="header">
                  Supplier Attachments
                </div>
                <b-form-group>
                    <div class="input-group mb-3">
                    <input type="file" ref="company_logo" id="company_logo" :plain="true" name="company_logo" @change="handleLogoUpload()" class="custom-file-input" />
                    <label class="custom-file-label" for="company_logo">Choose Logo</label>
                    </div>
                  </b-form-group>
                  <b-form-group>
                    <div class="input-group mb-3">
                    <input type="file" ref="trade_licence" id="trade_licence" :plain="true" name="trade_licence" @change="handleLisenceUpload()" class="custom-file-input"/>
                    <label class="custom-file-label" for="trade_licence">Trade Lisence</label>
                    </div>
                  </b-form-group>
                  <b-form-group>
                    <div class="input-group mb-3">
                    <input type="file" ref="company_profile" id="company_profile" :plain="true" name="company_profile" @change="handleProfileUpload()" class="custom-file-input"/>
                    <label class="custom-file-label" for="company_profile">Choose Company Profile</label>
                    </div>
                  </b-form-group>
                  <b-form-group>
                    <div class="input-group mb-3">
                    <input type="file" ref="company_catalogue" id="company_catalogue" :plain="true" name="company_catalogue" @change="handleCatalogueUpload()" class="custom-file-input"/>
                    <label class="custom-file-label" for="company_catalogue">Choose Company Catalogue</label>
                    </div>
                  </b-form-group>
                  <b-form-group>
                    <div class="input-group mb-3">
                    <input type="file" ref="gallary_image" id="gallary_image" :plain="true" name="gallary_image" @change="handleGallaryUpload()" class="custom-file-input"/>
                    <label class="custom-file-label" for="gallary_image">Choose Gallary photo</label>
                    </div>
                  </b-form-group>
              </b-card>
            </b-col>
             <b-col md="6">
              <b-card>
                <div slot="header">
                  Supplier Figures
                </div>
                <b-row>
                    <b-col sm="6">
                      <b-form-group>
                        <label for="labour_force">Inhouse Labour Force</label>
                        <b-form-input type="text" id="labour_force" placeholder="your labour force" v-model="company_statistics.labour_force"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col sm="6">
                      <b-form-group>
                        <label for="secondary_labour">Secondary Labour Force</label>
                        <b-form-input type="text" id="secondary_labour" placeholder="number of labour from outside" v-model="company_statistics.seconday_labour"></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="6">
                      <b-form-group>
                        <label for="office_admin_staff">Office Admin Staff</label>
                        <b-form-input type="text" id="office_admin_staff" placeholder=" number of company admin staff" v-model="company_statistics.office_admin_staff"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col sm="6">
                      <b-form-group>
                        <label for="accreditation">Accreditation</label>
                        <b-form-input type="text" id="accreditation" placeholder="accreditations" v-model="company_statistics.accreditation"></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="6">
                      <b-form-group>
                        <label for="annual_projects_value">Anual Project Value</label>
                        <b-form-input type="text" id="annual_projects_value" placeholder="Anual project value" v-model="company_statistics.annual_projects_value"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col sm="6">
                      <b-form-group>
                        <label for="current_project_value">Current Project Value</label>
                        <b-form-input type="text" id="current_project_value" placeholder="current project value" v-model="company_statistics.current_project_value"></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="6">
                      <b-form-group>
                        <label for="credit_allowance">Credit Allowance</label>
                        <b-form-input type="text" id="credit_allowance" placeholder="Allow credit or cash" v-model="company_statistics.credit_allowance"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col sm="6">
                      <b-form-group>
                        <label for="min_order_accepted">Min Order Accepted</label>
                        <b-form-input type="text" id="min_order_accepted" placeholder="http://wida-me.com" v-model="company_statistics.min_order_accepted"></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
              </b-card>
            </b-col>
            </b-row>
            <b-row>
              <b-col lg="12">
                <transition name="fade">
                  <b-card no-body v-if="show">
                    <div slot="header">
                      <i class="fa fa-edit"></i> Supplier Groupings
                      <div class="card-header-actions">
                        
                        <b-link class="card-header-action btn-minimize" v-b-toggle.collapse1>
                          <i class="icon-arrow-up"></i>
                        </b-link>
                        
                      </div>
                    </div>
                    <b-collapse id="collapse1" visible>
                      <b-card-body>
                        <b-row>
                        <b-col md="4">
                          <b-form-group>
                            <label for="key_projects">Key Projects</label>
                            <div>
                              <multiselect v-model="key_projects" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="label" track-by="_id" :options="Key_projectsOptions" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
                             
                            </div>
                          </b-form-group>
                        </b-col>
                        <!-- <b-col md="4">
                          <b-form-group>
                            <label for="key_clients">Key Clients</label>
                            <div>
                              <multiselect v-model="key_clients" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name" track-by="code" :options="options" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
                              
                            </div>
                          </b-form-group>
                        </b-col> -->
                        <b-col md="4">
                          <b-form-group>
                            <label for="categories">Categories</label>
                            <div>
                              <multiselect v-model="categories" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="label" track-by="_id" :options="CategoriesOptions" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
                             
                            </div>
                          </b-form-group>
                        </b-col>
                        <b-col md="4">
                          <b-form-group>
                            <label for="sector">Sectors</label>
                            <div>
                              <multiselect v-model="sector" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="label" track-by="_id" :options="SectorOptions" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
                            
                            </div>
                          </b-form-group>
                        </b-col>
                        <b-col md="4">
                          <b-form-group>
                            <label for="products">Products</label>
                            <div>
                              <multiselect v-model="products" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="label" track-by="_id" :options="ProductsOptions" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
                              
                            </div>
                          </b-form-group>
                        </b-col>
                        </b-row>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </transition>
              </b-col>
            </b-row>
            <div class="form-actions">
              <b-button type="submit" variant="primary" v-on:click="submit()">Save Supplier</b-button>
            </div>
          </b-card>
        </b-col>
        
      </b-row>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import jsonToFormData from "json-form-data";
import country from "../../store/modules/country";
export default {
  name: "breadcrumbs",
  components: {
    Multiselect
  },
  data() {
    return {
      key_clientsOptions: [],
      trade_name: "",
      listing_type: "",
      veryfied: null,
      established_date: "",
      categories: [],
      products: [],
      sector: [],
      key_projects: [],
      key_clients: [],
      about_company: "",
      vat_number: "",
      contact_info: {
        country: [],
        business_address: "",
        other_address: "",
        po_box: "",
        city: [],
        contact_number: "",
        fax: "",
        company_email_address: "",
        website: "",
        main_contact: "",
        designation: "",
        main_contact_number: "",
        main_email_address: "",
        secondary_contact: "",
        secondary_designation: "",
        secondary_email_address: ""
      },
      company_attachments: {
        company_logo: "",
        gallary_image: "",
        company_profile: "",
        company_catalogue: "",
        trade_licence: ""
      },
      company_statistics: {
        labour_force: "",
        secondary_labour: "",
        office_admin_staff: "",
        accreditation: "",
        annual_projects_value: "",
        current_project_value: "",
        credit_allowance: "",
        min_order_accepted: ""
      },
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
      let formData = {
        trade_name: this.trade_name,
        listing_type: this.listing_type,
        veryfied: false,
        established_date: this.established_date,
        trade_licence: this.trade_licence,
        about_company: this.about_company,
        vat_number: this.vat_number,
        categories: this.categories,
        products: this.products,
        sector: this.sector,
        key_projects: this.key_projects,
        key_clients: this.key_clients,
        contact_info: {
          country: this.contact_info.country,
          business_address: this.contact_info.business_address,
          other_address: this.contact_info.other_address,
          po_box: this.contact_info.po_box,
          city: this.contact_info.city,
          contact_number: this.contact_info.contact_number,
          fax: this.contact_info.fax,
          company_email_address: this.contact_info.company_email_address,
          website: this.contact_info.website,
          main_contact: this.contact_info.main_contact,
          designation: this.contact_info.designation,
          main_contact_number: this.contact_info.main_contact_number,
          main_email_address: this.contact_info.main_email_address,
          secondary_contact: this.contact_info.secondary_contact,
          secondary_designation: this.contact_info.secondary_designation,
          secondary_email_address: this.contact_info.secondary_email_address,
          secondary_contact_number: this.contact_info.secondary_contact_number
        },
        company_statistics: {
          labour_force: this.company_statistics.labour_force,
          secondary_labour: this.company_statistics.secondary_labour,
          office_admin_staff: this.company_statistics.office_admin_staff,
          accreditation: this.company_statistics.accreditation,
          annual_projects_value: this.company_statistics.annual_projects_value,
          current_project_value: this.company_statistics.current_project_value,
          credit_allowance: this.company_statistics.credit_allowance,
          min_order_accepted: this.company_statistics.min_order_accepted
        },

        company_logo: this.company_attachments.company_logo
          ? this.IMAGE_PROCESS(this.company_attachments.company_logo)
          : null,
        gallary_image: this.company_attachments.gallary_image
          ? this.IMAGE_PROCESS(this.company_attachments.gallary_image)
          : null,
        company_profile: this.company_attachments.company_profile
          ? this.IMAGE_PROCESS(this.company_attachments.company_profile)
          : null,
        company_catalogue: this.company_attachments.company_catalogue
          ? this.IMAGE_PROCESS(this.company_attachments.company_catalogue)
          : null,
        trade_licence: this.company_attachments.trade_licence
          ? this.IMAGE_PROCESS(this.company_attachments.trade_licence)
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
      this.$store.dispatch("SAVE_SUPPLIER", {
        data: data,
        config
      });
    },
    handleLogoUpload() {
      this.company_attachments.company_logo = this.$refs.company_logo.files[0];
    },
    handleProfileUpload() {
      this.company_attachments.company_profile = this.$refs.company_profile.files[0];
    },
    handleLisenceUpload() {
      this.company_attachments.trade_licence = this.$refs.trade_licence.files[0];
    },
    handleCatalogueUpload() {
      this.company_attachments.company_catalogue = this.$refs.company_catalogue.files[0];
    },
    handleGallaryUpload() {
      this.company_attachments.gallary_image = this.$refs.gallary_image.files[0];
    }
  },
  computed: {
    city() {
      return this.$store.state.city.city;
    },
    country() {
      return this.$store.state.country.country;
    },
    supplierType() {
      return this.$store.state.supplierType.suppliertype;
    },
    CategoriesOptions() {
      return this.$store.state.categories.categories;
    },
    ProductsOptions() {
      return this.$store.state.products.products;
    },
    SectorOptions() {
      return this.$store.state.sector.sector;
    },
    Key_projectsOptions() {
      return this.$store.state.keyProjects.keyprojects;
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