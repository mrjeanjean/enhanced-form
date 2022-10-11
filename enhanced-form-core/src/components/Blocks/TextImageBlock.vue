<template>
  <div class="text-image-container" v-if="!content.reverse">
    <TextEditorField :value="content.text" @onChange="data => onInput(data, 'text')"></TextEditorField>
    <ImageField v-bind="content.image" @onChange="value=>onInput(value, 'image')" :imageOptions="imageOptions"></ImageField>
  </div>
  <div class="text-image-container" v-else>
    <ImageField v-bind="content.image" @onChange="value=>onInput(value, 'image')" :imageOptions="imageOptions"></ImageField>
    <TextEditorField :value="content.text" @onChange="data => onInput(data, 'text')"></TextEditorField>
  </div>
</template>

<script>
import TextEditorField from "../Fields/TextEditorField.vue";
import ImageField from "../Fields/ImageField.vue";
import {InputMixin} from "../../mixins";

export default {
  name: "TextImageBlock",
  components: {
    TextEditorField,
    ImageField
  },
  props:{
    imageOptions: Object
  },
  mixins: [InputMixin]
}
</script>

<style scoped>
.text-image-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

::v-deep .image-field{
  min-height: auto;
}
</style>
