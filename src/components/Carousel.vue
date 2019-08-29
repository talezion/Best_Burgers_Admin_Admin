<template>
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
              <b-carousel-slide img-height="200" img-width="200">
                <img
                  slot="img"
                  class="d-block img-fluid mx-auto"
                  src="../assets/logo.png"
                  alt="image slot"
                >
              </b-carousel-slide>
              <b-carousel-slide>
                <img
                  slot="img"
                  class="d-block img-fluid mx-auto"
                  src="../assets/logo.png"
                  alt="image slot"
                >
              </b-carousel-slide>
              <b-carousel-slide>
                <img
                  slot="img"
                  class="d-block img-fluid mx-auto"
                  src="../assets/logo.png"
                  alt="image slot"
                >
              </b-carousel-slide>
              <b-carousel-slide>
                <img
                  slot="img"
                  class="d-block mx-auto img-fluid"
                  src="../assets/logo.png"
                  alt="image slot"
                >
              </b-carousel-slide>
            </b-carousel>
</template>

<script>
export default {
  name: "carousel",
  data: function(){
    return{
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