<template>
  <div class="video-block">
    <InputField
        type="text"
        :value="content.videoId"
        @onChange="onInputChange"
        v-bind="this.getFieldOptions('videoId')"
    />
    <div class="video-block__render">
      <div class="video-block__placeholder" v-if="!idVideoValid">
        <div>
          <icon icon="video-slash"/>
        </div>
      </div>
      <img
          :src="thumbnailUrl"
          alt=""
          v-else
      >
    </div>
  </div>
</template>

<script>

import {InputMixin} from "../../mixins.js";
import InputField from "../Fields/InputField.vue";
import Icon from "../Icon.vue";

export default {
  name: "VideoBlock",
  components: {
    InputField,
    Icon
  },
  emits: ["onChange"],
  mixins: [InputMixin],
  inject: ['options'],
  methods: {
    onInputChange: function (value) {
      this.onInput(value, 'videoId')
    }
  },
  computed: {
    idVideoValid: function(){
      if(!this.options.hasOwnProperty('video') || !this.options.video.hasOwnProperty('videoIdValidate')){
        console.warn('video.videoIdValidate options is not defined.');
        return '';
      }

      return this.options.video.videoIdValidate(this.content.videoId);
    },
    thumbnailUrl: function(){
      if(!this.options.hasOwnProperty('video') || !this.options.video.hasOwnProperty('thumbnailUrlCallback')){
        console.warn('video.thumbnailUrlCallback options is not defined.');
        return '';
      }

      return this.options.video.thumbnailUrlCallback(this.content.videoId);
    }
  }
}
</script>

<style scoped lang="scss">
.video-block__render {
  height: 300px;
  margin-top: 1rem;
  background-color: var(--editor-theme-color-border);
  border-radius: var(--editor-block-border-radius);
  position: relative;
}

.video-block__render img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: relative;
}

.video-block__placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: absolute;
  font-size: 1.15rem;
  inset: 0;
  color: var(--theme-color-button-light);

  i {
    font-size: 80px;
  }
}
</style>
