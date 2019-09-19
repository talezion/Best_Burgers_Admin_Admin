<template>
  <div v-if="type == 'thumbnail' && images.length > 0">
    <LoadingAnimation v-if="showProcessing" />
    <Alert v-if="showAlert" @countDownEnded="hideAlert" :type="alertType">{{
      alertMessage
    }}</Alert>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="0"
      controls
      indicators
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide
        class="image"
        v-for="(approved_image, index) in approved_images_container"
        :key="index"
      >
        <img
          v-if="approved_image"
          slot="img"
          class="img img-responsive full-width"
          :src="getImageUrl(index)"
          alt="image slot"
        />
        <p
          v-if="
            burger_place.highlight_image &&
              burger_place.highlight_image.url == getImageUrl(index)
          "
        >
          Thumbnail
        </p>
        <p v-else-if="!burger_place.highlight_image">
          No Thumbnail
        </p>
      </b-carousel-slide> </b-carousel
    ><br />
    <button class="btn btn-primary btn-block" @click="setClicked">Set</button>
  </div>
  <div v-else-if="type == 'images' && images.length > 0">
    <LoadingAnimation v-if="showProcessingImage" />
    <Alert
      v-if="showAlertImage"
      @countDownEnded="hideAlert"
      :type="alertType"
      >{{ alertMessage }}</Alert
    >
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="0"
      controls
      indicators
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide
        class="image"
        v-for="(approved_image, index) in approved_images_container"
        :key="index"
      >
        <img
          v-if="approved_image"
          slot="img"
          class="img img-responsive full-width"
          :src="getImageUrl(index)"
          alt="image slot"
        />
      </b-carousel-slide> </b-carousel
    ><br />
    <div class="d-flex">
      <button class="btn btn-primary flex-fill" @click="approveClicked">
        Approve
      </button>
      <button class="btn btn-danger flex-fill" @click="rejectClicked">
        Reject
      </button>
    </div>
  </div>
</template>

<script>
import {
  images_approved,
  images,
  images_container,
  burgersRef,
  images_rejected
} from "../firebase";
import LoadingAnimation from "@/components/LoadingAnimation";
import Alert from "@/components/Alert";

