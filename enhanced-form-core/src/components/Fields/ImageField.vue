<template>
  <div class="image-field">
    <div class="image-container" v-show="!imageError">
      <img :src="image.url" @error="this.imageError = true" @load="this.imageError = false">
    </div>

    <div class="image-placeholder" v-show="imageError">
      <icon icon="image"/>
    </div>
    <button type="button" @click="onBrowse" class="button-browse"></button>
    <div class="image-info" v-if="image.url !== ''">{{ image.url }}</div>

  </div>
</template>

<script>

import Icon from "../Icon.vue";

export default {
  name: "ImageField",
  components: {
    Icon
  },
  data: function () {
    return {
      imageError: false
    }
  },
  props: {
    image: Object,
    onBrowse: {
      required: false,
      type: Function,
      default: () => {
      }
    }
  },
  emits: ['onChange']
}
</script>

<style scoped>
.image-field {
  position: relative;
  background-color: #f2f2f2;
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
  color: #acacac;
}

.image-info {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0.5rem;
  background-color: var(--theme-color);
  color: #ffffff;
  font-size: 80%;
  font-style: italic;
  line-height: 1;
}
</style>
