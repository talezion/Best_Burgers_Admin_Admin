<template>
  <div class="mt-3 row">
    <div class="col-md-12">
      <form @submit="searchQueryEntered">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Search burger" v-model="searchQuery" />
        </div>
      </form>
    </div>
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
      <Alert v-if="showAlert" @countDownEnded="hideAlert" :type="alertType">
        {{
        alertMessage
        }}
      </Alert>
      <LoadingAnimation v-if="showProcessing" />
    </div>
    <div v-for="(approved_image, index) in images_approved" :key="index" class="col-md-3">
      <b-carousel
        id="carousel-1"
        :interval="0"
        controls
        v-model="slides[index]"
        indicators
        background="#ababab"
        style="text-shadow: 1px 1px 2px #333;"
      >
        <b-carousel-slide class="image" v-for="(images1, index1) in approved_image" :key="index1">
          <v-lazy-image
            v-if="getImageUrl(index1)"
            class="img img-responsive full-width"
            :src="getImageUrl(index1)"
            slot="img"
            alt="image slot"
          />
          <p
            v-if="
              places[index].highlight_image &&
                places[index].highlight_image.url == getImageUrl(index1)
            "
          >Thumbnail</p>
          <p v-else-if="!places[index].highlight_image">No Thumbnail</p>
        </b-carousel-slide>
      </b-carousel>
      <p class="text-center">{{ places[index].burger_name }}</p>
      <button
        class="btn btn-primary btn-block"
        @click="setClicked(images_approved_keys[index], index)"
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
      perPage: 12,
      currentPage: 1,
      images_approved: [],
      images_approved_keys: [],
      alertMessage: '',
      showAlert: false,
      showProcessing: false,
      slides: [],
      alertType: '',
      lastKey: null,
      filter: 'all',
      itemsOfPage: [],
      image_keys: [],
      searchQuery: '',
      cachedImagesApproved: [],
      cachedImagesApprovedKeys: [],
      cachedPlaces: [],
      originalApprovedImageKeys: [],
      originalApprovedImages: [],
      originalPlaces: []
    }
  },
  watch: {
    currentPage: function(val) {
      let startIndex = (val - 1) * 12
      this.resetAll()
      this.places = this.cachedPlaces.slice(startIndex, startIndex + 12)
      this.images_approved = this.cachedImagesApproved.slice(
        startIndex,
        startIndex + 12
      )
      console.log(this.cachedImagesApproved)
      this.images_approved_keys = this.cachedImagesApprovedKeys.slice(
        startIndex,
        startIndex + 12
      )
    }
  },
  methods: {
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
      if (this.searchQuery.length > 3) {
        this.image_keys = []
        let local_images_approved = []
        let local_images_keys = []
        let i = 0
        this.resetAll()
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
                    var childData1 = childSnapshot1.val()
                    if (
                      childData1.burger_search_name.includes(this.searchQuery)
                    ) {
                      this.cachedImagesApproved.push(childData)
                      this.cachedImagesApprovedKeys.push(childKey)
                      this.cachedPlaces.push(childData1)
                      if (snapshot.numChildren() - 1 == i) {
                        this.image_keys = local_images_keys
                      }
                      local_images_keys.push(childKey)
                      if (local_images_approved.length < 12) {
                        this.places.push(childData1)
                        local_images_approved.push(childData)
                        this.images_approved_keys.push(childKey)
                        this.slides.push(0)
                      }
                      if (
                        local_images_approved.length == 12 ||
                        local_images_keys.length < 12
                      ) {
                        this.images_approved = local_images_approved
                      }
                    }
                    i++
                  })
                })
            })
          }
        })
      }
    },
    filterChanged() {
      this.resetAll()
      this.cachedPlaces = []
      this.cachedImagesApprovedKeys = []
      this.cachedImagesApproved = []
      //this.getInitialsOfPages()
      // if (this.filter == 'all') {
      //   this.getInitialData()
      // } else {
      //   images_approved.orderByKey().once('value', snapshot => {
      //     if (snapshot.numChildren() > 0) {
      //       snapshot.forEach(childSnapshot => {
      //         var childKey = childSnapshot.key
      //         var childData = childSnapshot.val()
      //         if (this.places.length < 12) {
      //           burgersRef
      //             .orderByKey()
      //             .equalTo(childKey)
      //             .once('value', snapshot1 => {
      //               snapshot1.forEach(childSnapshot1 => {
      //                 if (this.places.length >= 12) {
      //                   return
      //                 }
      //                 var childKey1 = childSnapshot1.key
      //                 var childData1 = childSnapshot1.val()
      //                 childData1['key'] = childKey1
      //                 if (
      //                   this.filter == 'noThumbnail' &&
      //                   !childData1.highlight_image &&
      //                   this.places.length < 12
      //                 ) {
      //                   this.places.push(childData1)
      //                   this.images_approved.push(childData)
      //                   this.images_approved_keys.push(childKey)
      //                   this.slides.push(0)
      //                   this.lastKey = childKey
      //                 }
      //               })
      //             })
      //         }
      //       })
      //     }
      //   })
      // }
      let localImagesApproved = []
      let localImagesKeys = []
      let i = 0
      if (this.filter == 'all') {
      } else {
        for (i = 0; i < this.originalPlaces.length; i++) {
          if (!this.originalPlaces[i].highlight_image) {
            if (this.places.length < 12) {
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
            console.log('in smaller than 12')
          }
          if (localImagesApproved.length == 12) {
            this.images_approved = [...localImagesApproved]
            console.log('in equal 12', this.images_approved.length)
          }
          if (this.originalPlaces.length - 1 == i) {
            console.log(this.places.length)
            this.image_keys = localImagesKeys
          }
        }
        // this.originalApprovedImages.forEach(approvedImage => {
        //   this.originalPlaces.forEach(place => {
        //     localImagesApproved.push(approvedImage)
        //     localImagesKeys.push(approvedImage['key'])
        //     if (!place.highlight_image && this.places.length < 12) {
        //       this.places.push(place)
        //       this.slides.push(0)
        //       this.images_approved_keys.push(approvedImage['key'])
        //     }
        //     if (localImagesApproved.length == 12) {
        //       this.images_approved = localImagesApproved
        //     }
        //     if (this.cachedImagesApproved.length - 1 == i) {
        //       this.cachedImagesApproved = localImagesApproved
        //       this.cachedImagesApprovedKeys
        //     }
        //   })
        //   i++
        // })
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
          console.log(placeKey)
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
    resetAll: function() {
      this.places = []
      this.images_approved = []
      this.images_approved_keys = []
      this.slides = []
    },
    async getInitialData() {
      let local_images_keys = []
      let local_images_approved = []
      let i = 0
      await images_approved.orderByKey().once('value', snapshot => {
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
                  this.cachedPlaces.push(childData1)
                  this.cachedImagesApproved.push(childData)
                  this.cachedImagesApprovedKeys.push(childKey)
                  local_images_keys.push(childKey)
                  if (local_images_approved.length < 12) {
                    this.places.push(childData1)
                    this.images_approved_keys.push(childKey)
                    local_images_approved.push(childData)
                    this.slides.push(0)
                  }
                  if (local_images_approved.length == 12) {
                    this.images_approved = local_images_approved
                  }
                  if (snapshot.numChildren() - 1 == i) {
                    this.originalPlaces = this.cachedPlaces
                    this.originalApprovedImages = this.cachedImagesApproved
                    this.originalApprovedImageKeys = this.cachedImagesApprovedKeys
                    this.image_keys = local_images_keys
                  }
                  i++
                })
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
    //this.getInitialsOfPages()
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
