<template>
  <div class="file-field">
    <button
        type="button"
        @click="onSelectFileHandler"
        class="button button--rounded button--outline"
        :disabled="isLoading"
    ><Icon icon="folder-open" /></button>
  </div>
</template>

<script>

import Icon from "../Icon.vue";

export default {
  name: "ImageField",
  components: {
    Icon,
  },
  props: {
    url: String,
    title: String,
  },
  data: function () {
    return {
      imageError: false,
      isLoading: false
    }
  },
  emits: ['onChange', 'onLoadingChange'],
  inject: ['options'],
  computed: {
    filePath: function(){
      return this.options.imagesFolder + this.url
    }
  },
  methods: {
    onSelectFileHandler: async function () {
      const {image, error} = await this.options.onSelectFile({
        beforeFetch: ()=>{
          this.isLoading = true;
        },
      });
      if (!error) {
        this.$emit('onChange', image.url);
      }

      this.isLoading = false;
    },
    onLoadHandler: function(){
      this.imageError = false;
      this.isLoading = false;
    },
    onErrorHandler: function(){
      this.imageError = true;
      this.isLoading = false;
    }
  },
  watch: {
    isLoading: function(value){
      this.$emit('onLoadingChange', value);
    }
  }
}
</script>

<style scoped>
</style>
