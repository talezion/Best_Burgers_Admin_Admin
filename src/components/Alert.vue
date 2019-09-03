<template>
  <b-alert
      :show="dismissCountDown"
      dismissible
      fade
      :variant="type"
      @dismiss-count-down="countDownChanged"
    >
      <slot></slot>
    </b-alert>
</template>

<script>
export default {
  props: ['type'],
  data: function(){
    return{
      dismissCountDown: 3,
      showDismissibleAlert: false,
      dismissSecs: 3,
    }
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
      if(this.dismissCountDown == 0){
        this.$emit('countDownEnded');
      }
    },
  },
  mounted(){
  }
}
</script>

<style>

</style>