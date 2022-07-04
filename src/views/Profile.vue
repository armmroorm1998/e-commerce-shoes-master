<template>
  <div>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          class="text-uppercase display-2 font-weight-black"
        >
          Profile Settings
        </v-col>
        <v-col cols="12" sm="6" align="center">
          <v-img
            src="@/assets/undraw_profile_image_n3cj.svg"
            max-width="500"
          ></v-img>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-bottom-navigation value="1" color="purple lighten-1">
            <v-btn @click="active = 'profile'">
              <span>Profile</span>
              <v-icon>mdi-account-convert</v-icon>
            </v-btn>
            <v-btn @click="active = 'setting'">
              <span>Setting</span>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </v-bottom-navigation>
        </v-col>
      </v-row>
      <v-row v-if="this.active === 'profile'">
        <v-col cols="12" sm="6">
          <v-text-field label="Full Name" outlined></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field label="Phone" outlined></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field label="Address" outlined></v-text-field>
        </v-col>
        <v-col cols="12" sm="9">
          <v-text-field label="Address" outlined></v-text-field>
        </v-col>
        <v-col cols="12" sm="3">
          <v-btn x-large color="primary" dark block>Save Change</v-btn>
        </v-col>
      </v-row>
      <v-row v-if="this.active === 'setting'">
        <v-col cols="12" sm="6">
          <v-text-field label="User Name" outlined></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field label="Email" outlined></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field label="New password" outlined></v-text-field>
        </v-col>
        <v-col cols="12" sm="9">
          <v-text-field label="Confirm password" outlined></v-text-field>
        </v-col>
        <v-col cols="12" sm="3">
          <v-btn x-large color="primary" dark block>Save Change</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "profile",
  data() {
    return {
      active: "profile"
    };
  }
};
</script>
