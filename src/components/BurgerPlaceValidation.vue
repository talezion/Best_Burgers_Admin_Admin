<template>
  <div class="row mt-3">
    <div class="col-md-12 float-right mb-2">
      <b-pagination
        v-model="currentPage"
        :total-rows="placeKeys.length"
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
    <LoadingAnimation v-if="showProcessing" />
    <Alert v-if="showAlert" @countDownEnded="hideAlert" :type="alertType">
      {{
      alertMessage
      }}
    </Alert>
    <div class="row">
      <div class="col-md-3 text-center mb-4" v-for="(place, index) in places" :key="index">
        <div class="image">
          <v-lazy-image
            :src="place.highlight_image.url"
            v-if="place.highlight_image"
            class="img img-responsive full-width"
          />
          <v-lazy-image src="favicon.png" v-else class="img img-responsive full-width" />
        </div>
        <p>{{ place.burger_name }}</p>
        <div class="d-flex">
          <button class="btn btn-primary flex-fill" @click="approveClicked(place, index)">Approve</button>
          <button class="btn btn-danger flex-fill" @click="rejectClicked(place, index)">Reject</button>
        </div>
        <a
          class="btn btn-success mt-2 btn-block"
          :href="place.google_url"
          target="_blank"
          v-if="place.google_url"
        >See on Maps</a>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingAnimation from '@/components/LoadingAnimation'
import Alert from '@/components/Alert'
import { burgersRef } from '../firebase'
export default {
  name: 'BurgerPlaceValidation',
  components: {
    LoadingAnimation,
    Alert
  },
  data: function() {
    return {
      places: [],
      showProcessing: false,
      showAlert: false,
      placeKeys: [],
      perPage: 12,
      currentPage: 1,
      originalPlaces: [],
      cachedPlaces: [],
      filter: 'notApproved',
      isFilterDisabled: false
    }
  },
  watch: {
    currentPage: function(val) {
      let startIndex = (val - 1) * 12
      this.places = this.originalPlaces.slice(startIndex, startIndex + 12)
    }
  },
  methods: {
    filterChanged: function() {
      let localPlaceKeys = []
      let localPlaces = []
      let i = 0
      if (this.filter == 'notApproved') {
        burgersRef
          .orderByChild('was_reviewed')
          .equalTo(false)
          .once('value', snapshot => {
            snapshot.forEach(childSnapshot => {
              var childKey = childSnapshot.key
              var childData = childSnapshot.val()
              childData['key'] = childKey
              localPlaceKeys.push(childKey)
              this.originalPlaces.push(childData)
              this.cachedPlaces.push(childData)
              if (localPlaces.length < 12) {
                localPlaces.push(childData)
              }
              if (localPlaces.length == 12) {
                this.places = [...localPlaces]
              }
              if (snapshot.numChildren() - 1 == i) {
                this.placeKeys = localPlaceKeys
              }
              i++
            })
          })
      } else if (this.filter == 'rejected') {
        burgersRef
          .orderByChild('was_reviewed')
          .equalTo(true)
          .once('value', snapshot => {
            snapshot.forEach(childSnapshot => {
              var childKey = childSnapshot.key
              var childData = childSnapshot.val()
              childData['key'] = childKey
              if (!childData.is_validated) {
                localPlaceKeys.push(childKey)
                this.originalPlaces.push(childData)
                this.cachedPlaces.push(childData)
                if (localPlaces.length < 12) {
                  localPlaces.push(childData)
                }
                if (localPlaces.length == 12) {
                  this.places = [...localPlaces]
                }
              }
              if (snapshot.numChildren() - 1 == i) {
                this.placeKeys = localPlaceKeys
              }
              i++
            })
          })
      } else if (this.filter == 'approved') {
        burgersRef
          .orderByChild('was_reviewed')
          .equalTo(true)
          .once('value', snapshot => {
            snapshot.forEach(childSnapshot => {
              var childKey = childSnapshot.key
              var childData = childSnapshot.val()
              childData['key'] = childKey
              if (childData.is_validated) {
                localPlaceKeys.push(childKey)
                this.originalPlaces.push(childData)
                this.cachedPlaces.push(childData)
                if (localPlaces.length < 12) {
                  localPlaces.push(childData)
                }
                if (localPlaces.length == 12) {
                  this.places = [...localPlaces]
                }
              }
              if (snapshot.numChildren() - 1 == i) {
                this.placeKeys = localPlaceKeys
              }
              i++
            })
          })
      }
    },
    hideAlert: function() {
      this.showAlert = false
      this.alertMessage = ''
    },
    approveClicked: function(place, index) {
      this.showProcessing = true
      let obj = {
        was_reviewed: true,
        is_validated: true
      }
      burgersRef.child(place['key']).update(obj, error => {
        this.showPlaceAlert(error, 'Approved successfully')
        this.places.splice(index, 1)
      })
    },
    rejectClicked: function(place, index) {
      this.showProcessing = true
      burgersRef
        .child(place['key'])
        .update({ was_reviewed: true, is_validated: false }, error => {
          this.showPlaceAlert(error, 'Rejected successfully')
          this.places.splice(index, 1)
        })
    },
    showPlaceAlert: function(error, message) {
      if (error) {
        this.showProcessing = false
        this.alertMessage = error.message
        this.alertType = 'danger'
        this.showAlert = true
      } else {
        this.showProcessing = false
        this.alertMessage = message
        this.alertType = 'success'
        this.showAlert = true
      }
    }
  },
  mounted: function() {
    let localPlaceKeys = []
    let localPlaces = []
    let i = 0
    // burgersRef
    //   .orderByChild('was_reviewed')
    //   .equalTo(false)
    //   .once('value', snapshot => {
    //     snapshot.forEach(childSnapshot => {
    //       var childKey = childSnapshot.key
    //       var childData = childSnapshot.val()
    //       childData['key'] = childKey
    //       localPlaceKeys.push(childKey)
    //       this.originalPlaces.push(childData)
    //       this.cachedPlaces.push(childData)
    //       if (localPlaces.length < 12) {
    //         localPlaces.push(childData)
    //       }
    //       if (localPlaces.length == 12) {
    //         this.places = [...localPlaces]
    //       }
    //       if (snapshot.numChildren() - 1 == i) {
    //         this.placeKeys = localPlaceKeys
    //       }
    //       i++
    //     })
    //   })
    burgersRef
      .orderByChild('was_reviewed')
      .equalTo(false)
      .once('value', snapshot => {
        snapshot.forEach(childSnapshot => {
          var childKey = childSnapshot.key
          var childData = childSnapshot.val()
          childData['key'] = childKey
          localPlaceKeys.push(childKey)
          this.originalPlaces.push(childData)
          this.cachedPlaces.push(childData)
          if (localPlaces.length < 12) {
            localPlaces.push(childData)
          }
          if (localPlaces.length == 12) {
            this.places = [...localPlaces]
          }
          if (snapshot.numChildren() - 1 == i) {
            this.placeKeys = localPlaceKeys
          }
          i++
        })
      })
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
