<template>
  <div>
    <TextEditorField
        :value="content.text.value"
        @onChange="data => onInput(data, 'text')"
    ></TextEditorField>
  </div>
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
