<template>
  <div class="mt-3 row">
    <div class="col">
      <div class="form-group">
        <select v-model="filter" @change="filterChanged" class="form-control">
          <option value="all">All</option>
          <option value="noThumbnail">No Thumbnail</option>
        </select>
      </div>
    </div>
    <div class="col-md-12 float-right mb-2">
      <b-pagination
        v-model="currentPage"
        :total-rows="image_keys.length"
        :per-page="perPage"
        aria-controls="my-table"
        class="float-right"
      ></b-pagination>
    </div>
    <div class="col-md-12 text-center mb-2">
      <Alert v-if="showAlert" @countDownEnded="hideAlert" :type="alertType">{{
        alertMessage
      }}</Alert>
      <LoadingAnimation v-if="showProcessing" />
    </div>
    <div
      v-for="(approved_image, index) in images_approved"
      :key="index"
      class="col-md-3"
    >
      <b-carousel
        id="carousel-1"
        :interval="0"
        controls
        v-model="slides[index]"
        indicators
        background="#ababab"
        style="text-shadow: 1px 1px 2px #333;"
      >
        <b-carousel-slide
          class="image"
          v-for="(images1, index1) in approved_image"
          :key="index1"
        >
          <v-lazy-image
            v-if="getImageUrl(index1)"
            class="img img-responsive full-width"
            :src="getImageUrl(index1)"
            slot="img"
            alt="image slot"
            src-placeholder="https://cdn-images-1.medium.com/max/80/1*xjGrvQSXvj72W4zD6IWzfg.jpeg"
          />
          <p
            v-if="
              places[index].highlight_image &&
                places[index].highlight_image.url == getImageUrl(index1)
            "
          >
            Thumbnail
          </p>
          <p v-else-if="!places[index].highlight_image">
            No Thumbnail
          </p>
        </b-carousel-slide>
      </b-carousel>
      <p class="text-center">{{ places[index].burger_name }}</p>
      <button
        class="btn btn-primary btn-block"
        @click="setClicked(images_approved_keys[index], index)"
      >
        Set</button
      ><br />
    </div>
  </div>
</template>

