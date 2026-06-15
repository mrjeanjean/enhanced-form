<template>
  <div class="row">
    <div>
      <InputField
          :value="content.url"
          v-bind="getFieldOptions('url')"
          @onChange="value => onInput(value, 'url')"
      />
    </div>
    <ImageField
        v-bind="content.banner"
        @onChange="value => onInput(value, 'banner')"
    />
  </div>
</template>

<script>
import {InputField, InputMixin, ImageField} from "@moveo/enhanced-form-core";

export default {
  name: "CustomInputBlock",
  components: {InputField, ImageField},
  mixins: [InputMixin]
}
</script>

<style scoped>
.row {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 250px;
}
</style>
