<template>
  <div>
    <v-container>
      <v-row no-gutters>
        <v-col
          cols="12"
          sm="6"
          class="text-uppercase display-2 font-weight-black"
        >
          Products Page
          <v-col>
            <v-btn color="primary" class="text-uppercase" @click="addnew">
              Add Product
            </v-btn>
          </v-col>
        </v-col>
        <v-col cols="12" sm="6" align="center">
          <v-img
            src="@/assets/undraw_performance_overview_p9bm.svg"
            max-width="500"
          ></v-img>
        </v-col>
      </v-row>
      <v-dialog v-model="dialog1">
        <v-card>
          <v-card-title>
            <span class="headline">{{ activeItem }}</span>
          </v-card-title>

          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12" sm="8">
                  <v-col cols="12">
                    <v-text-field
                      v-model="product.name"
                      label="Name"
                      :rules="nameRules"
                      outlined
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <vue-editor name="editor-1" v-model="product.description" />
                    <!-- <v-textarea
                      v-model="product.description"
                      name="input-7-1"
                      label="Product Description"
                      hint="Hint text"
                      rows="10"
                      :rules="textAreaRules"
                      append-icon="mdi-comment"
                    ></v-textarea> -->
                  </v-col>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-col cols="12">
                    <div class="text-capitalize headline mb-5">
                      Product Detail
                    </div>
                    <v-divider light></v-divider>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="product.price"
                      label="Price"
                      :rules="priceRules"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      @keyup.188="addTag"
                      v-model="tag"
                      label="Tag"
                      outlined
                    ></v-text-field>
                    <div class=" d-flex">
                      <p v-for="tag in product.tags" :key="tag">
                        <v-chip class="ma-2" color="primary">
                          {{ tag }}
                        </v-chip>
                      </p>
                    </div>
                  </v-col>
                  <v-col cols="12">
                    <div class="text-capitalize headline mb-5">
                      Product Images
                    </div>
                    <v-divider light></v-divider>
                  </v-col>
                  <v-col cols="12">
                    <v-file-input
                      v-model="files"
                      color="deep-purple accent-4"
                      counter
                      accept="image/png, image/jpeg, image/bmp"
                      label="File input"
                      @change="uploadImages"
                      multiple
                      placeholder="Select your files"
                      prepend-icon="mdi-camera"
                      :show-size="1000"
                    >
                      <template v-slot:selection="{ index, text }">
                        <v-chip
                          v-if="index < 2"
                          color="deep-purple accent-4"
                          dark
                          label
                          small
                          >{{ text }}</v-chip
                        >

                        <span
                          v-else-if="index === 2"
                          class="overline grey--text text--darken-3 mx-2"
                          >+{{ files.length - 2 }} File(s)</span
                        >
                      </template>
                    </v-file-input>
                    <div class="d-flex">
                      <div
                        class="mx-1"
                        v-for="(image, index) in product.images"
                        :key="index"
                      >
                        <div class="img-wrapp">
                          <v-img
                            max-width="80"
                            max-height="100"
                            :src="image"
                          ></v-img>
                          <span
                            class="remove-file"
                            @click="removeFile(image, index)"
                          >
                            X
                          </span>
                        </div>
                      </div>
                    </div>
                  </v-col>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="saveData()"
              :disabled="!valid"
              v-if="this.modal == 'new'"
            >
              Save
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="save()"
              :disabled="!valid"
              v-if="this.modal == 'edit'"
            >
              Save Edit
            </v-btn>
            <!-- <v-btn color="blue darken-1" text @click="saveProductDB"
              >Save To Database</v-btn
            > -->
            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <div class="text-capitalize display-1 my-5">products list</div>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        outlined
        label="Search"
        hide-details
      ></v-text-field>
      <v-data-table
        dark
        :headers="headers"
        :items="products"
        :items-per-page="10"
        :page.sync="page"
        @page-count="pageCount = $event"
        :search="search"
        :sort-by="['name']"
        hide-default-footer
        class="elevation-1 my-5"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase/app";
