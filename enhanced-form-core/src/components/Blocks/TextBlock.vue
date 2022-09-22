<template>
    <TextEditorField :value="content.text" @onChange="data => onInput(data, 'text')"></TextEditorField>
</template>

<script>
import TextEditorField from "../Fields/TextEditorField.vue";
import ImageField from "../Fields/ImageField.vue";
import {InputMixin} from "../../mixins";

export default {
  name: "TextBlock",
  components: {
    TextEditorField,
    ImageField
  },
  emits: ["onChange"],
  mixins: [InputMixin]
}
</script>

<style scoped>
</style>
