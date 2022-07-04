<template>
  <div>
    <v-dialog v-model="dialogLogin.dialog" max-width="600">
      <template v-slot:activator="{ on }" v-if="!token">
        <v-btn dark v-on="on">Login</v-btn>
      </template>
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialogLogin.dialog = false">
            <v-icon>mdi-close-circle</v-icon>
          </v-btn>
        </v-card-actions>
        <v-row no-gutters justify="center" align="center">
          <v-img src="@/assets/logoEnhancer.png" max-width="100"></v-img>
          <!-- <span class="headline">User Profile</span> -->
        </v-row>
        <v-row no-gutters>
          <v-col cols="12" justify="center" align="center">
            <span class="display-1 font-weight-black text-uppercase"
              >login</span
            >
          </v-col>
          <v-col cols="12" justify="center" align="center">
            <span class="headline font-weight-black text-uppercase"
              >to get an exclusive</span
            >
          </v-col>
          <v-col cols="12" justify="center" align="center">
            <span class="headline font-weight-black text-uppercase"
              >experience</span
            >
          </v-col>
        </v-row>

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
                <v-col cols="12" sm="6">
                  <v-checkbox
                    style=" margin-top: 0px;"
                    hide-details
                    class="overline text-capitalize"
                    label="Remember me"
                  ></v-checkbox>
                </v-col>
                <v-col cols="12" align="right" sm="6">
                  <a href="#" class="overline text-capitalize"
                    >forgot your password?</a
                  >
                </v-col>
                <v-col cols="12">
                  <v-btn
                    block
                    color="orange"
                    :disabled="!valid"
                    class="white--text"
                    @click="login()"
                    >sign in</v-btn
                  >
                </v-col>
                <v-col cols="12">
                  <v-btn @click="socialFacebook" block color="#3578E5" dark>
                    <v-icon left>mdi-facebook</v-icon>Facebook
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-container>

          <v-divider></v-divider>
          <div class="text-center my-5">
            <span class="headline font-weight-bold">Or</span>
            <v-btn block color="orange" class="mt-5" @click="openSignUp" dark
              >Join with us</v-btn
            >
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog1" max-width="600">
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog1 = false">
            <v-icon>mdi-close-circle</v-icon>
          </v-btn>
        </v-card-actions>
        <v-row no-gutters justify="center" align="center">
          <v-img src="@/assets/logoEnhancer.png" max-width="100"></v-img>
          <!-- <span class="headline">User Profile</span> -->
        </v-row>
        <v-row no-gutters>
          <v-col cols="12" justify="center" align="center">
            <span class="display-1 font-weight-black text-uppercase"
              >Sign Up</span
            >
          </v-col>
          <v-col cols="12" justify="center" align="center">
            <span class="headline font-weight-black text-uppercase"
              >to get an exclusive</span
            >
          </v-col>
          <v-col cols="12" justify="center" align="center">
            <span class="headline font-weight-black text-uppercase"
              >experience</span
            >
          </v-col>
        </v-row>

        <v-card-text>
          <div class="text-center my-5">
            <!-- <v-btn block color="#3578E5" dark
              ><v-icon left>mdi-facebook</v-icon> Register with facebook</v-btn
            >
            <div class="headline font-weight-bold mt-5">Or</div>-->
          </div>
          <v-divider></v-divider>
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
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Legal first name*"
                    v-model="firstname"
                    :rules="firstnameRules"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Legal last name*"
                    v-model="lastname"
                    :rules="lastnameRules"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    hide-details
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="date"
                        :rules="BirthdayDateRules"
                        required
                        label="Birthday date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      ref="picker"
                      v-model="date"
                      :max="new Date().toISOString().substr(0, 10)"
                      min="1950-01-01"
                      @change="save"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12">
                  <v-checkbox
                    v-model="checkbox"
                    :rules="[v => !!v || 'You must agree to continue!']"
                    required
                  >
                    <template v-slot:label>
                      <div>
                        I agree to
                        <template>
                          <a href="#">Terms & Condittions</a>
                        </template>
                        and
                        <template>
                          <a href="#">Privacy Policy</a>
                        </template>
                      </div>
                    </template>
                  </v-checkbox>
                </v-col>
                <v-col cols="12">
                  <v-btn
                    block
                    color="orange"
                    :disabled="!valid"
                    class="white--text"
                    @click="signUp()"
                    >Create Account</v-btn
                  >
                  <div class="text-center">
                    Already have an account?
                    <a @click="openLogin">Sign in</a>
                  </div>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import firebase from "firebase/app";
