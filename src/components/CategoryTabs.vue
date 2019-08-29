<template>
  <div class="mt-3">
    <b-tabs content-class="mt-3">
      <b-tab title="Burger Thumbnail Setting" active>
        <div class="row">
          <div class="col-md-3 text-center mb-4" v-for="(thumbnail, index) in thumbnails" :key="index">
            <Carousel />
            <p>Burger Image 1</p>
            <button class="btn btn-primary btn-block">Set</button>
          </div>
        </div>
      </b-tab>
      <b-tab title="Burger Images Validation">
        <div class="row">
          <div class="col-md-3 text-center mb-4" v-for="(thumbnail, index) in thumbnails" :key="index">
            <Carousel />
            <p>Burger Image 1</p>
            <div class="d-flex">
              <button class="btn btn-primary flex-fill">Approve</button>
              <button class="btn btn-danger flex-fill">Reject</button>
            </div>
          </div>
        </div>
      </b-tab>
      <b-tab title="Burger Place Validation">
        <div class="row">
          <div class="col-md-3 text-center mb-4" v-for="(thumbnail, index) in thumbnails" :key="index">
            <img src="@/assets/burger1.jpg" width="100%" />
            <p>Burger Image 1</p>
            <div class="d-flex">
              <button class="btn btn-primary flex-fill">Approve</button>
              <button class="btn btn-danger flex-fill">Reject</button>
            </div>
          </div>
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import Carousel from "@/components/Carousel";

export default {
  name: "CategoryTabs",
  components: {
    Carousel
  },
  data: function(){
    return{
      places: [],
      images: [],
      thumbnails: [{}, {}, {}, {}, {}, {}, {}, {}],
      slide: 0,
      sliding: null
    }
  },
  methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    }
}
</script>