// var db = firebase.firestore();
// Basic Use - Covers most scenarios
import { VueEditor } from "vue2-editor";
import Swal from "sweetalert2";
import { db, Toast, storage } from "../../main";
import { ProductsService } from "@/services/ProductsService";
const productsService = new ProductsService();
export default {
  components: { VueEditor },
  data() {
    return {
      search: "",
      // dialog: false,
      dialog1: false,
      page: 1,
      pageCount: 0,
      headers: [
        {
          text: "Name Products",
          align: "start",
          value: "name"
        },
        { text: "Price", value: "price", align: "start" },
        { text: "Tag", value: "tags", align: "start" },
        {
          text: "Description",
          value: "description",
          align: "start"
        },
        { text: "Actions", value: "actions", align: "end" }
      ],
      product: {
        name: null,
        price: null,
        description:
          "The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through.",
        tags: [],
        images: []
      },
      files: [],
      tag: null,
      valid: true,
      // editedItem: {
      //   name: null,
      //   price: null,
      //   files: [],
      //   description:
      //     "The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through.",
      //   tag: null
      // },
      products: [],
      // productsData: [],
      activeItem: null,
      modal: null,
      fileRules: [
        v => !!v || "File is required",
        v => (v && v.length > 0) || "File is required"
      ],
      textAreaRules: [
        v => !!v || "Description is required",
        v => v.length <= 2000 || "Max 2000 characters"
      ],
      nameRules: [
        v => !!v || "Name Product is required",
        v =>
          (v && v.length <= 50) || "Name Produc must be less than 50 characters"
      ],
      priceRules: [
        v => !!v || "Price is required",
        v => (v && v.length <= 50) || "Price must be less than 50 characters"
      ],
      tagRules: [
        v => !!v || "Tag is required",
        v => (v && v.length <= 50) || "Tag must be less than 50 characters"
      ]
    };
  },
  firestore() {
    return {
      products: db.collection("products")
    };
  },
  methods: {
    uploadImages() {
      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i];
        // var storage = firebase.storage();
        var storageRef = storage.ref("products/" + file.name);
        // storageRef.put(file);
        let uploadTask = storageRef.put(file);
        uploadTask.on(
          "state_changed",
          snapshot => {
            console.log("File snapshot", snapshot);
          },
          error => {
            console.log("File error", error);
            // Handle unsuccessful uploads
          },
          () => {
            // Handle successful uploads on complete
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              this.product.images.push(downloadURL);
              console.log("File available at", downloadURL);
            });
          }
        );
      }
    },
    removeFile(img, index) {
      let image = firebase.storage().refFromURL(img);
      this.product.images.splice(index, 1);
      image
        .delete()
        .then(function() {
          console.log("image deleted");
        })
        .catch(err => {
          console.log(err);
        });
    },
    addTag() {
      this.product.tags.push(this.tag);
      this.tag = "";
    },
    // readData() {
    //   db.collection("products")
    //     .get()
    //     .then(querySnapshot => {
    //       querySnapshot.forEach(doc => {
    //         // doc.data() is never undefined for query doc snapshots
    //         this.productsData.push({ id: doc.id, data: doc.data() });
    //         console.log(doc.id, " => ", doc.data());
    //       });
    //     });
    // },
    saveData() {
      if (this.$refs.form.validate()) {
        this.$firestore.products
          .add(this.product)
          .then(() => {
            Toast.fire({
              icon: "success",
              title: "Product created successfully"
            });
            this.dialog1 = false;
            this.resetData();
          })
          .catch(err => {
            // console.error("Error adding document: ", err);
            Toast.fire({
              icon: "error",
              title: "Error adding document: ",
              err
            });
          });
        // db.collection("products")
        //   .add(product)
        //   .then(docRef => {
        //     console.log("Document written with ID: ", docRef.id);
        //     this.resetData();
        //     if (this.productsData) {
        //       this.productsData = [];
        //     }
        //     this.readData();
        //     this.dialog1 = false;
        //   })
        //   .catch(function(error) {
        //     console.error("Error adding document: ", error);
        //   });
      }
    },
    saveProductDB() {
      productsService
        .fetchAddProducts(this.product)
        .then(() => {
          // console.log(res.data.message);
          Toast.fire({
            icon: "success",
            title: "Product created successfully"
          });
          this.dialog1 = false;
          this.resetData();
        })
        .catch(err => {
          alert(err);
        });
    },
    resetData() {
      this.product = {
        name: null,
        price: null,
        description: "",
        tags: [],
        images: []
      };
      this.files = [];
    },
    addnew() {
      this.modal = "new";
      this.activeItem = "New Product";
      this.resetData();
      this.dialog1 = true;
    },
    editItem(product) {
      // console.log(item);
      this.modal = "edit";
      this.activeItem = "Edit Product";
      this.product = product;
      // this.editedItem = {
      //   ...this.editedItem,
      //   ...{ id: product[".key"] },
      //   ...{
      //     data: {
      //       name: product.name,
      //       price: product.price,
      //       tag: product.tag,
      //       description: product.description
      //     }
      //   }
      // };
      this.dialog1 = true;
    },
    deleteItem(doc) {
      // console.log("id", doc[".key"]);
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$firestore.products.doc(doc.id).delete();
          Toast.fire({
            icon: "success",
            title: "Product delete in successfully"
          });
        }
      });
      // if (confirm("Are you sure ?")) {
      //   db.collection("products")
      //     .doc(product)
      //     .delete()
      //     .then(() => {
      //       alert("Document successfully deleted!");
      //       if (this.productsData) {
      //         this.productsData = [];
      //       }
      //       this.readData();
      //     })
      //     .catch(error => {
      //       console.error("Error removing document: ", error);
      //     });
      // } else {
      //   return;
      // }
    },
    save() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, edit it!"
      }).then(result => {
        if (result.value) {
          this.$firestore.products.doc(this.product.id).update(this.product);
          this.dialog1 = false;
          Toast.fire({
            icon: "success",
            title: "Product edited successfully"
          });
        }
      });
      // if (confirm("Are you sure edit product ?")) {
      //   var washingtonRef = db.collection("products").doc(this.editedItem.id);
      //   // Set the "capital" field of the city 'DC'
      //   return washingtonRef
      //     .update(this.editedItem.data)
      //     .then(() => {
      //       alert("Successfully updated!");
      //       if (this.productsData) {
      //         this.productsData = [];
      //       }
      //       this.readData();
      //       this.dialog = false;
      //     })
      //     .catch(function(error) {
      //       // The document probably doesn't exist.
      //       console.error("Error updating document: ", error);
      //     });
      // }
    },
    close() {
      this.dialog1 = false;
    }
  }
  // created() {
  //   this.readData();
  // }
};
</script>

<style>
.img-wrapp {
  position: relative;
}
.img-wrapp span.remove-file {
  color: red;
  position: absolute;
  cursor: pointer;
  top: -14px;
  left: -2px;
}
</style>
