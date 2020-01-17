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
    </b-tabs>
  </div>
</template>

<script>
import ThumbnailComp from "@/components/ThumbnailComp";
import ImageValidationComp from "@/components/ImageValidationComp";
import BurgerPlaceValidation from "@/components/BurgerPlaceValidation";
import { images } from "../firebase";
export default {
  name: "Tabs",
  components: {
    ThumbnailComp,
    ImageValidationComp,
    BurgerPlaceValidation
  },
  data: function() {
    return {
      images: []
    };
  },
  mounted() {
    images.orderByKey().once("value", snapshot => {
      snapshot.forEach(childSnapshot => {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        childData["key"] = childKey;
        this.images.push(childData);
      });
    });
  }
};
</script>
