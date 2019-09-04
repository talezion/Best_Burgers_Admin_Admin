<template>
  <div class="mt-3">
    <b-tabs content-class="mt-3">
      <div class="col-md-12">
            <LoadingAnimation v-if="showProcessing" />
            <Alert v-if="showAlert" @countDownEnded="hideAlert" :type="alertType">{{alertMessage}}</Alert>
          </div>
      <b-tab title="Burger Thumbnail Setting" active>
        <div class="row">
          <div class="col-md-3 text-center mb-4" v-for="(approved_image, index) in approved_images" :key="index">
            <p>{{getPlaceName(approved_image['.key'])}}</p>
            <Carousel :image_key="approved_image['.key']" :type="'thumbnail'" />
          </div>
        </div>
      </b-tab>
      <b-tab title="Burger Images Validation">
        <div class="row" v-if="container.length > 0">
          <div class="col-md-3 text-center mb-4" v-for="(image, index) in container" :key="index">
            <p>{{getPlaceName(image['.key'])}}</p>
            <Carousel :image_key="image['.key']" :type="'images'" />
          </div>
        </div>
      </b-tab>
      <b-tab title="Burger Place Validation">
        <div class="row">
          <div class="col-md-3 text-center mb-4" v-for="(place, index) in places" :key="index">
            <img :src="place.highlight_image.url" v-if="place.highlight_image" class="d-block img-fluid mx-auto wh" />
            <img src="favicon.png" v-else class="d-block img-fluid mx-auto wh" />
            <p>{{place.burger_name}}</p>
            <div class="d-flex">
              <button class="btn btn-primary flex-fill" @click="approveClicked(place)">Approve</button>
              <button class="btn btn-danger flex-fill" @click="rejectClicked(place)">Reject</button>
            </div>
            <a class="btn btn-success mt-2 btn-block" :href="place.google_url" target="_blank" v-if="place.google_url">See on Maps</a>
          </div>
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import Carousel from "@/components/Carousel";
import LoadingAnimation from "@/components/LoadingAnimation";
import Alert from "@/components/Alert";
import {burgersRef, images_container, images_approved, images_rejected, images} from "../firebase";

export default {
  name: "CategoryTabs",
  components: {
    Carousel, LoadingAnimation, Alert
  },
  firebase: {
    places: burgersRef.orderByChild('was_reviewed').equalTo(false),
    allPlaces: burgersRef.orderByKey(),
    approved_places: burgersRef.orderByChild('is_validated').equalTo(true),
    approved_images: images_approved,
    rejected: images_rejected,
    images: images,
    container: images_container,
  },
  data: function(){
    return{
      places: [],
      images: [],
      approved: [],
      rejected: [],
      thumbnails: [],
      approved_places: [],
      approved_images: [],
      slide: 0,
      sliding: null,
      container: [],
      allPlaces: [],
      alertMessage: "",
      showAlert: false,
      showProcessing: false,
      alertType: '',
    }
  },
  methods: {
    hideAlert: function(){
      this.showAlert = false;
      this.alertMessage = '';
    },
    getPlaceName: function(key){
      var comp = this;
      let placeIndex = -1;
      for(let i = 0 ; i < this.allPlaces.length ; i++){
        if(this.allPlaces[i]['.key'] == key){
          placeIndex = i;
          break;
        }
      }
      return this.allPlaces[placeIndex].burger_name;
    },
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
    approveClicked: function(place){
      this.showProcessing = true;
      burgersRef.child(place['.key']).update({was_reviewed: true, is_validated: true}, (error) => {
        this.showPlaceAlert(error, "Approved successfully");
      });
    },
    rejectClicked: function(place){
      this.showProcessing = true;
      burgersRef.child(place['.key']).update({was_reviewed: true, is_validated: false}, (error) => {
        this.showPlaceAlert(error, "Rejected successfully");
      });
    },
    showPlaceAlert: function(error, message){
      if(error){
        this.showProcessing = false;
        this.alertMessage = error.message;
        this.alertType = 'danger';
        this.showAlert = true;
      }
      else{
        this.showProcessing = false;
        this.alertMessage = message;
        this.alertType = 'success';
        this.showAlert = true;
      }
    }
  },
  mounted(){
  }
}
</script>

<style lang="scss" scoped>
.wh {
  height: 200px;
  width: 100%;
  background-color: "#ababab";
}
</style>
