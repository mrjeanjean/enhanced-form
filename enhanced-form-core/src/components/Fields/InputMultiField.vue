<template>
  <div>
    <InputField :value="value.field1" @onChange="v=>onInput(v, 'field1')"/>
    <InputField :value="value.field2" @onChange="v=>onInput(v, 'field2')"/>
  </div>
</template>

<script>

import {InputMixin} from "../../mixins";
import InputField from "./InputField.vue";

export default {
  name: "InputMultiField",
  mixins: [InputMixin],
  components: {
    InputField
  }
}
</script>

<style scoped>

</style>
