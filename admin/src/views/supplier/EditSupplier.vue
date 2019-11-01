<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col cols="12">
          <b-card
            header-tag="header"
            footer-tag="footer">
            <div slot="header">
              <i class="fa fa-align-justify"></i><strong> Edit Supplier</strong>
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
                    <b-form-input id="trade_name" type="text" autocomplete="name" :value="findSupplier($route.params.id).trade_name" @input="input_trade_name"></b-form-input>
                  </b-form-group>
                  <b-form-group
                    label="Overview"
                    label-for="about_company"
                    :label-cols="3"
                    >
                    <b-form-textarea id="about_company" :rows="9" placeholder="please enter data to describe the specifier" :value="findSupplier($route.params.id).about_company" @input="input_about_company"></b-form-textarea>
                  </b-form-group>
                  <b-row>
                    <b-col sm="8">
                      <b-form-group>
                        <label for="listing_type">Supplier Type</label>
                       <b-form-select id="listing_type"
                          :plain="true"
                          :value="findSupplier($route.params.id).listing_type[0]._id"
                          @input="input_listing_type"
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
                          :value="findSupplier($route.params.id).veryfied"
                          @input="input_veryfied">
                          <option value="true">Verified</option>
                          <option value="false">Under Review</option>
                        </b-form-select>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-form-group
                    label="Date Established" label-for="established_date"
                    :label-cols="3"
                    >
                    <b-form-input type="date" id="established_date" :value="fomartDates(findSupplier($route.params.id).established_date)"  @input="input_established_date"></b-form-input>
                  </b-form-group>
                   <b-form-group
                    description="supplier vat registration number."
                    label="VAT Number"
                    label-for="vat_number"
                    :label-cols="3"
                    >
                    <b-form-input id="vat_number" type="text" autocomplete="name" :value="findSupplier($route.params.id).vat_number" @input="imput_vat_number"></b-form-input>
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
                    <b-form-input type="text" id="business_address" placeholder="Enter street name" :value="findSupplier($route.params.id).contact_info.business_address" @input="input_business_address"></b-form-input>
                  </b-form-group>
                  <b-form-group>
                    <label for="business_address">Other Street</label>
                     <b-form-input type="text" id="other_address" placeholder="Enter other street name" :value="findSupplier($route.params.id).contact_info.other_address" @input="input_other_address"></b-form-input>
                  </b-form-group>
                  <b-row>
                    <b-col sm="8">
                      <b-form-group>
                        <label for="contact_number">Office Number</label>
                        <b-form-input type="text" id="contact_number" placeholder="Enter your office landline" :value="findSupplier($route.params.id).contact_info.contact_number" @input="input_contact_number"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col sm="4">
                      <b-form-group>
                        <label for="po_box">P.O Box</label>
                        <b-form-input type="text" id="po_box" placeholder="P.O BOX" :value="findSupplier($route.params.id).contact_info.po_box" @input="input_po_box"></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-form-group>
                        <label for="city">City</label>
                       <b-form-select id="city"
                          :plain="true"
                          :value="findSupplier($route.params.id).contact_info.city[0]._id"
                          @input="input_city"
                          >
                          <option v-for="types in city" :key="types._id" :value="types._id">{{types.label}}</option>
                        </b-form-select>
                      </b-form-group>
                      <b-form-group>
                        <label for="country">Country</label>
                       <b-form-select id="country"
                          :plain="true"
                          :value="findSupplier($route.params.id).contact_info.country[0]._id"
                          @input="input_country"
                          >
                          <option v-for="types in country" :key="types._id" :value="types._id">{{types.label}}</option>
                        </b-form-select>
                      </b-form-group>
                  <b-row>
                    <b-col sm="6">
                      <b-form-group>
                        <label for="company_email_address">Company Email</label>
                        <b-form-input type="email" id="company_email_address" placeholder="Enter company email address" :value="findSupplier($route.params.id).contact_info.company_email_address" @input="input_company_email_address"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col sm="6">
                      <b-form-group>
                        <label for="website">Website</label>
                        <b-form-input type="text" id="website" placeholder="http://wida-me.com" :value="findSupplier($route.params.id).contact_info.website" @input="input_website"></b-form-input>
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
                      <b-form-input type="text" placeholder="Name" name="main_contact" :value="findSupplier($route.params.id).contact_info.main_contact" @input="input_main_contact"></b-form-input>
                    </b-input-group>
                  </b-form-group>
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text> <i class="fa fa-suitcase"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="text" placeholder="Designation" name="designation" :value="findSupplier($route.params.id).contact_info.designation" @input="input_designation"></b-form-input>
                    </b-input-group>
                  </b-form-group>
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-envelope"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="email" placeholder="Email" autocomplete="email" name="main_email_address" :value="findSupplier($route.params.id).contact_info.main_email_address" @input="input_main_email_address"></b-form-input>
                    </b-input-group>
                  </b-form-group>
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-phone "></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="text" placeholder="Phone" autocomplete="current-password" name="main_contact_number" :value="findSupplier($route.params.id).contact_info.main_contact_number" @input="input_main_contact_number"></b-form-input>
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
                      <b-form-input type="text" placeholder="Name" name="secondary_contact" :value="findSupplier($route.params.id).contact_info.secondary_contact" @input="input_secondary_contact"></b-form-input>
                    </b-input-group>
                  </b-form-group>
                  <b-form-group>
                    <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text> <i class="fa fa-suitcase"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="text" placeholder="Designation" name="secondary_designation" :value="findSupplier($route.params.id).contact_info.secondary_designation" @input="input_secondary_designation"></b-form-input>
                    </b-input-group>
                  </b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-envelope"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="email" placeholder="Email" autocomplete="email" name="secondary_email_address" :value="findSupplier($route.params.id).contact_info.secondary_email_address" @input="input_secondary_email_address"></b-form-input>
                    </b-input-group>
                  </b-form-group>
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-phone "></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="text" placeholder="Phone" autocomplete="current-password" name= "secondary_contact_number" :value="findSupplier($route.params.id).contact_info.secondary_contact_number" @input="input_secondary_contact_number"></b-form-input>
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
                        <b-form-input type="text" id="labour_force" placeholder="your labour force" :value="findSupplier($route.params.id).company_statistics.labour_force" @input="input_labour_force"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col sm="6">
                      <b-form-group>
                        <label for="secondary_labour">Secondary Labour Force</label>
                        <b-form-input type="text" id="secondary_labour" placeholder="number of labour from outside" :value="findSupplier($route.params.id).company_statistics.seconday_labour" @input="input_secondary_labour"></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="6">
                      <b-form-group>
                        <label for="office_admin_staff">Office Admin Staff</label>
                        <b-form-input type="text" id="office_admin_staff" placeholder=" number of company admin staff" :value="findSupplier($route.params.id).company_statistics.office_admin_staff" @input="input_office_admin_staff"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col sm="6">
                      <b-form-group>
                        <label for="accreditation">Accreditation</label>
                        <b-form-input type="text" id="accreditation" placeholder="accreditations" :value="findSupplier($route.params.id).company_statistics.accreditation" @input="input_accreditaion"></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="6">
                      <b-form-group>
                        <label for="annual_projects_value">Anual Project Value</label>
                        <b-form-input type="text" id="annual_projects_value" placeholder="Anual project value" :value="findSupplier($route.params.id).company_statistics.annual_projects_value" @input="input_annual_projects_value"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col sm="6">
                      <b-form-group>
                        <label for="current_project_value">Current Project Value</label>
                        <b-form-input type="text" id="current_project_value" placeholder="current project value" :value="findSupplier($route.params.id).company_statistics.current_project_value" @input="input_current_project_value"></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col sm="6">
                      <b-form-group>
                        <label for="credit_allowance">Credit Allowance</label>
                        <b-form-input type="text" id="credit_allowance" placeholder="Allow credit or cash" :value="findSupplier($route.params.id).company_statistics.credit_allowance" @input="input_credit_allowance"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col sm="6">
                      <b-form-group>
                        <label for="min_order_accepted">Min Order Accepted</label>
                        <b-form-input type="text" id="min_order_accepted" placeholder="http://wida-me.com" :value="findSupplier($route.params.id).company_statistics.min_order_accepted"  @input="input_min_order_accepted"></b-form-input>
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
                              <multiselect v-model="key_projects" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="label" track-by="_id" :options="Key_projectsOptions" :multiple="true" :taggable="true" @tag="addTag" ></multiselect>
                             
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
                              <multiselect v-model="categories" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="label" track-by="_id" :options="CategoriesOptions" :multiple="true" :taggable="true" @tag="addTag" ></multiselect>
                             
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
              <b-row>
              <b-col md="8">
              <b-button type="submit" variant="primary" v-on:click="submit()">Update Supplier</b-button>
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
import moment from "moment";

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
      let supplier = this.findSupplier(this.$route.params.id);
      let supplierId = supplier._id;
      let formData = {
        trade_name: this.trade_name || supplier.trade_name,
        listing_type: this.listing_type || supplier.listing_type,
        veryfied: this.veryfied || supplier.veryfied,
        established_date: this.established_date || supplier.established_date,
        trade_licence: this.trade_licence || supplier.trade_licence,
        about_company: this.about_company || supplier.about_company,
        vat_number: this.vat_number || supplier.vat_number,
        categories: this.categories || supplier.categories,
        products: this.products || supplier.products,
        sector: this.sector || supplier.sector,
        key_projects: this.key_projects || supplier.key_projects,
        key_clients: this.key_clients,
        contact_info: {
          country: this.contact_info.country || supplier.contact_info.country,
          business_address:
            this.contact_info.business_address ||
            supplier.contact_info.business_address,
          other_address:
            this.contact_info.other_address ||
            supplier.contact_info.other_address,
          po_box: this.contact_info.po_box || supplier.contact_info.po_box,
          city: this.contact_info.city || supplier.contact_info.city,
          contact_number:
            this.contact_info.contact_number ||
            supplier.contact_info.contact_number,
          fax: this.contact_info.fax || supplier.contact_info.fax,
          company_email_address:
            this.contact_info.company_email_address ||
            supplier.contact_info.company_email_address,
          website: this.contact_info.website || supplier.contact_info.website,
          main_contact:
            this.contact_info.main_contact ||
            supplier.contact_info.main_contact,
          designation:
            this.contact_info.designation || supplier.contact_info.designation,
          main_contact_number:
            this.contact_info.main_contact_number ||
            supplier.contact_info.main_contact_number,
          main_email_address:
            this.contact_info.main_email_address ||
            supplier.contact_info.main_email_address,
          secondary_contact:
            this.contact_info.secondary_contact ||
            supplier.contact_info.secondary_contact,
          secondary_designation:
            this.contact_info.secondary_designation ||
            supplier.contact_info.secondary_designation,
          secondary_email_address:
            this.contact_info.secondary_email_address ||
            supplier.contact_info.secondary_email_address
        },
        company_statistics: {
          labour_force:
            this.company_statistics.labour_force ||
            supplier.company_statistics.labour_force,
          secondary_labour:
            this.company_statistics.secondary_labour ||
            supplier.company_statistics.secondary_labour,
          office_admin_staff:
            this.company_statistics.office_admin_staff ||
            supplier.company_statistics.office_admin_staff,
          accreditation:
            this.company_statistics.accreditation ||
            supplier.company_statistics.accreditation,
          annual_projects_value:
            this.company_statistics.annual_projects_value ||
            supplier.company_statistics.annual_projects_value,
          current_project_value:
            this.company_statistics.current_project_value ||
            supplier.company_statistics.current_project_value,
          credit_allowance:
            this.company_statistics.credit_allowance ||
            supplier.company_statistics.credit_allowance,
          min_order_accepted:
            this.company_statistics.min_order_accepted ||
            supplier.company_statistics.min_order_accepted
        },
        company_logo: this.company_attachments.company_logo
          ? this.IMAGE_PROCESS(this.company_attachments.company_logo)
          : supplier.company_attachments.company_logo,
        gallary_image: this.company_attachments.gallary_image
          ? this.IMAGE_PROCESS(this.company_attachments.gallary_image)
          : supplier.company_attachments.gallary_image,
        company_profile: this.company_attachments.company_profile
          ? this.IMAGE_PROCESS(this.company_attachments.company_profile)
          : supplier.company_attachments.company_profile,
        company_catalogue: this.company_attachments.company_catalogue
          ? this.IMAGE_PROCESS(this.company_attachments.company_catalogue)
          : supplier.company_attachments.company_catalogue,
        trade_licence: this.company_attachments.trade_licence
          ? this.IMAGE_PROCESS(this.company_attachments.trade_licence)
          : supplier.company_attachments.trade_licence
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
      this.$store.dispatch("UPDATE_SUPPLIER", {
        id: supplierId,
        data: data,
        config
      });
    },
    fomartDates(dates) {
      let newdate = moment(dates).format("MMMM D, YYYY");
      console.log(newdate);
      return newdate;
    },
    input_trade_name(e) {
      this.trade_name = e;
    },

    input_about_company(e) {
      this.about_company = e;
    },
    input_listing_type(e) {
      this.listing_type = e;
    },
    input_veryfied(e) {
      this.veryfied = e;
    },
    imput_vat_number(e) {
      this.vat_number = e;
    },
    input_established_date(e) {
      this.established_date = e;
    },
    input_other_address(e) {
      this.contact_info.other_address = e;
    },
    input_business_address(e) {
      this.contact_info.business_address = e;
    },
    input_contact_number(e) {
      this.contact_info.contact_number = e;
    },
    input_po_box(e) {
      this.contact_info.po_box = e;
    },
    input_city(e) {
      this.contact_info.city = e;
    },
    input_country(e) {
      this.contact_info.country = e;
    },
    input_company_email_address(e) {
      this.contact_info.company_email_address = e;
    },
    input_website(e) {
      this.contact_info.website = e;
    },
    input_main_contact(e) {
      this.contact_info.main_contact = e;
    },
    input_designation(e) {
      this.contact_info.designation = e;
    },
    input_main_email_address(e) {
      this.contact_info.main_email_address = e;
    },
    input_main_contact_number(e) {
      this.contact_info.main_contact_number = e;
    },
    input_secondary_contact(e) {
      this.contact_info.secondary_contact = e;
    },
    input_secondary_designation(e) {
      this.contact_info.secondary_designation = e;
    },
    input_secondary_email_address(e) {
      this.contact_info.secondary_email_address = e;
    },
    input_secondary_contact_number(e) {
      this.contact_info.secondary_contact_number = e;
    },
    input_labour_force(e) {
      this.company_statistics.labour_force = e;
    },
    input_secondary_labour(e) {
      this.company_statistics.secondary_labour = e;
    },
    input_office_admin_staff(e) {
      this.company_statistics.office_admin_staff = e;
    },
    input_accreditaion(e) {
      this.company_statistics.accreditaion = e;
    },
    input_annual_projects_value(e) {
      this.company_statistics.annual_projects_value = e;
    },
    input_current_project_value(e) {
      this.company_statistics.current_project_value = e;
    },
    input_credit_allowance(e) {
      this.company_statistics.credit_allowance = e;
    },
    input_min_order_accepted(e) {
      this.company_statistics.min_order_accepted = e;
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
    },
    goBack() {
      this.$router.go(-1);
      // this.$router.replace({path: '/users'})
    }
  },
  computed: {
    ...mapGetters([
      "findSupplier",
      "findCategory",
      "findCity",
      "findCountry",
      "findKeyProjects",
      "findProducts",
      "findSectors"
    ]),
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
  },
  created() {
    let supplier = this.findSupplier(this.$route.params.id);
    this.categories = supplier.categories;
    this.key_projects = supplier.key_projects;
    this.sector = supplier.sector;
    this.products = supplier.products;
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