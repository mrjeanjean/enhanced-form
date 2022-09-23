<template>
  <div class="image-container">
    <ImageField :image="content.image" @onChange="data => onInput(data, 'image')" :on-browse="onBrowseHandler"></ImageField>
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
  emits: ["onChange"],
  mixins: [InputMixin],
  methods: {
    onBrowseHandler: function(){
      let id = Math.round(Math.random() * 100 + 100);

      this.onInput({
        ...this.image,
        url: `https://picsum.photos/id/${id}/1024/480`
      }, 'image')
    }
  }
}
</script>

<style scoped>
</style>
