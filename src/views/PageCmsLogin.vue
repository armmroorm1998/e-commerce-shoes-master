<template>
  <div align="center">
    <v-container>
      <v-card max-width="400">
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Email*"
                    v-model="email"
                    :rules="emailRules"
                    outlined
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Password*"
                    v-model="password"
                    :rules="passwordRules"
                    type="password"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-btn
                    block
                    color="orange"
                    class="white--text"
                    @click="login"
                  >
                    sign in
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { AuthService } from "@/services/AuthService";
const authService = new AuthService();
import { mapActions } from "vuex";
export default {
  data() {
    return {
      valid: true,
      email: "",
      password: "",
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match"
      },
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 8) || "Password must be more than 8 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  methods: {
    ...mapActions({
      getToken: "user/getToken",
      getUsername: "user/getUsername",
      getRole: "user/getRole"
    }),
    login() {
      if (this.$refs.form.validate()) {
        authService
          .fetchSignIn({
            email: this.email,
            password: this.password
          })
          .then(res => {
            const firstname = res.data.firstname;
            const accessToken = res.data.accessToken;
            const roleUsers = res.data.roles;
            this.getUsername(firstname);
            this.getToken(accessToken);
            this.getRole(roleUsers);
            this.$router.push("/cms");
          })
          .catch(errors => {
            alert(errors);
          });
      }
    }
  }
};
</script>