<script>
import LoadingAnimation from '@/components/LoadingAnimation'
import Alert from '@/components/Alert'
import { images_approved, burgersRef } from '../firebase'
export default {
  name: 'ThumbnailComp',
  components: {
    LoadingAnimation,
    Alert
  },
  props: ['images'],
  data: function() {
    return {
      places: [],
      perPage: 20,
      currentPage: 1,
      images_approved: [],
      images_approved_keys: [],
      previous_places: [],
      previous_images_approved: [],
      previous_approved_keys: [],
      alertMessage: '',
      showAlert: false,
      showProcessing: false,
      slides: [],
      alertType: '',
      lastKey: null,
      isNextDisabled: true,
      isPreviousDisabled: true,
      filter: 'all',
      itemsOfPage: [],
      image_keys: []
    }
  },
  watch: {
    currentPage: function(val) {
      let startIndex = (val - 1) * 20
      let endIndex = startIndex + 21
      console.log(this.image_keys)
      images_approved
        .orderByKey()
        .startAt(this.image_keys[startIndex])
        .limitToFirst(20)
        .once('value', snapshot => {
          if (snapshot.numChildren() > 0) {
            this.resetAll()
            //this.previous_places = this.previous_places.concat(this.places);
            //this.previous_images_approved = this.previous_images_approved.concat(this.images_approved);
            //this.previous_approved_keys = this.previous_approved_keys.concat(this.images_approved_keys);
            this.isPreviousDisabled = false
            this.isNextDisabled = false
            snapshot.forEach(childSnapshot => {
              var childKey = childSnapshot.key
              var childData = childSnapshot.val()
              burgersRef
                .orderByKey()
                .equalTo(childKey)
                .once('value', snapshot1 => {
                  snapshot1.forEach(childSnapshot1 => {
                    var childKey1 = childSnapshot1.key
                    var childData1 = childSnapshot1.val()
                    childData1['key'] = childKey1
                    this.places.push(childData1)
                    this.previous_places.push(childData1)
                  })
                  //this.previous_places = this.previous_places.concat(this.places);
                  this.images_approved.push(childData)
                  this.images_approved_keys.push(childKey)
                  this.slides.push(0)
                  this.lastKey = childKey
                  this.previous_images_approved.push(childData)
                  this.previous_approved_keys.push(childKey)
                })
            })
          } else {
            this.isNextDisabled = true
          }
        })
    }
  },
  methods: {
    filterChanged() {
      this.resetAll()
      this.getInitialsOfPages()
      if (this.filter == 'all') {
        this.getInitialData()
      } else {
        images_approved.orderByKey().once('value', snapshot => {
          if (snapshot.numChildren() > 0) {
            this.isNextDisabled = false
            snapshot.forEach(childSnapshot => {
              var childKey = childSnapshot.key
              var childData = childSnapshot.val()
              if (this.places.length < 20) {
                burgersRef
                  .orderByKey()
                  .equalTo(childKey)
                  .once('value', snapshot1 => {
                    snapshot1.forEach(childSnapshot1 => {
                      if (this.places.length >= 20) {
                        return
                      }
                      var childKey1 = childSnapshot1.key
                      var childData1 = childSnapshot1.val()
                      childData1['key'] = childKey1
                      console.log(this.filter, childData1.highlight_image)
                      if (
                        this.filter == 'noThumbnail' &&
                        !childData1.highlight_image &&
                        this.places.length < 20
                      ) {
                        this.places.push(childData1)
                        this.previous_places.push(childData1)
                        this.images_approved.push(childData)
                        this.images_approved_keys.push(childKey)
                        this.slides.push(0)
                        this.lastKey = childKey
                        this.previous_images_approved.push(childData)
                        this.previous_approved_keys.push(childKey)
                      }
                    })
                  })
              }
            })
          } else {
            this.isNextDisabled = true
          }
        })
      }
    },
    hideAlert: function() {
      this.showAlert = false
      this.alertMessage = ''
    },
    getImageUrl: function(imagekey) {
      let url = null
      for (var i = 0; i < this.images.length; i++) {
        if (this.images[i]['key'] == imagekey) {
          return this.images[i].url
        }
      }
      return url
    },
    setClicked: function(placeKey, index) {
      this.showProcessing = true
      var selected = this.slides[index]
      this.images_approved_keys[index]
      var approved = Object.keys(this.images_approved[index])
      var selectedImageKey = approved[selected]
      for (let i = 0; i < this.images.length; i++) {
        if (selectedImageKey == this.images[i].key) {
          burgersRef
            .child(placeKey)
            .update({ highlight_image: this.images[i] }, error => {
              if (error) {
                this.showAlertForThumbnail(error)
              } else {
                this.places[index].highlight_image = this.images[i]
                this.showAlertForThumbnail()
              }
            })
          break
        }
      }
    },
    showAlertForThumbnail: function(error) {
      if (error) {
        this.showProcessing = false
        this.alertMessage = error.message
        this.alertType = 'danger'
        this.showAlert = true
      } else {
        this.showProcessing = false
        this.alertMessage = 'Thumbnail Set successfully'
        this.alertType = 'primary'
        this.showAlert = true
      }
    },
    nextClicked: function() {
      images_approved
        .orderByKey()
        .startAt(this.lastKey + 'a')
        .limitToFirst(20)
        .once('value', snapshot => {
          if (snapshot.numChildren() > 0) {
            this.resetAll()
            //this.previous_places = this.previous_places.concat(this.places);
            //this.previous_images_approved = this.previous_images_approved.concat(this.images_approved);
            //this.previous_approved_keys = this.previous_approved_keys.concat(this.images_approved_keys);
            this.isPreviousDisabled = false
            this.isNextDisabled = false
            snapshot.forEach(childSnapshot => {
              var childKey = childSnapshot.key
              var childData = childSnapshot.val()
              burgersRef
                .orderByKey()
                .equalTo(childKey)
                .once('value', snapshot1 => {
                  snapshot1.forEach(childSnapshot1 => {
                    var childKey1 = childSnapshot1.key
                    var childData1 = childSnapshot1.val()
                    childData1['key'] = childKey1
                    this.places.push(childData1)
                    this.previous_places.push(childData1)
                  })
                  //this.previous_places = this.previous_places.concat(this.places);
                  this.images_approved.push(childData)
                  this.images_approved_keys.push(childKey)
                  this.slides.push(0)
                  this.lastKey = childKey
                  this.previous_images_approved.push(childData)
                  this.previous_approved_keys.push(childKey)
                })
            })
          } else {
            this.isNextDisabled = true
          }
        })
    },
    previousClicked: function() {
      if (this.previous_images_approved.length > 20) {
        this.isPreviousDisabled = false
        this.previous_places.splice(this.previous_places.length - 20, 20)
        this.places = this.previous_places.slice(
          this.previous_places.length - 20
        )
        this.previous_images_approved.splice(
          this.previous_images_approved.length - 20,
          20
        )
        this.images_approved = this.previous_images_approved.slice(
          this.previous_images_approved.length - 20
        )
        this.previous_approved_keys.splice(
          this.previous_approved_keys.length - 20,
          20
        )
        this.images_approved_keys = this.previous_approved_keys.slice(
          this.previous_approved_keys.length - 20
        )
        this.lastKey = this.images_approved_keys[
          this.images_approved_keys.length - 1
        ]
      } else {
        this.isPreviousDisabled = true
      }
    },
    resetAll: function() {
      this.places = []
      this.images_approved = []
      this.images_approved_keys = []
      this.slides = []
    },
    async getInitialData() {
      await images_approved
        .orderByKey()
        .limitToFirst(20)
        .once('value', snapshot => {
          if (snapshot.numChildren() > 0) {
            this.isNextDisabled = false
            snapshot.forEach(childSnapshot => {
              var childKey = childSnapshot.key
              var childData = childSnapshot.val()
              burgersRef
                .orderByKey()
                .equalTo(childKey)
                .once('value', snapshot1 => {
                  snapshot1.forEach(childSnapshot1 => {
                    var childKey1 = childSnapshot1.key
                    var childData1 = childSnapshot1.val()
                    childData1['key'] = childKey1
                    this.places.push(childData1)
                    this.previous_places.push(childData1)
                  })
                  this.images_approved.push(childData)
                  this.images_approved_keys.push(childKey)
                  this.slides.push(0)
                  this.lastKey = childKey
                  this.previous_images_approved.push(childData)
                  this.previous_approved_keys.push(childKey)
                })
            })
          } else {
            this.isNextDisabled = true
          }
        })
    },
    getInitialsOfPages() {
      this.image_keys = []
      if (this.filter == 'all') {
        images_approved.orderByKey().once('value', snapshot => {
          if (snapshot.numChildren() > 0) {
            snapshot.forEach(childSnapshot => {
              var childKey = childSnapshot.key
              this.image_keys.push(childKey)
            })
          }
        })
      } else {
        images_approved.orderByKey().once('value', snapshot => {
          if (snapshot.numChildren() > 0) {
            snapshot.forEach(childSnapshot => {
              var childKey = childSnapshot.key
              var childData = childSnapshot.val()
              burgersRef
                .orderByKey()
                .equalTo(childKey)
                .once('value', snapshot1 => {
                  snapshot1.forEach(childSnapshot1 => {
                    var childKey1 = childSnapshot1.key
                    var childData1 = childSnapshot1.val()
                    childData1['key'] = childKey1
                    if (
                      this.filter == 'noThumbnail' &&
                      !childData1.highlight_image
                    ) {
                      this.image_keys.push(childKey)
                    }
                  })
                })
            })
          } else {
            this.isNextDisabled = true
          }
        })
      }
    }
  },
  mounted: function() {
    this.getInitialData()
    this.getInitialsOfPages()
  }
}
</script>

<style lang="scss" scoped>
.image {
  background: rgb(171, 171, 171);
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
.v-lazy-image {
  filter: blur(10px);
  transition: filter 0.7s;
}
.v-lazy-image-loaded {
  filter: blur(0);
}
</style>
