<template>
  <div>
    MonTest grandeur nature
    {{this.getFieldOptions('table')}}
    <Icon/>
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
