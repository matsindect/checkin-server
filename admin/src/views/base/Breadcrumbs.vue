<template>
  <div class="wrapper">
    <div class="animated fadeIn">
      <b-row>
        <b-col cols="12">
          <b-card
            header-tag="header"
            footer-tag="footer">
            <div slot="header">
              <i class="fa fa-align-justify"></i><strong> Bootstrap Breadcrumb</strong>
              <div class="card-header-actions">
                <a href="https://bootstrap-vue.js.org/docs/components/breadcrumb" class="card-header-action" rel="noreferrer noopener" target="_blank">
                  <small class="text-muted">docs</small>
                </a>
              </div>
            </div>
            <b-breadcrumb :items="items"/>
            <b-row>
              <b-col sm="6">
                <b-card>
                  <div slot="header">
                    <strong>Taxonomies</strong><small>Form</small>
                  </div>
                  <b-form-group>
                    <label for="company">Name</label>
                    <b-form-input type="text" id="company" placeholder="Enter taxonomy name"></b-form-input>
                  </b-form-group>
                  <b-form-group>
                    <label for="vat">Slug</label>
                    <b-form-input type="text" id="vat" placeholder="PL1234567890"></b-form-input>
                  </b-form-group>
                  <b-form-group>
                    <label for="street">icon</label> 
                    <b-form-file id="fileInput" :plain="true"></b-form-file>
                  </b-form-group>
                  
                </b-card>
              </b-col>
              <b-col sm="6">
                <b-card>
                  <div slot="header">
                    <strong>Settings </strong><small>Form</small>
                  </div>
                  <b-form-group>
                    <label for="company">Choose which fields to show</label>
                  </b-form-group>
                 <b-form-group label="Append with button" label-for="elementsAppendButton" description="Here's some help text">
                    <b-input-group>
                      <b-form-input id="elementsAppendButton" type="text" :categories="disabled == 1 ? true : false" :disabled="disabled == 1 ? true : false"></b-form-input>
                      <b-input-group-append>
                        <b-button variant="outline-success" :pressed.sync="togglePress" @click="disabled = (disabled + 1) % 2">{{togglePress ? 'Off' : 'On '}}</b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                  
                  <b-form-group>
                    <label for="street">Street</label>
                    <b-form-input type="text" id="street" placeholder="Enter street name"></b-form-input>
                  </b-form-group>
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
            <b-col sm="6" md="4">
              <transition name="fade">
                <b-card class="bg-secondary" no-body v-if="show">
                  <div slot="header">
                    Card with header actions
                    <div class="card-header-actions">
                      
                      <b-link class="card-header-action btn-minimize" v-b-toggle.collapse1>
                        <i class="icon-arrow-up"></i>
                      </b-link>
                      <b-link href="#" class="card-header-action btn-close" v-on:click="show = !show">
                        <i class="icon-close"></i>
                      </b-link>
                    </div>
                  </div>
                  <b-collapse id="collapse1" visible>
                    <b-card-body>
                      
                    </b-card-body>
                  </b-collapse>
                </b-card>
              </transition>
            </b-col>
            
            <b-col sm="6" md="4">
              <transition name="fade">
                <b-card class="bg-secondary" no-body v-if="show">
                  <div slot="header">
                    Card with header actions
                    <div class="card-header-actions">
                      
                      <b-link class="card-header-action btn-minimize" v-b-toggle.collapse1>
                        <i class="icon-arrow-up"></i>
                      </b-link>
                      <b-link href="#" class="card-header-action btn-close" v-on:click="show = !show">
                        <i class="icon-close"></i>
                      </b-link>
                    </div>
                  </div>
                  <b-collapse id="collapse1" visible>
                    <b-card-body>
                      
                    </b-card-body>
                  </b-collapse>
                </b-card>
              </transition>
            </b-col>
            <b-col sm="6" md="4">
              <transition name="fade">
                <b-card class="bg-secondary" no-body v-if="show">
                  <div slot="header">
                    Card with header actions
                    <div class="card-header-actions">
                      
                      <b-link class="card-header-action btn-minimize" v-b-toggle.collapse1>
                        <i class="icon-arrow-up"></i>
                      </b-link>
                      <b-link href="#" class="card-header-action btn-close" v-on:click="show = !show">
                        <i class="icon-close"></i>
                      </b-link>
                    </div>
                  </div>
                  <b-collapse id="collapse1" visible>
                    <b-card-body>
                      
                    </b-card-body>
                  </b-collapse>
                </b-card>
              </transition>
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