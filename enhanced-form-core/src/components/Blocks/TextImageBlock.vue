<template>
  <div class="text-image-container" v-if="!content.reverse">
    <TextEditorField :value="content.text" @onChange="data => onInput(data, 'text')"></TextEditorField>
    <ImageField :image="content.image" @onChange="onBrowseHandler"></ImageField>
  </div>
  <div class="text-image-container" v-else>
    <ImageField :image="content.image" @onChange="onBrowseHandler"></ImageField>
    <TextEditorField :value="content.text" @onChange="data => onInput(data, 'text')"></TextEditorField>
  </div>
</template>

<script>
import TextEditorField from "../Fields/TextEditorField.vue";
import ImageField from "../Fields/ImageField.vue";
import {BrowseImageMixin, InputMixin} from "../../mixins";

export default {
  name: "TextImageBlock",
  components: {
    TextEditorField,
    ImageField
  },
  mixins: [InputMixin],
  methods: {
    onBrowseHandler: function(image){
      this.onInput({
        ...image
      }, 'image')
    }
  }
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
