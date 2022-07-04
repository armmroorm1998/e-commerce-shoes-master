<template>
  <div>
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" sm="9">
          <span class="display-1 hidden-sm-and-up">{{
            DetailProduct.name_product
          }}</span>
          <v-card>
            <v-container fluid>
              <v-row>
                <v-col
                  v-for="(path, index) in DetailProduct.images"
                  :key="index"
                  class="d-flex child-flex"
                  cols="6"
                >
                  <v-card flat tile class="d-flex" @click="eventDialog(index)">
                    <v-img :src="path" aspect-ratio="1" class="grey lighten-2">
                      <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular
                            indeterminate
                            color="grey lighten-5"
                          ></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <!--  -->
        <v-col cols="12" sm="3" class="pa-3">
          <v-row no-gutters>
            <v-col cols="6" sm="6" align="left">
              <span class="subtitle-2">{{ DetailProduct.tags[0] }}</span>
            </v-col>
            <v-col cols="6" sm="6" align="right">
              <span>{{ DetailProduct.price | currency("$") }}</span>
            </v-col>
            <v-col cols="12" align="left">
              <span class="headline">{{ DetailProduct.name_product }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6" align="left">
              <span class="subtitle-2">Sizes</span>
            </v-col>
            <v-col cols="12">
              <size-shoe :productSize="productSize" />
            </v-col>
            <v-col cols="12">
              <color-shoe :productColor="productColor" />
            </v-col>
            <v-col cols="12">
              <v-btn block @click="addToCart" color="dark" dark>
                <v-icon left>mdi-cart</v-icon>Add to Cart
              </v-btn>
            </v-col>
            <v-col cols="12">
              <v-row no-gutters align="center" justify="center">
                <v-col cols="3">
                  <span>Quality</span>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="number"
                    type="number"
                    min="0"
                    max="10"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <span v-html="DetailProduct.description"></span>
            </v-col>
            <v-col cols="12">
              <v-btn text class="subtitle-2 u" @click="dialog1 = true">
                <u>Detail</u>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <!--  -->
    <v-dialog
      v-model="dialog1"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog1 = false">
            <v-icon>mdi-close-circle</v-icon>
          </v-btn>
        </v-card-actions>
        <v-container>
          <v-card-text>
            <span class="display-1">{{ DetailProduct.name_product }}</span>
            <p class="subtitle-1">ลดแรงกระแทกไม่หยุดตลอดเส้นทาง</p>
            <span v-html="DetailProduct.description" class="subtitle-1"></span>
            <div class="text--primary">
              <span class="subtitle-1">ข้อดีเพิ่มเติม</span>
              <ul class="subtitle-1">
                <li>
                  วัสดุระหว่างพื้นรองเท้าชั้นในและพื้นรองเท้าชั้นกลางใช้น้อยลง
                  คุณจึงแนบชิดกับโฟมได้มากขึ้น
                  และทำให้เกิดประสบการณ์ที่นุ่มกว่าและตอบสนองได้ดียิ่งกว่าที่เคย
                </li>
                <li>
                  พื้นรองเท้าชั้นนอกมีปริมาณยางมากขึ้น
                  จึงช่วยยึดเกาะและให้ความทนทาน
                </li>
              </ul>
            </div>
            <div class="text--primary">
              <span class="subtitle-1">รายละเอียดสินค้า</span>
              <ul class="subtitle-1">
                <li>น้ำหนัก: 10.27 ออนซ์ (รองเท้าผู้ชายไซส์ 10)</li>
                <li>ออฟเซ็ต: 9 มม. (ปลายเท้า 24 มม., ส้น 33 มม.)</li>
                <li>สีที่แสดง: Sail/Track Red/Laser Orange/Black</li>
              </ul>
            </div>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog>
    <!--  -->
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">
            <v-icon>mdi-close-circle</v-icon>
          </v-btn>
        </v-card-actions>
        <v-img :src="setImg" max-height="600" contain></v-img>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { Toast } from "../main";

export default {
  data() {
    return {
      products: [],
      item: {},
      dialog: false,
      dialog1: false,
      setImg: "",
      productSize: { size: "" },
      productColor: { color: "" },
      number: 1
    };
  },
  watch: {
    number(val, old) {
      console.log(val, old);
      if (+val > 10) {
        this.number = 10;
      }
    }
  },
  computed: {
    ...mapGetters({ DetailProduct: "store/DetailProduct" })
  },
  methods: {
    ...mapActions({
      getToCartQuantity: "store/getToCartQuantity"
    }),
    eventDialog(index) {
      this.setImg = this.DetailProduct.images[index];
      this.dialog = true;
    },
    addToCart() {
      this.item = {
        productName: this.DetailProduct.name_product,
        productImage: this.DetailProduct.images[0],
        productPrice: this.DetailProduct.price,
        productId: this.DetailProduct.id,
        productSize: this.productSize.size,
        productColor: this.productColor.color,
        productQuantity: parseInt(this.number)
      };
      Toast.fire({
        icon: "success",
        title: "Add product to cart success"
      });
      this.getToCartQuantity(this.item);
    }
  }
};
</script>

<style></style>
