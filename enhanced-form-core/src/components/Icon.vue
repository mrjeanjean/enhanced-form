<template>
  <i class="fa-solid" :class="`fa-${icon}` "></i>
</template>

<script>
export default {
  name: "Icon",
  props:{
    icon: String
  }
}
</script>

<style scoped>

</style>
