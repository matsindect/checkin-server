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
                  <b-form-group
                    label="Specifier Type"
                    label-for="specifier_type"
                    :label-cols="3"
                    >
                    <b-form-select id="specifier_type"
                      :plain="true"
                      :options="['Please select','Option 1', 'Option 2', 'Option 3']"
                      value="Please Select Specifier Type">
                    </b-form-select>
                  </b-form-group>
                  <b-form-group>
                    <label for="street">Logo</label> 
                    <b-form-file id="fileInput" :plain="true"></b-form-file>
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
                  <b-row>
                    <b-col sm="8">
                      <b-form-group>
                        <label for="city">City</label>
                        <b-form-input type="text" id="city" placeholder="Enter your city"></b-form-input>
                      </b-form-group>
                    </b-col>
                    <b-col sm="4">
                      <b-form-group>
                        <label for="postal-code">Postal Code</label>
                        <b-form-input type="text" id="postal-code" placeholder="Postal Code"></b-form-input>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-form-group>
                    <label for="country">Country</label>
                    <b-form-input type="text" id="country" placeholder="Country name"></b-form-input>
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
                      <b-form-input type="text" placeholder="Name" name="main_contact'"></b-form-input>
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
                      <b-form-input type="text" placeholder="Phone" autocomplete="current-password"></b-form-input>
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
                      <b-form-input type="text" placeholder="Name"></b-form-input>
                    </b-input-group>
                  </b-form-group>
                  <b-form-group>
                    <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text> <i class="fa fa-suitcase"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="text" placeholder="Designation" name="secondary_designation"></b-form-input>
                    </b-input-group>
                  </b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-envelope"></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="email" placeholder="Email" autocomplete="email"></b-form-input>
                    </b-input-group>
                  </b-form-group>
                  <b-form-group>
                    <b-input-group>
                      <b-input-group-prepend>
                        <b-input-group-text><i class="fa fa-phone "></i></b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input type="text" placeholder="Phone" autocomplete="current-password"></b-form-input>
                    </b-input-group>
                  </b-form-group>
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
export default {
  name: 'breadcrumbs',
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
      show: true,
      disabled: 0,
      cartegories: false,
      togglePress: false
    };
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