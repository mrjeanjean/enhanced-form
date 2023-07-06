<template>
  <div class="image-container">
    <ImageField
        @onChange="value=>onInput(value, 'image')"
        :imageOptions="imageOptions"
        v-bind="content.image"
        :url="content.image.url"
    ></ImageField>
  </div>
</template>

<script>
import ImageField from "../Fields/ImageField.vue";
import {InputMixin} from "../../mixins";

export default {
  name: "ImageBlock",
  components: {
    ImageField
  },
  props: {
    imageOptions: Object
  },
  mixins: [InputMixin]
}
</script>

<style scoped>
</style>
