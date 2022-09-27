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
              image.url = `https://picsum.photos/id/${id}/500/450`;
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
  display: flex;
  gap: 2rem;
}

.multi-image-container > *{
  flex: 1;
}

::v-deep .image-container img{
  object-fit: cover;
}
</style>