export default {
  name: "carousel",
  props: ["image_key", "type"],
  components: {
    LoadingAnimation,
    Alert
  },
  data: function() {
    return {
      slide: 0,
      sliding: null,
      images: [],
      approved_images_ids: [],
      current_images: [],
      approved_images_container: [],
      container_images: [],
      approved_images_container_keys: [],
      rejected_images: [],
      burger_place: {},
      showProcessing: false,
      showAlert: false,
      alertMessage: "",
      alertType: "",
      showProcessingImage: false,
      showAlertImage: false
    };
  },
  firebase: {
    approved_images_ids: images_approved.orderByKey(),
    images: images.orderByKey(),
    rejected_images: images_rejected.orderByKey(),
    container_images: images_container.orderByKey()
  },
  methods: {
    hideAlert: function() {
      this.showAlert = false;
      this.showAlertImage = false;
      this.alertMessage = "";
    },
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    getImageUrl: function(key) {
      let imageIndex = -1;
      for (let i = 0; i < this.images.length; i++) {
        if (this.images[i][".key"] == key) {
          imageIndex = i;
          break;
        }
      }
      /*if (this.type == "images") {
        console.log(
          key,
          imageIndex,
          this.images,
          this.images[imageIndex].url,
          this.burger_place
        );
      }*/
      //this.current_images.push(this.images[imageIndex]);
      return this.images[imageIndex].url;
    },
    approveClicked: function() {
      this.showProcessingImage = true;
        let imageIndex = this.getSelectedImageIndex();
        if (this.checkIfApprovedExist() == -1) {
          let image_key = {};
          image_key[this.images[imageIndex][".key"]] = 1;
          images_approved.child(this.image_key).set(image_key, error => {
            this.showAlertForImages(error, "Approved");
          });
        } else {
          let approved_images_container = [];
          this.approved_images_ids.forEach(element => {
            if (element[".key"] == this.image_key) {
              approved_images_container = element;
            }
          });
          approved_images_container[this.images[imageIndex][".key"]] = 1;
          images_approved
            .child(this.image_key)
            .set(approved_images_container, error => {
              this.showAlertForImages(error, "Approved");
            });
        }
        images_container
          .child(this.image_key)
          .child(this.images[imageIndex][".key"])
          .remove()
          .then(() => {
            this.getAllData();
          })
          .catch((error) => {

          });
    },
    rejectClicked: function() {
      this.showProcessingImage = true;
        let imageIndex = this.getSelectedImageIndex();
        if (this.checkIfRejectedExist() == -1) {
          let image_key = {};
          image_key[this.images[imageIndex][".key"]] = 1;
          images_rejected.child(this.image_key).set(image_key, error => {
            this.showAlertForImages(error, "Rejected");
          });
        } else {
          let rejected_images_container = [];
          this.rejected_images.forEach(element => {
            if (element[".key"] == this.image_key) {
              rejected_images_container = element;
            }
          });
          rejected_images_container[this.images[imageIndex][".key"]] = 1;
          images_rejected
            .child(this.image_key)
            .set(rejected_images_container, error => {
              this.showAlertForImages(error, "Rejected");
            });
        }
        images_container
          .child(this.image_key)
          .child(this.images[imageIndex][".key"])
          .remove()
          .then(() => {
            this.getAllData();
          })
          .catch((error) => {

          });
    },
    setClicked: function() {
      this.showProcessing = true;
      let imageIndex = this.getSelectedImageIndex();
      burgersRef
        .child(this.image_key)
        .update({ highlight_image: this.images[imageIndex] }, (error) => {
          if(error){
            this.showAlertForThumbnail(error);
          }
          else{
            this.showAlertForThumbnail();
          }
        });
    },
    checkIfApprovedExist: function() {
      let placeIndex = -1;
      for (let i = 0; i < this.approved_images_ids.length; i++) {
        if (this.approved_images_ids[i][".key"] == this.image_key) {
          placeIndex = i;
          break;
        }
      }
      return placeIndex;
    },
    checkIfRejectedExist: function() {
      let placeIndex = -1;
      for (let i = 0; i < this.rejected_images.length; i++) {
        if (this.rejected_images[i][".key"] == this.image_key) {
          placeIndex = i;
          break;
        }
      }
      return placeIndex;
    },
    getSelectedImageIndex: function() {
      let imageIndex = -1;
      let key = this.approved_images_container_keys[this.slide];
      for (let i = 0; i < this.images.length; i++) {
        if (this.images[i][".key"] == key) {
          imageIndex = i;
          break;
        }
      }
      return imageIndex;
    },
    showAlertForImages: function(error, message) {
      if (error) {
        this.showProcessingImage = false;
        this.alertMessage = error.message;
        this.alertType = "danger";
        this.showAlertImage = true;
      } else {
        this.showProcessingImage = false;
        if (message) {
          this.alertMessage = message;
        }
        this.alertType = "primary";
        this.showAlertImage = true;
      }
    },
    showAlertForThumbnail: function(error) {
      if (error) {
        this.showProcessing = false;
        this.alertMessage = error.message;
        this.alertType = "danger";
        this.showAlert = true;
      } else {
        this.showProcessing = false;
        this.alertMessage = "Thumbnail Set successfully";
        this.alertType = "primary";
        this.showAlert = true;
      }
    },
    getAllData: function() {
      this.resetAll();
      this.getBurgerPlace();
      if (this.type == "thumbnail") {
        this.approved_images_ids.forEach(element => {
          if (element[".key"] == this.image_key) {
            this.approved_images_container = element;
            this.approved_images_container_keys = Object.keys(
              this.approved_images_container
            );
          }
        });
      } else {
        this.container_images.forEach(element => {
          if (element[".key"] == this.image_key) {
            this.approved_images_container = element;
            this.approved_images_container_keys = Object.keys(
              this.approved_images_container
            );
          }
        });
      }
    },
    getBurgerPlace: function() {
      let burger = burgersRef
        .orderByKey()
        .equalTo(this.image_key)
        .on("value", snapshot => {
          snapshot.forEach(childSnapshot => {
            this.burger_place = childSnapshot.val();
          });
        });
    },
    resetAll: function(){
      this.slide = 0;
      this.sliding = null;
      this.current_images = [];
      this.approved_images_container = [];
      this.approved_images_container_keys = [];
      this.burger_place = {};
      this.showProcessing = false;
      this.showAlert = false;
      this.alertMessage = "";
      this.alertType = "";
      this.showProcessingImage = false;
      this.showAlertImage =  false;
    }
  },
  mounted() {
    this.getAllData();
  }
};
</script>

<style lang="scss" scoped>
.image {
  position: relative;
  overflow: hidden;
  padding-bottom: 100%;
}
.image img {
  position: absolute;
  width: 100%;
}
.img-responsive {
  display: block;
  max-width: 100%;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
</style>
