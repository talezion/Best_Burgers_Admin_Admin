<template>
<div v-if="type=='thumbnail' && images.length > 0">
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
    <b-carousel-slide img-height="200" img-width="200" v-for="(approved_image, index) in approved_images_container" :key="index">
      <img
        slot="img"
        class="d-block img-fluid mx-auto"
        :src="getImageUrl(index)"
        alt="image slot"
      >
    </b-carousel-slide>
  </b-carousel><br>
  <button class="btn btn-primary btn-block" @click="setClicked">Set</button>
</div>
<div v-else-if="type=='images' && images.length > 0">
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
    <b-carousel-slide img-height="200" img-width="200" v-for="(approved_image, index) in approved_images_container" :key="index">
      <img
        slot="img"
        class="d-block img-fluid mx-auto"
        :src="getImageUrl(index)"
        alt="image slot"
      >
    </b-carousel-slide>
  </b-carousel><br>
  <div class="d-flex">
    <button class="btn btn-primary flex-fill" @click="approveClicked">Approve</button>
    <button class="btn btn-danger flex-fill" @click="rejectClicked">Reject</button>
  </div>
</div>
</template>

<script>
import {images_approved, images, images_container, burgersRef} from "../firebase";
export default {
  name: "carousel",
  props: ['image_key', 'type'],
  data: function(){
    return{
      slide: 0,
      sliding: null,
      images_ids: [],
      images: [],
      approved_images_ids: [],
      current_images: [],
      approved_images_container: '',
      container_images: [],
    }
  },
  firebase: {
    approved_images_ids: images_approved.orderByKey(),
    images: images.orderByKey(),
    container_images: images_container.orderByKey(),
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
    getImageUrl: function(key){
      let imageIndex = -1;
      for(let i = 0 ; i < this.images.length ; i++){
        if(this.images[i]['.key'] == key){
          imageIndex = i;
          break;
        }
      }
      return this.images[imageIndex].url;
    },
    approveClicked: function(){
      
      let properties = Object.getOwnPropertyNames(this.container_images[this.slide]);
      let key = properties[0];
      console.log(this.container_images[this.slide]);
      //this.approved_images_container.push(this.container_images[this.slide]);
      console.log(this.approved_images_container);
      //images_approved.child(this.image_key).push({key: 1});
      //images_container.child(this.image_key).remove(this.container_images[this.slide]);
    },
    rejectClicked: function(){
      burgersRef.child(this.image_key).update({was_reviewed: true, is_validated: true});
    },
    setClicked: function(){
      console.log(this.images[this.slide]);
      burgersRef.child(this.image_key).update({highlight_image: this.images[this.slide]});
    }
  },
  mounted(){
    if(this.type == 'thumbnail'){
      this.approved_images_ids.forEach((element) => {
        if(element['.key'] == this.image_key){
          this.approved_images_container = element;
        }
      });
    }
    else{
      this.container_images.forEach((element) => {
        if(element['.key'] == this.image_key){
          this.approved_images_container = images_container.orderByKey().equalTo(this.image_key); 
          //this.approved_images_container = element;
        }
      });
    }
  }
}
</script>