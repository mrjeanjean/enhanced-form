<template>
  <i :class="`fa-${icon} ` + `fa-${type}`"></i>
</template>

<script>
export default {
  name: "Icon",
  props:{
    icon: String,
    type: {
      type: String,
      default: 'solid'
    }
  }
}
</script>

<style scoped>

</style>
