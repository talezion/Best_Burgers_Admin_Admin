<template>
  <div v-if="type == 'thumbnail' && images.length > 0">
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
        img-height="200"
        img-width="200"
        v-for="(approved_image, index) in approved_images_container"
        :key="index"
      >
        <img
          v-if="approved_image"
          slot="img"
          class="d-block img-fluid mx-auto"
          :src="getImageUrl(index)"
          alt="image slot"
        />
      </b-carousel-slide> </b-carousel
    ><br />
    <button class="btn btn-primary btn-block" @click="setClicked">Set</button>
  </div>
  <div v-else-if="type == 'images' && images.length > 0">
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
        img-height="200"
        img-width="200"
        v-for="(approved_image, index) in approved_images_container"
        :key="index"
      >
        <img
          v-if="approved_image"
          slot="img"
          class="d-block img-fluid mx-auto"
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
export default {
  name: "carousel",
  props: ["image_key", "type"],
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
      rejected_images: []
    };
  },
  firebase: {
    approved_images_ids: images_approved.orderByKey(),
    images: images.orderByKey(),
    rejected_images: images_rejected.orderByKey(),
    container_images: images_container.orderByKey()
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
    getImageUrl: function(key) {
      //console.log("s");
      let imageIndex = -1;
      for (let i = 0; i < this.images.length; i++) {
        if (this.images[i][".key"] == key) {
          imageIndex = i;
          break;
        }
      }
      //this.current_images.push(this.images[imageIndex]);
      return this.images[imageIndex].url;
    },
    approveClicked: function() {
      let imageIndex = this.getSelectedImageIndex();
      if (this.checkIfApprovedExist() == -1) {
        let image_key = {};
        image_key[this.images[imageIndex][".key"]] = 1;
        images_approved.child(this.image_key).set(image_key);
      } else {
        let approved_images_container = [];
        this.approved_images_ids.forEach(element => {
          if (element[".key"] == this.image_key) {
            approved_images_container = element;
          }
        });
        approved_images_container[this.images[imageIndex][".key"]] = 1;
        images_approved.child(this.image_key).set(approved_images_container);
      }
      images_container
        .child(this.image_key)
        .child(this.images[imageIndex][".key"])
        .remove();
      this.getAllData();
    },
    rejectClicked: function() {
      let imageIndex = this.getSelectedImageIndex();
      if (this.checkIfRejectedExist() == -1) {
        let image_key = {};
        image_key[this.images[imageIndex][".key"]] = 1;
        images_rejected.child(this.image_key).set(image_key);
      } else {
        let rejected_images_container = [];
        this.rejected_images.forEach(element => {
          if (element[".key"] == this.image_key) {
            rejected_images_container = element;
          }
        });
        rejected_images_container[this.images[imageIndex][".key"]] = 1;
        images_rejected.child(this.image_key).set(rejected_images_container);
      }
      images_container
        .child(this.image_key)
        .child(this.images[imageIndex][".key"])
        .remove();
      this.getAllData();
    },
    setClicked: function() {
      let imageIndex = this.getSelectedImageIndex();
      burgersRef
        .child(this.image_key)
        .update({ highlight_image: this.images[imageIndex] });
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
    getAllData: function() {
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
    }
  },
  mounted() {
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
  }
};
</script>
