<template>
    <b-col md="6">
        <b-card>
          <div slot="header">
            <strong>Basic Form</strong> Elements
          </div>
          <b-form>
          <b-form-group
            description="Listing Type Name."
            label="Listing Type"
            label-for="basicName"
            :label-cols="3"
            >
            <b-form-input id="basicName" type="text" autocomplete="name"></b-form-input>
          </b-form-group>
          <b-form-group
            description="Slug."
            label="Slug"
            label-for="basicslug"
            :label-cols="3"
            >
            <b-form-input id="basicslug" type="text" autocomplete="name"></b-form-input>
          </b-form-group>
          
          <b-form-group
            label="Date" label-for="date"
            :label-cols="3"
            >
            <b-form-input type="date" id="date"></b-form-input>
          </b-form-group>
          <b-form-group
            label="Settings"
            label-for="basicSelect"
            :label-cols="3"
            >
            
          </b-form-group>
          
          <b-row class="form-group" v-for="(setting, index) in settings" :key="index">
            <b-col md="6">
              <b-form-input type="text" v-model="settings.name" name="settings[][name]" placeholder=".col-md-6"></b-form-input>
            </b-col>
            <b-col md="6">
              <b-form-select id="basicSelect"
              :plain="true"
              :options="['Please select','Option 1', 'Option 2', 'Option 3']"
              value="Please select"
              v-model="settings.type"
              name="settings[][type]"
              >
            </b-form-select>
            </b-col>
            <b-col md="6">
              <b-button type="button" v-on:click="removeApartment(index)"  class="btn btn-block btn-danger">Remove Fields</b-button>
            </b-col>
          </b-row>
           <b-row class="form-group">
            <b-col md="6">
              <b-button type="button" v-on:click="addNewSetting" class="btn btn-sm btn-info">Add More Fields</b-button>
            </b-col>
            
          </b-row>
          <b-form-group
            label="Icon"
            label-for="fileInput"
            :label-cols="3"
            >
              <b-form-file id="fileInput" :plain="true"></b-form-file>
          </b-form-group>
          <div slot="footer">
            <b-button type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
            <b-button type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button>
          </div>
          </b-form>
        </b-card>
      </b-col>
      
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      setting: {
        id: this.count++,
        name: '',
        type: ''
      },
      settings: []
    };
  },
  methods: {
    addNewSetting() {
      this.settings.push(this.setting);
    },
    removeApartment(index) {
      this.settings.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
