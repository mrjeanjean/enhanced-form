<template>
  <div class="multi-image-container" :style="{'--nb-images': content.nbImages}">
    <ImageField
        v-for="(image, index) in content.images"
        :image="image"
        @onChange="data => onInput(data, 'image')"
        :on-browse="_ => onBrowseHandler(index)"
    ></ImageField>
  </div>
</template>

<script>
import ImageField from "../Fields/ImageField.vue";
import {InputMixin} from "../../mixins";

export default {
  name: "MultiImagesBlock",
  components: {
    ImageField
  },
  emits: ["onChange"],
  mixins: [InputMixin],
  methods: {
    onBrowseHandler: function(index){
      let id = Math.round(Math.random() * 100 + 100);

      this.onInput(
          this.content.images.map((image, imageIndex)=>{
            if(index === imageIndex){
              image.url = `https://picsum.photos/id/${id}/1024/480`;
            }

            return image;
          }),
          'images'
      )
    }
  }
}
</script>

<style scoped>
.multi-image-container{
  /*--nb-images: 3;
  display: grid;
  grid-template-columns: repeat(var(--nb-images), 1fr);
  gap: 2rem;*/
  display: flex;
  gap: 2rem;
}

.multi-image-container > *{
  flex: 1;
}
</style>
