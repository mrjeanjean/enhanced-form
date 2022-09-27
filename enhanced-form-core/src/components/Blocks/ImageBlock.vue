<template>
  <div class="image-container">
    <ImageField :image="content.image" @onChange="onBrowseHandler"></ImageField>
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
</style>
