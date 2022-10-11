<template>
  <div class="image-field">
    <div class="image-container" v-show="!imageError">
      <img :src="url" @error="onErrorHandler" @load="onLoadHandler">
    </div>

    <div class="image-placeholder" v-show="imageError">
      <icon icon="image"/>
    </div>
    <button type="button" @click="onSelectFileHandler" class="button-browse"></button>
    <div class="image-info" v-if="url !== ''">{{ url }}</div>
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
    imageOptions:{
      type: Object,
      required: false
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
  methods: {
    onSelectFileHandler: async function () {
      const {image, error} = await this.options.onSelectFile({
        beforeFetch: ()=>{
          this.isLoading = true;
        },
        imageOptions: this.imageOptions
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
  background-color: var(--theme-color-gray-200);
  min-height: 480px;
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
  color: var(--theme-color-gray-300);
}

.image-info {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0.5rem;
  background-color: var(--theme-color-secondary);
  color: #ffffff;
  font-size: 80%;
  font-style: italic;
  line-height: 1;
}
</style>
