<template>
  <div class="file-field" :class="{'is-expanded' : expanded}">
    <InputField
        :value="value"
        :readOnly="true"
        :placeholder="placeholder"
        :disabled="isLoading"
        v-if="expanded"
        @click="onSelectFileHandler"
    />
    <button
        type="button"
        @click="onSelectFileHandler"
        class="button button--rounded button--outline"
        :disabled="isLoading"
    >
      <Icon icon="folder-open"/>
    </button>
  </div>
</template>

<script>

import Icon from "../Icon.vue";
import InputField from "./InputField.vue";

export default {
  name: "FileField",
  components: {
    InputField,
    Icon,
  },
  props: {
    url: String,
    title: String,
    value: String,
    expanded: {
      default: false,
      type: Boolean
    },
    placeholder: String
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
    filePath: function () {
      return this.options.imagesFolder + this.url
    }
  },
  methods: {
    onSelectFileHandler: async function () {
      const {image, error} = await this.options.onSelectFile({
        beforeFetch: () => {
          this.isLoading = true;
        },
      });
      if (!error) {
        this.$emit('onChange', image.url);
      }

      this.isLoading = false;
    },
    onLoadHandler: function () {
      this.imageError = false;
      this.isLoading = false;
    },
    onErrorHandler: function () {
      this.imageError = true;
      this.isLoading = false;
    }
  },
  watch: {
    isLoading: function (value) {
      this.$emit('onLoadingChange', value);
    }
  }
}
</script>

<style scoped>
.file-field.is-expanded {
  display: flex;
  gap: 0.5rem;
}

.file-field.is-expanded > *:first-child {
  flex: 1 0;
}

.file-field.is-expanded::v-deep(.form-input){
  height: 100%;
  cursor: pointer;
}
</style>
