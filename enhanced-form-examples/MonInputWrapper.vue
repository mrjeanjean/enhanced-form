<template>
  <div>
    MonTest grandeur nature
    <MonInput/>
  </div>
</template>

<script>

import MonInput from "./MonInput.vue";
import {
  Icon,
  InputMixin, Loader

} from "@moveo/enhanced-form-core/src/main";

export default {
  name: "MonInputWrapper",
  components: {MonInput},
  props:{
    fields: Array
  },
  mixins: [InputMixin],
  beforeMount() {
    console.log(this.$options);
    console.log(this)
  }
}
</script>

<style scoped>

</style>
