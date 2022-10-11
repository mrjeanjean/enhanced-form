<template>
  <div class="block-settings__title">Multi Images settings</div>
  <div class="setting-form__row">
    <div>Nb of images</div>
    <SpinnerField
        :value="block.content.size"
        @onChange="handleCheckboxChange"
        :min="2"
        :max="4"
    />
  </div>
</template>

<script>
import {imageType} from "../../types";
import SpinnerField from "../Fields/SpinnerField.vue";
import {toRaw} from "vue";

export default {
  name: "MultiImagesBlockSettings",
  components: {
    SpinnerField
  },
  props: {
    block: Object
  },
  emits: ['onChange'],
  methods: {
    handleCheckboxChange: function (value) {
      const images = [];
      /*for (let i = 0; i < value; i++) {
        const image = this.block.content.images[i];

        if (image !== undefined) {
          images.push({
            ...image
          })
        } else {
          images.push({
            ...imageType
          })
        }
      }*/

      this.$emit('onChange', {
        id: this.block.id,
        content: {
          ...this.block.content,
          size: value
        }
      })
    }
  },
  mounted() {
    console.log(toRaw(this.$props));
  }
}
</script>

<style scoped>

</style>
