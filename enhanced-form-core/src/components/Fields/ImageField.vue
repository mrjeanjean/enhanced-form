<template>
  <div class="image-field" :style="{aspectRatio: aspectRatio}">
    <div class="image-field__actions">
      <button type="button" @click.stop="onEditHandler"><i class="fa-solid fa-cog"></i></button>
    </div>
    <div class="image-container" v-show="!imageError" v-if="url">
      <img :src="imagePath" @error="onErrorHandler" @load="onLoadHandler">
    </div>

    <div class="image-placeholder" v-show="(!url || imageError) && !imageErrorMessage">
      <icon icon="image"/>
    </div>

    <div class="image-error" v-show="imageErrorMessage">
      <div class="image-error__icon">
        <i class="fa-solid fa-circle-exclamation"></i>
      </div>
      <div class="image-error__content">
        <div class="image-error__title">An error has occured</div>
        <div class="image-error__message">{{ imageErrorMessage }}</div>
      </div>
    </div>

    <button type="button" @click="onSelectFileHandler" class="button-browse"></button>
    <div class="image-info">
      {{ size.width }}x<span v-if="size.height">{{ size.height }}</span><span v-else>?</span>
    </div>
    <Loader :isActive="isLoading"/>
    <PromptModal ref="altImageModalRef" placeholder="Type image description">
      <template v-slot:header>
        Type image description (alt)
      </template>
    </PromptModal>
  </div>
</template>

<script>

import Icon from "../Icon.vue";
import Loader from "../Loader.vue";
import PromptModal from "../Modals/PromptModal.vue";

export default {
  name: "ImageField",
  components: {
    Icon,
    Loader,
    PromptModal
  },
  props: {
    url: String,
    alt: String,
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
      isLoading: false,
      imageErrorMessage: null,
      altImageModal: null
    }
  },
  emits: ['onChange'],
  inject: ['options'],
  computed: {
    imagePath: function () {
      return this.options.imagesFolder + this.url
    },
    aspectRatio: function () {
      if (!this.size.height || !this.size.width) {
        return 800 / 300
      }

      return this.size.height / this.size.width;
    }
  },
  mounted() {
    this.altImageModal = this.$refs.altImageModalRef;
  },
  methods: {
    onSelectFileHandler: async function () {
      try {
        const {image} = await this.options.onSelectFile({
          beforeFetch: () => {
            this.isLoading = true;
          },
          imageOptions: {
            ...this.size
          }
        })
        this.$emit('onChange', {
          ...image,
          alt: this.alt
        });
      } catch (error) {
        this.imageError = true;
        this.imageErrorMessage = error;
        this.isLoading = false;
      }
    },
    onLoadHandler: function () {
      this.imageError = false;
      this.isLoading = false;
    },
    onErrorHandler: function () {
      this.imageError = true;
      this.isLoading = false;
    },
    onEditHandler: async function(e){
      const value = await this.altImageModal.show(this.alt);
      this.$emit('onChange', {
        url: this.url,
        alt: value
      });
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

.image-error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: var(--editor-button-text-color);
}

.image-error__icon {
  font-size: 40px;
}

.image-error__title {
  font-weight: 400;
  font-size: 20px;
  line-height: 1.2;
  margin-bottom: 0.25rem;
}

.image-error__message {
  font-weight: 300;
  font-size: 16px;
  line-height: 1.2;
}

.image-field__actions{
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 10;
}

.image-field__actions button{
  all: unset;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--button-square-width);
  height: var(--button-square-width);
  background-color: #ffffff;
  color: var(--theme-color-button);
  border: var(--theme-border-width) solid var(--theme-border-color);
  border-radius: var(--block-border-radius);
  cursor: pointer;
}

@container (max-width: 500px) {
  .image-error {
    flex-direction: column;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
    padding: 1rem;
    gap: 0.25rem;
  }

  .image-error__title {
    font-size: 16px;
  }

  .image-error__message {
    font-size: 14px;
  }

  .image-error__icon {
    font-size: 30px;
  }
}
</style>
