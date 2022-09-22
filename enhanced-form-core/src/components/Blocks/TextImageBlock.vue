<template>
  <div class="text-image-container">
    <TextEditorField :value="content.text" @onChange="data => onInput(data, 'text')"></TextEditorField>
    <ImageField :image="content.image" @onChange="data => onInput(data, 'image')" :on-browse="onBrowseHandler"></ImageField>
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
  emits: ["onChange"],
  mixins: [InputMixin],
  methods: {
    onBrowseHandler: function(){
      let id = Math.round(Math.random() * 100 + 100);

      this.onInput({
        ...this.image,
        url: `https://picsum.photos/id/${id}/500/500`
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
</style>
