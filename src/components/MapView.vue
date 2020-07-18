<template>
  <div class="mt-3 row">
    <div class="col" ref="map" id="map"></div>
  </div>
</template>

<script>
import GoogleMapsApiLoader from 'google-maps-api-loader'
import { burgersRef } from '../firebase'
export default {
  data() {
    return {
      markers: [],
      map: null,
      places: []
    }
  },
  methods: {
    initializeMap() {
      let localMarkers = []
      const mapContainer = this.$refs.map
      let center = { lat: 40.729923, lng: 34.471536 }
      this.map = new this.google.maps.Map(mapContainer, {
        zoom: 2,
        center: center
      })
      this.places.forEach(place => {
        if (place.location.coordinates) {
          let marker = new google.maps.Marker({
            position: {
              lat: place.location.coordinates.lat,
              lng: place.location.coordinates.long
            },
            map: this.map
          })
        }
      })
    }
  },
  async mounted() {
    await burgersRef.orderByKey().once('value', snapshot => {
      snapshot.forEach(childSnapshot => {
        var childKey = childSnapshot.key
        var childData = childSnapshot.val()
        childData['key'] = childKey
        this.places.push(childData)
      })
    })
    console.log(this.places.length)
    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: 'AIzaSyCTZqGM61OFA5mZiZPEwgdWy1y35AqmRtw'
    })
    this.google = googleMapApi
    this.initializeMap()
  }
}
</script>

<style>
#map {
  height: 70vh; /* The height is 400 pixels */
  width: 100%; /* The width is the width of the web page */
}
</style>
