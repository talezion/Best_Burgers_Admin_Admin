<template>
  <div class="mt-3 row">
    <div class="col-md-12">
      <form @submit="searchQueryEntered">
        <div class="row">
          <div class="col-md-9">
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="Search burger"
                @keyup.esc="resetSearch"
                v-model="searchQuery"
              />
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <button class="btn btn-danger btn-block" type="button" @click="resetSearch">Clear</button>
          </div>
        </div>
      </form>
    </div>
    <div class="col">
      <div class="form-group">
        <select
          v-model="filter"
          @change="filterChanged"
          class="form-control"
          :disabled="isFilterDisabled"
        >
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
      <Alert v-if="showAlert" @countDownEnded="hideAlert" :type="alertType">
        {{
        alertMessage
        }}
      </Alert>
      <LoadingAnimation v-if="showProcessing" />
    </div>
    <div v-for="(approved_image, index2) in images_approved" :key="index2" class="col-md-3">
      <b-carousel
        id="carousel-1"
        :interval="0"
        controls
        v-model="slides[index2]"
        indicators
        background="#ababab"
        style="text-shadow: 1px 1px 2px #333;"
      >
        <b-carousel-slide class="image" v-for="(images1, index1) in approved_image" :key="index1">
          <v-lazy-image
            class="img img-responsive full-width"
            :src="getImageUrl(index1)"
            slot="img"
            alt="image slot"
          />
          <p
            v-if="
              places[index2].highlight_image &&
                places[index2].highlight_image.url == getImageUrl(index1)
            "
          >Thumbnail</p>
          <p v-else-if="!places[index2].highlight_image">No Thumbnail</p>
        </b-carousel-slide>
      </b-carousel>
      <p class="text-center">{{ places[index2].burger_name }}</p>
      <button
        class="btn btn-primary btn-block"
        @click="setClicked(images_approved_keys[index2], index2)"
      >Set</button>
      <br />
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
      perPage: 8,
      currentPage: 1,
      images_approved: [],
      images_approved_keys: [],
      alertMessage: '',
      showAlert: false,
      showProcessing: false,
      slides: [],
      alertType: '',
      filter: 'all',
      image_keys: [],
      searchQuery: '',
      cachedImagesApproved: [],
      cachedImagesApprovedKeys: [],
      cachedPlaces: [],
      originalApprovedImageKeys: [],
      originalApprovedImages: [],
      originalPlaces: [],
      originalImageKeys: [],
      isFilterDisabled: false
    }
  },
  watch: {
    currentPage: async function(val) {
      let startIndex = (val - 1) * 8
      this.showProcessing = true
      await this.resetAll()
      this.places = this.cachedPlaces.slice(startIndex, startIndex + 8)
      this.images_approved_keys = this.cachedImagesApprovedKeys.slice(
        startIndex,
        startIndex + 8
      )
      this.images_approved = this.cachedImagesApproved.slice(
        startIndex,
        startIndex + 8
      )
      this.slides = [0, 0, 0, 0, 0, 0, 0, 0]
      this.showProcessing = false
    }
  },
  methods: {
    resetToInitialState() {
      this.places = this.originalPlaces.slice(0, 8)
      this.images_approved_keys = this.originalApprovedImageKeys.slice(0, 8)
      this.images_approved = this.originalApprovedImages.slice(0, 8)
      this.image_keys = this.originalImageKeys
      this.cachedImagesApproved = this.originalApprovedImages
      this.cachedImagesApprovedKeys = this.originalApprovedImageKeys
      this.cachedPlaces = this.originalPlaces
      this.currentPage = 1
      this.isFilterDisabled = false
    },
    async resetSearch() {
      this.searchQuery = ''
      this.showProcessing = true
      this.slides = [0, 0, 0, 0, 0, 0, 0, 0]
      await this.resetToInitialState()
      this.showProcessing = false
    },
    async getInitialsOfSearched() {
      this.image_keys = []
      await images_approved.orderByKey().once('value', snapshot => {
        snapshot.forEach(childSnapshot => {
          var childKey = childSnapshot.key
          var childData = childSnapshot.val()
          burgersRef
            .orderByKey()
            .equalTo(childKey)
            .once('value', snapshot1 => {
              snapshot1.forEach(childSnapshot1 => {
                let childData1 = childSnapshot1.val()
                if (childData1.burger_search_name.includes(this.searchQuery)) {
                  this.image_keys.push(childKey)
                }
              })
            })
        })
      })
    },
    searchQueryEntered(e) {
      e.preventDefault()
      this.isFilterDisabled = true
      this.resetAll()
      this.image_keys = []
      let local_images_approved = []
      let local_images_keys = []
      let i = 0
      this.cachedPlaces = []
      this.cachedImagesApprovedKeys = []
      this.cachedImagesApproved = []
      this.originalPlaces.forEach((place, index) => {
        if (
          place.burger_search_name
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
        ) {
          local_images_approved.push(this.originalApprovedImages[index])
          local_images_keys.push(this.originalImageKeys[index])
          this.cachedImagesApprovedKeys.push(
            this.originalApprovedImageKeys[index]
          )
          this.cachedPlaces.push(this.originalPlaces[index])
          this.cachedImagesApproved.push(this.originalApprovedImages[index])
          if (this.places.length < 8) {
            this.images_approved_keys.push(
              this.originalApprovedImageKeys[index]
            )
            this.places.push(this.originalPlaces[index])
            this.slides.push(0)
          }
          if (local_images_approved.length == 8) {
            this.images_approved = [...local_images_approved]
          }
        }
        if (this.originalPlaces.length - 1 == index) {
          this.image_keys = local_images_keys
          if (this.places.length < 8) {
            this.images_approved = [...local_images_approved]
          }
        }
      })
    },
    async filterChanged() {
      this.showProcessing = true
      await this.resetAll()
      if (this.filter == 'all') {
        await this.resetToInitialState()
        this.showProcessing = false
      } else {
        this.image_keys = []
        this.cachedPlaces = []
        this.cachedImagesApprovedKeys = []
        this.cachedImagesApproved = []
        let localImagesApproved = []
        let localImagesKeys = []
        this.slides = []
        let i = 0
        for (i = 0; i < this.originalPlaces.length; i++) {
          if (!this.originalPlaces[i].highlight_image) {
            if (this.places.length < 8) {
              this.places.push(this.originalPlaces[i])
              this.slides.push(0)
              this.images_approved_keys.push(this.originalApprovedImageKeys[i])
            }
            this.cachedImagesApprovedKeys.push(
              this.originalApprovedImageKeys[i]
            )
            this.cachedPlaces.push(this.originalPlaces[i])
            this.cachedImagesApproved.push(this.originalApprovedImages[i])
            localImagesApproved.push(this.originalApprovedImages[i])
            localImagesKeys.push(this.originalApprovedImageKeys[i])
          }
          if (localImagesApproved.length == 8) {
            this.images_approved = [...localImagesApproved]
          }
          if (this.originalPlaces.length - 1 == i) {
            this.image_keys = localImagesKeys
            if (this.places.length < 8) {
              this.images_approved = [...localImagesApproved]
            }
          }
        }
        this.showProcessing = false
      }
    },
    hideAlert: function() {
      this.showAlert = false
      this.alertMessage = ''
    },
    getImageUrl: function(imagekey) {
      let url = null
      let i = 0
      for (i; i < this.images.length; i++) {
        if (this.images[i]['key'] == imagekey && this.images[i].url) {
          return this.images[i].url
        } else if (this.images.length - 1 == i) {
          return url
        }
      }
    },
    setClicked: async function(placeKey, index) {
      this.showProcessing = true
      var selected = this.slides[index]
      this.images_approved_keys[index]
      var approved = Object.keys(this.images_approved[index])
      var selectedImageKey = approved[selected]
      for (let i = 0; i < this.images.length; i++) {
        if (selectedImageKey == this.images[i].key) {
          await burgersRef
            .child(placeKey)
            .update({ highlight_image: this.images[i] }, error => {
              if (error) {
                alert(error)
              } else {
                this.places[index].highlight_image = this.images[i]
              }
            })
            .finally(() => {
              this.showProcessing = false
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
    resetAll: function() {
      this.places = []
      this.images_approved = []
      this.images_approved_keys = []
      this.slides = []
    },
    async getInitialData() {
      this.showProcessing = true
      let local_images_keys = []
      let local_images_approved = []
      let i = 0
      await images_approved.orderByKey().once('value', snapshot => {
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
                    this.cachedPlaces.push(childData1)
                    this.cachedImagesApproved.push(list)
                    this.cachedImagesApprovedKeys.push(childKey)
                    local_images_keys.push(childKey)
                    if (local_images_approved.length < 8) {
                      this.places.push(childData1)
                      this.images_approved_keys.push(childKey)
                      local_images_approved.push(list)
                      this.slides.push(0)
                    }
                    if (local_images_approved.length == 8) {
                      this.images_approved = local_images_approved
                    }
                    if (snapshot.numChildren() - 1 == i) {
                      this.originalPlaces = this.cachedPlaces
                      this.originalApprovedImages = this.cachedImagesApproved
                      this.originalApprovedImageKeys = this.cachedImagesApprovedKeys
                      this.originalImageKeys = local_images_keys
                      this.image_keys = local_images_keys
                      this.showProcessing = false
                      if (this.places.length < 8) {
                        this.images_approved = [...localImagesApproved]
                      }
                    }
                    i++
                  })
                })
            }
          })
        }
      })
    }
  },
  mounted: function() {
    this.getInitialData()
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