import { mapActions, mapGetters } from "vuex";
import { Toast } from "../main";
// import { AuthService } from "@/services/AuthService";
// const authService = new AuthService();
export default {
  data: () => ({
    dialog: false,
    dialog1: false,
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    checkbox: false,
    valid: true,
    firstnameRules: [
      v => !!v || "Firstname is required",
      v => (v && v.length <= 50) || "Firstname must be less than 50 characters"
    ],
    BirthdayDateRules: [v => !!v || "Birthday date is required"],
    lastnameRules: [
      v => !!v || "Lastname is required",
      v => (v && v.length <= 50) || "Firstname must be less than 50 characters"
    ],
    passwordRules: [
      v => !!v || "Password is required",
      v => (v && v.length >= 8) || "Password must be more than 8 characters"
    ],
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    date: null,
    menu: false
  }),
  props: ["dialogLogin"],
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  computed: {
    ...mapGetters({ token: "user/token" })
  },
  methods: {
    ...mapActions({
      getToken: "user/getToken",
      getUsername: "user/getUsername",
      getRole: "user/getRole"
    }),
    login() {
      if (this.$refs.form.validate()) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(res => {
            console.log(res);
            const firstname = res.user.email;
            this.getUsername(firstname);
            const accessToken = res.user.refreshToken;
            this.getToken(accessToken);
            Toast.fire({
              icon: "success",
              title: "Login success"
            });
            if (this.token) {
              this.dialogLogin.dialog = false;
            }
          })
          .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === "auth/wrong-password") {
              Toast.fire({
                icon: "error",
                title: "Wrong password"
              });
            } else {
              Toast.fire({
                icon: "error",
                title: errorMessage
              });
            }
          });
        // authService
        //   .fetchSignIn({
        //     email: this.email,
        //     password: this.password
        //   })
        //   .then(res => {
        //     const firstname = res.data.firstname;
        //     const accessToken = res.data.accessToken;
        //     const roleUsers = res.data.roles;
        //     this.getUsername(firstname);
        //     this.getToken(accessToken);
        //     this.getRole(roleUsers);
        //     if (this.token) {
        //       this.dialogLogin.dialog = false;
        //     }
        //   })
        //   .catch(errors => {
        //     alert(errors);
        //   });
      }
    },
    signUp() {
      if (this.$refs.form.validate()) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(() => {
            Toast.fire({
              icon: "success",
              title: "Register success"
            });
            this.dialog1 = false;
          })
          .catch(function(error) {
            // var errorCode = error.code;
            var errorMessage = error.message;
            Toast.fire({
              icon: "error",
              title: errorMessage
            });
          });
        // authService
        //   .fetchSignUp({
        //     firstname: this.firstname,
        //     lastname: this.lastname,
        //     email: this.email,
        //     password: this.password,
        //     date: this.date,
        //     roles: ["user"]
        //   })
        //   .then(res => {
        //     alert(res.data.message);

        //     this.dialog1 = false;
        //   })
        //   .catch(errors => {
        //     alert(errors);
        //   });
      }
    },
    socialFacebook: function() {
      var provider = new firebase.auth.FacebookAuthProvider();
      let self = this;
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          // console.log(result);
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          // console.log(result);
          var token = result.credential.accessToken;
          self.firstname = result.additionalUserInfo.profile.first_name;
          self.getUsername(result.additionalUserInfo.profile.name);
          self.getToken(token);
          if (self.token) {
            self.dialogLogin.dialog = false;
            // self.$router.push("/");
          }
        })
        .catch(function(error) {
          alert("Oops. " + error.message);
        });
    },
    save(date) {
      this.$refs.menu.save(date);
    },
    openSignUp() {
      this.dialog1 = true;
      this.dialog = false;
    },
    openLogin() {
      this.dialog1 = false;
      this.dialog = true;
    }
  }
};
</script>

<style></style>
