<template>
  <div class="image-field" :style="{aspectRatio: aspectRatio}">
    <div class="image-container" v-show="!imageError">
      <img :src="imagePath" @error="onErrorHandler" @load="onLoadHandler">
    </div>

    <div class="image-placeholder" v-show="imageError">
      <icon icon="image"/>
    </div>
    <button type="button" @click="onSelectFileHandler" class="button-browse"></button>
    <div class="image-info">
      {{ size.width }}x<span v-if="size.height">{{ size.height }}</span><span v-else>?</span>
    </div>
    <Loader :isActive="isLoading"/>
  </div>
</template>

<script>

import Icon from "../Icon.vue";
import Loader from "../Loader.vue";

export default {
  name: "ImageField",
  components: {
    Icon,
    Loader
  },
  props: {
    url: String,
    title: String,
    size: {
      type: Object,
      required: false,
      default: {
        height: 800,
        width: 600
      }
    }
  },
  data: function () {
    return {
      imageError: false,
      isLoading: false
    }
  },
  emits: ['onChange'],
  inject: ['options'],
  computed: {
    imagePath: function(){
      return this.options.imagesFolder + this.url
    },
    aspectRatio: function(){
      if(!this.size.height || !this.size.width){
        return 800 / 300
      }

      return this.size.height / this.size.width;
    }
  },
  methods: {
    onSelectFileHandler: async function () {
      const {image, error} = await this.options.onSelectFile({
        beforeFetch: ()=>{
          this.isLoading = true;
        },
        imageOptions: {
          ...this.size
        }
      });
      if (!error) {
        this.$emit('onChange', image);
      }
    },
    onLoadHandler: function(){
      this.imageError = false;
      this.isLoading = false;
    },
    onErrorHandler: function(){
      this.imageError = true;
      this.isLoading = false;
    }
  }
}
</script>

<style scoped>
.image-field {
  position: relative;
  border: dashed var(--theme-border-color) 2px;
  background-color: transparent;
  border-radius: 0.25rem;
  width: 100%;
}

.button-browse {
  position: absolute;
  inset: 0;
  border: none;
  background-color: transparent;
}

.image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
  position: absolute;
  inset: 0;
}

.image-container img {
  height: 100%;
  width: 100%;
  object-fit: contain;
}

.image-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
  position: absolute;
  inset: 0;
  color: var(--theme-color-button-light);
}

.image-info {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0.5rem;
  background-color: var(--theme-color-button);
  color: #ffffff;
  font-size: 80%;
  font-style: italic;
  line-height: 1;
}
</style>
