<template>
  <div class="mt-3 row">
    <div class="col-md-12 float-right mb-2">
      <b-pagination
        v-model="currentPage"
        :total-rows="image_keys.length"
        :per-page="perPage"
        aria-controls="my-table"
        class="float-right"
      ></b-pagination>
    </div>
    <div class="col">
      <div class="form-group">
        <select
          v-model="filter"
          @change="filterChanged"
          class="form-control"
          :disabled="isFilterDisabled"
        >
          <option value="notApproved">Not approved</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
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
          <v-lazy-image
            class="img img-responsive full-width"
            :src="getImageUrl(index1)"
            slot="img"
            alt="image slot"
          />
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
      alertMessage: null,
      alertType: null,
      showProcessing: false,
      showAlert: false,
      places: [],
      images_container: [],
      images_container_keys: [],
      approved_images: [],
      rejected_images: [],
      slides: [],
      itemsOfPage: [],
      image_keys: [],
      perPage: 8,
      currentPage: 1,
      cachedImagesContainer: [],
      cachedPlaces: [],
      cachedImagesContainerKeys: [],
      filter: 'notApproved',
      isFilterDisabled: false
    }
  },
  watch: {
    currentPage: function(val) {
      this.showProcessing = true
      let startIndex = (val - 1) * 8
      this.resetAll()
      this.places = this.cachedPlaces.slice(startIndex, startIndex + 8)
      this.images_container_keys = this.cachedImagesContainerKeys.slice(
        startIndex,
        startIndex + 8
      )
      this.images_container = this.cachedImagesContainer.slice(
        startIndex,
        startIndex + 8
      )
      this.slides = [0, 0, 0, 0, 0, 0, 0, 0]
      this.showProcessing = false
    }
  },
  methods: {
    async filterChanged() {
      this.currentPage = 1
      this.showProcessing = true
      if (this.filter == 'notApproved') {
        await this.getData()
      } else if (this.filter == 'approved') {
        this.images_container = []
        this.images_container_keys = []
        this.places = []
        let localImagesKeys = []
        let localImagesContainer = []
        let i = 0
        this.cachedImagesContainer = []
        this.cachedPlaces = []
        this.slides = []
        this.cachedImagesContainerKeys = []
        await images_approved.orderByKey().once('value', snapshot => {
          if (snapshot.numChildren() > 0) {
            snapshot.forEach(childSnapshot => {
              var childKey = childSnapshot.key
              var childData = childSnapshot.val()
              let isSlideSet = false
              let list = {}
              for (const [key, value] of Object.entries(childData)) {
                if (value === 1 && key && key != 'undefined' && key != 0) {
                  list[key] = value
                  isSlideSet = true
                }
              }
              if (isSlideSet) {
                burgersRef
                  .orderByKey()
                  .equalTo(childKey)
                  .once('value', snapshot1 => {
                    snapshot1.forEach(childSnapshot1 => {
                      var childKey1 = childSnapshot1.key
                      var childData1 = childSnapshot1.val()
                      childData1['key'] = childKey1
                      localImagesKeys.push(childKey)
                      this.cachedPlaces.push(childData1)
                      this.cachedImagesContainerKeys.push(childKey)
                      this.cachedImagesContainer.push(list)
                      if (localImagesContainer.length < 8) {
                        this.slides.push(0)
                        this.images_container_keys.push(childKey)
                        this.places.push(childData1)
                        localImagesContainer.push(list)
                      }
                      if (snapshot.numChildren() - 1 == i) {
                        this.image_keys = localImagesKeys
                        this.images_container = this.cachedImagesContainer.slice(
                          0,
                          8
                        )
                        this.showProcessing = false
                      }
                    })
                    i++
                  })
              }
            })
          }
        })
      } else if (this.filter == 'rejected') {
        this.images_container = []
        this.images_container_keys = []
        this.places = []
        let localImagesKeys = []
        let localImagesContainer = []
        this.cachedImagesContainer = []
        this.cachedPlaces = []
        this.cachedImagesContainerKeys = []
        this.slides = []
        let i = 0
        await images_rejected.orderByKey().once('value', snapshot => {
          if (snapshot.numChildren() > 0) {
            snapshot.forEach(childSnapshot => {
              var childKey = childSnapshot.key
              var childData = childSnapshot.val()
              let isSlideSet = false
              let list = {}
              for (const [key, value] of Object.entries(childData)) {
                if (value == 1 && key && key != 'undefined') {
                  list[key] = value
                  isSlideSet = true
                }
              }
              if (isSlideSet) {
                burgersRef
                  .orderByKey()
                  .equalTo(childKey)
                  .once('value', snapshot1 => {
                    snapshot1.forEach(childSnapshot1 => {
                      var childKey1 = childSnapshot1.key
                      var childData1 = childSnapshot1.val()
                      childData1['key'] = childKey1
                      localImagesKeys.push(childKey)
                      this.cachedPlaces.push(childData1)
                      this.cachedImagesContainerKeys.push(childKey)
                      this.cachedImagesContainer.push(list)
                      if (localImagesContainer.length < 8) {
                        this.slides.push(0)
                        this.images_container_keys.push(childKey)
                        this.places.push(childData1)
                        localImagesContainer.push(list)
                      }
                      if (snapshot.numChildren() - 1 == i) {
                        this.image_keys = localImagesKeys
                        this.images_container = this.cachedImagesContainer.slice(
                          0,
                          8
                        )
                        this.showProcessing = false
                      }
                    })
                    i++
                  })
              }
            })
          }
        })
      }
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
    hideAlert: function() {
      this.showAlert = false
      this.alertMessage = ''
    },
    approveClicked: async function(placeKey, index) {
      this.showProcessing = true
      var selected = this.slides[index]
      this.images_container_keys[index]
      var container = Object.keys(this.images_container[index])
      var selectedImageKey = container[selected]
      await images_approved
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
                    alert('Approved')
                  })
              })
          } else {
            let image_key = {}
            image_key[selectedImageKey] = 1
            images_approved.child(placeKey).set(image_key, error => {
              alert('Approved')
            })
          }
        })
      await images_container
        .child(placeKey)
        .child(selectedImageKey)
        .remove()
        .then(() => {
          if (Object.keys(this.images_container[index]).length == 1) {
            this.images_container.splice(index, 1)
            this.images_container_keys.splice(index, 1)
            this.places.splice(index, 1)
          } else {
            let a = this.images_container
            delete a[index][selectedImageKey]
            this.images_container = []
            this.images_container = a
          }
        })
        .catch(error => {
          console.log(error.message)
        })
        .finally(() => {
          this.showProcessing = false
        })
    },
    rejectClicked: async function(placeKey, index) {
      this.showProcessing = true
      var selected = this.slides[index]
      this.images_container_keys[index]
      var container = Object.keys(this.images_container[index])
      var selectedImageKey = container[selected]

      await images_rejected
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
                    alert('Rejected')
                  })
              })
          } else {
            let image_key = {}
            image_key[selectedImageKey] = 1
            images_rejected.child(placeKey).set(image_key, error => {
              alert('Rejected')
            })
          }
        })
      await images_container
        .child(placeKey)
        .child(selectedImageKey)
        .remove()
        .then(() => {
          if (Object.keys(this.images_container[index]).length == 1) {
            this.cachedImagesContainer.splice(index, 1)
            this.cachedPlaces.splice(index, 1)
            this.cachedImagesContainerKeys.splice(index, 1)
            this.images_container.splice(index, 1)
            this.images_container_keys.splice(index, 1)
            this.places.splice(index, 1)
          } else {
            let a = this.images_container
            delete a[index][selectedImageKey]
            this.images_container = []
            this.images_container = a
          }
        })
        .catch(error => {
          alert(error.message)
        })
        .finally(() => {
          this.showProcessing = false
        })
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
    getData: async function() {
      this.images_container = []
      this.images_container_keys = []
      this.places = []
      let localImagesKeys = []
      let localImagesContainer = []
      this.cachedImagesContainerKeys = []
      this.cachedPlaces = []
      this.cachedImagesContainer = []
      let i = 0
      await images_container.orderByKey().once('value', snapshot => {
        if (snapshot.numChildren() > 0) {
          snapshot.forEach(childSnapshot => {
            var childKey = childSnapshot.key
            var childData = childSnapshot.val()
            let isSlideSet = false
            let list = {}
            for (const [key, value] of Object.entries(childData)) {
              if (value == 1 && key && key != 'undefined') {
                list[key] = value
                isSlideSet = true
              }
            }
            if (isSlideSet) {
              burgersRef
                .orderByKey()
                .equalTo(childKey)
                .once('value', snapshot1 => {
                  snapshot1.forEach(childSnapshot1 => {
                    var childKey1 = childSnapshot1.key
                    var childData1 = childSnapshot1.val()
                    childData1['key'] = childKey1
                    localImagesKeys.push(childKey)
                    this.cachedPlaces.push(childData1)
                    this.cachedImagesContainerKeys.push(childKey)
                    this.cachedImagesContainer.push(list)
                    if (localImagesContainer.length < 8) {
                      this.slides.push(0)
                      this.images_container_keys.push(childKey)
                      this.places.push(childData1)
                      localImagesContainer.push(list)
                    }
                    if (snapshot.numChildren() - 1 == i) {
                      this.image_keys = localImagesKeys
                      this.images_container = this.cachedImagesContainer.slice(
                        0,
                        8
                      )
                      this.showProcessing = false
                    }
                  })
                  i++
                })
            }
          })
        }
      })
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
