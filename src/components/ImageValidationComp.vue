<template>
  <div class="mt-3 row">
    <div class="col-md-12 text-right mb-2">
      <button
        class="btn btn-danger mr-2"
        @click="previousClicked"
        :disabled="isPreviousDisabled"
      >Previous</button>
      <button class="btn btn-success" @click="nextClicked" :disabled="isNextDisabled">Next</button>
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
      <Alert v-if="showAlert" @countDownEnded="hideAlert" :type="alertType">
        {{
        alertMessage
        }}
      </Alert>
      <LoadingAnimation v-if="showProcessing" />
    </div>
    <div v-for="(container_image, index) in images_container" :key="index" class="col-md-3">
      <b-carousel
        id="carousel-1"
        :interval="0"
        controls
        v-model="slides[index]"
        indicators
        background="#ababab"
        style="text-shadow: 1px 1px 2px #333;"
      >
        <b-carousel-slide class="image" v-for="(images1, index1) in container_image" :key="index1">
          <!-- <v-lazy-image
            v-if="getImageUrl(index1)"
            class="img img-responsive full-width"
            :src="getImageUrl(index1)"
            slot="img"
            alt="image slot"
            src-placeholder="https://cdn-images-1.medium.com/max/80/1*xjGrvQSXvj72W4zD6IWzfg.jpeg"
          />-->
          <!-- <img
            v-if="getImageUrl(index1)"
            slot="img"
            class="img img-responsive full-width"
            :src="getImageUrl(index1)"
            alt="image slot"
          />-->
        </b-carousel-slide>
      </b-carousel>
      <p class="text-center">{{ places[index].burger_name }}</p>
      <div class="d-flex">
        <button
          class="btn btn-primary flex-fill"
          @click="approveClicked(images_container_keys[index], index)"
        >Approve</button>
        <button
          class="btn btn-danger flex-fill"
          @click="rejectClicked(images_container_keys[index], index)"
        >Reject</button>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import LoadingAnimation from '@/components/LoadingAnimation'
import Alert from '@/components/Alert'
import {
  images_approved,
  burgersRef,
  images_container,
  images_rejected
} from '../firebase'

