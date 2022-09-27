<template>
  <div class="block-settings__title">Text/Image settings</div>
  <SwitchField :value="block.reverse" label="Switch columns" @onChange="handleCheckboxChange"/>
</template>

<script>
import SwitchField from "../Fields/SwitchField.vue";

export default {
  name: "TextImageBlockSettings",
  components:{
    SwitchField
  },
  props: {
    block: Object
  },
  emits: ['onChange'],
  methods: {
    handleCheckboxChange: function () {
      this.$emit('onChange', {
        id: this.block.id,
        content: {
          ...this.block.content,
          reverse: !this.block.content.reverse
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
