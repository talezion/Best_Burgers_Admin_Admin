<template>
  <div>
    <b-tabs content-class="mt-3">
      <b-tab title="Burger Thumbnail Setting" active>
        <ThumbnailComp :images="images" />
      </b-tab>
      <b-tab title="Burger Images Validation">
        <ImageValidationComp :images="images" />
      </b-tab>
      <b-tab title="Burger Place Validation">
        <BurgerPlaceValidation />
      </b-tab>
      <b-tab title="Map View">
        <MapView />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import ThumbnailComp from '@/components/ThumbnailComp'
import { images } from '../firebase'
export default {
  name: 'Tabs',
  components: {
    ThumbnailComp,
    ImageValidationComp: () =>
      import(
        /* webpackPrefetch: true */ '@/components/ImageValidationComp.vue'
      ),
    BurgerPlaceValidation: () =>
      import(
        /* webpackPrefetch: true */ '@/components/BurgerPlaceValidation.vue'
      ),
    MapView: () =>
      import(/* webpackPrefetch: true */ '@/components/MapView.vue')
  },
  data: function() {
    return {
      images: []
    }
  },
  mounted() {
    images.orderByKey().once('value', snapshot => {
      snapshot.forEach(childSnapshot => {
        const childKey = childSnapshot.key
        const childData = childSnapshot.val()
        childData['key'] = childKey
        this.images.push(childData)
      })
    })
  }
}
</script>