export default {
  name: 'ImageValidationComp',
  props: ['images'],
  components: {
    LoadingAnimation,
    Alert
  },
  data: function() {
    return {
      isPreviousDisabled: true,
      isNextDisabled: true,
      alertMessage: null,
      alertType: null,
      lastKey: null,
      showProcessing: false,
      showAlert: false,
      places: [],
      previous_places: [],
      images_container: [],
      previous_images_container: [],
      images_container_keys: [],
      previous_images_container_keys: [],
      approved_images: [],
      rejected_images: [],
      slides: [],
      itemsOfPage: [],
      image_keys: [],
      perPage: 20,
      currentPage: 1
    }
  },
  watch: {
    currentPage: function(val) {
      let startIndex = (val - 1) * 20
      images_approved
        .orderByKey()
        .startAt(this.image_keys[startIndex])
        .limitToFirst(20)
        .once('value', snapshot => {
          if (snapshot.numChildren() > 0) {
            this.resetAll()
            console.log(
              this.image_keys.length,
              snapshot.numChildren(),
              this.image_keys[startIndex - 1],
              this.image_keys[startIndex],
              this.lastKey,
              startIndex
            )
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
                  this.images_container.push(childData)
                  this.images_container_keys.push(childKey)
                  this.slides.push(0)
                  this.lastKey = childKey
                  this.previous_images_container.push(childData)
                  this.previous_images_container_keys.push(childKey)
                })
            })
          } else {
            this.isNextDisabled = true
          }
        })
    }
  },
  methods: {
    getImageUrl: function(imagekey) {
      let url = null
      for (var i = 0; i < this.images.length; i++) {
        if (this.images[i]['key'] == imagekey) {
          return this.images[i].url
        }
      }
      return url
    },
    hideAlert: function() {
      this.showAlert = false
      this.alertMessage = ''
    },
    approveClicked: function(placeKey, index) {
      this.showProcessing = true
      var selected = this.slides[index]
      this.images_container_keys[index]
      var container = Object.keys(this.images_container[index])
      var selectedImageKey = container[selected]
      for (let i = 0; i < this.images.length; i++) {
        if (selectedImageKey == this.images[i].key) {
          images_approved
            .orderByKey()
            .equalTo(placeKey)
            .once('value', snapshot => {
              if (snapshot.numChildren() > 0) {
                let approved_images_container = []
                images_approved
                  .orderByKey()
                  .equalTo(placeKey)
                  .once('value', snapshot => {
                    snapshot.forEach(childSnapshot => {
                      var childKey = childSnapshot.key
                      var childData = childSnapshot.val()
                      childData['key'] = childKey
                      approved_images_container.push(childData)
                    })
                    approved_images_container[selectedImageKey] = 1
                    images_approved
                      .child(placeKey)
                      .set(approved_images_container, error => {
                        this.showAlertForImages(error, 'Approved')
                      })
                  })
              } else {
                let image_key = {}
                image_key[selectedImageKey] = 1
                images_approved.child(placeKey).set(image_key, error => {
                  this.showAlertForImages(error, 'Approved')
                })
              }
            })
          images_container
            .child(placeKey)
            .child(selectedImageKey)
            .remove()
            .then(() => {
              let i = 0
              for (const obj in this.images_container[index]) {
                i++
                obj
              }
              if (i == 1) {
                this.images_container.splice(index, 1)
                this.images_container_keys.splice(index, 1)
                this.places.splice(index, 1)
                this.previous_images_container.splice(index + 20, 1)
                this.previous_images_container_keys.splice(index + 20, 1)
                this.previous_places.splice(index + 20, 1)
              } else {
                delete this.images_container[index][selectedImageKey]
              }
            })
            .catch(error => {
              this.showAlertForImages(error, error.message)
            })
        }
      }
    },
    rejectClicked: function(placeKey, index) {
      this.showProcessing = true
      var selected = this.slides[index]
      this.images_container_keys[index]
      var container = Object.keys(this.images_container[index])
      var selectedImageKey = container[selected]
      for (let i = 0; i < this.images.length; i++) {
        if (selectedImageKey == this.images[i].key) {
          images_rejected
            .orderByKey()
            .equalTo(placeKey)
            .once('value', snapshot => {
              if (snapshot.numChildren() > 0) {
                let rejected_images_container = []
                images_rejected
                  .orderByKey()
                  .equalTo(placeKey)
                  .once('value', snapshot => {
                    snapshot.forEach(childSnapshot => {
                      var childKey = childSnapshot.key
                      var childData = childSnapshot.val()
                      childData['key'] = childKey
                      rejected_images_container.push(childData)
                    })
                    rejected_images_container[selectedImageKey] = 1
                    images_rejected
                      .child(placeKey)
                      .set(rejected_images_container, error => {
                        this.showAlertForImages(error, 'Rejected')
                      })
                  })
              } else {
                let image_key = {}
                image_key[selectedImageKey] = 1
                images_rejected.child(placeKey).set(image_key, error => {
                  this.showAlertForImages(error, 'Rejected')
                })
              }
            })
          images_container
            .child(placeKey)
            .child(selectedImageKey)
            .remove()
            .then(() => {
              let i = 0
              for (const obj in this.images_container[index]) {
                i++
                obj
              }
              if (i == 1) {
                this.images_container.splice(index, 1)
                this.images_container_keys.splice(index, 1)
                this.places.splice(index, 1)
              } else {
                delete this.images_container[index][selectedImageKey]
              }
            })
            .catch(error => {
              this.showAlertForImages(error, error.message)
            })
        }
      }
    },
    checkIfRejectedExist: function() {
      let placeIndex = -1
      for (let i = 0; i < this.rejected_images.length; i++) {
        if (this.rejected_images[i]['.key'] == this.image_key) {
          placeIndex = i
          break
        }
      }
      return placeIndex
    },
    showAlertForImages: function(error, message) {
      if (error) {
        this.showProcessing = false
        this.alertMessage = error.message
        this.alertType = 'danger'
        this.showAlert = true
      } else {
        this.showProcessing = false
        if (message) {
          this.alertMessage = message
        }
        this.alertType = 'primary'
        this.showAlert = true
      }
    },
    getData: function() {
      this.images_container = []
      this.images_container_keys = []
      this.places = []
      this.previous_places = []
      this.previous_images_container = []
      this.previous_images_container_keys = []
      images_container
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
                  this.images_container.push(childData)
                  this.images_container_keys.push(childKey)
                  this.slides.push(0)
                  this.lastKey = childKey
                  //this.previous_images_container.push(childData)
                  //this.previous_images_container_keys.push(childKey)
                })
            })
          } else {
            this.isNextDisabled = true
          }
        })
    },
    getInitialsOfPages() {
      this.image_keys = []
      images_container.orderByKey().once('value', snapshot => {
        snapshot.forEach(childSnapshot => {
          this.image_keys.push(childSnapshot.key)
        })
      })
    },
    nextClicked: function() {
      images_container
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
                  this.images_container.push(childData)
                  this.images_container_keys.push(childKey)
                  this.slides.push(0)
                  this.lastKey = childKey
                  this.previous_images_container.push(childData)
                  this.previous_images_container_keys.push(childKey)
                })
            })
          } else {
            this.isNextDisabled = true
          }
        })
    },
    previousClicked: function() {
      if (this.previous_images_container.length > 0) {
        this.isPreviousDisabled = false
        this.previous_places.splice(this.previous_places.length - 20, 20)
        let length = 20
        if (this.previous_places.length < 20) {
          length = this.previous_places.length
        }
        this.places = this.previous_places.slice(
          this.previous_places.length - length
        )
        this.previous_images_container.splice(
          this.previous_images_container.length - 20,
          20
        )
        this.images_container = this.previous_images_container.slice(
          this.previous_images_container.length - length
        )
        this.previous_images_container_keys.splice(
          this.previous_images_container_keys.length - 20,
          20
        )
        this.images_container_keys = this.previous_images_container_keys.slice(
          this.previous_images_container_keys.length - length
        )
        this.lastKey = this.images_container_keys[
          this.images_container_keys.length - 1
        ]
      } else {
        this.isPreviousDisabled = true
      }
    },
    resetAll: function() {
      this.places = []
      this.images_container = []
      this.images_container_keys = []
      this.slides = []
    }
  },
  mounted: function() {
    this.getData()
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
</style>
