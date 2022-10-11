<template>
  <div>
    <div class="custom-block" v-for="(field, index) in fields" :key="index">
      <component
          :is="field.type"
          v-bind="getData(field)"
          @onChange="value=>onInput(value, field.name)"
      ></component>
    </div>
  </div>
</template>

<script>
import {InputMixin} from "../../mixins";
import ImageField from "../Fields/ImageField.vue";
import InputField from "../Fields/InputField.vue";
import TextEditorField from "../Fields/TextEditorField.vue";
import RepeatField from "../Fields/RepeatField.vue";

export default {
  name: "CustomBlock",
  components: {
    ImageField,
    InputField,
    TextEditorField,
    RepeatField
  },
  mixins: [InputMixin],
  props: {
    fields: Array,
    content: Object
  },
  methods: {
    getData: function (field) {
      let value = this.content[field.name];

      if(Array.isArray(value)){
        return {
          content: value,
          ...field.options
        };
      }

      value = typeof value === 'object' ? {...value} : {value: value}
      return {...field.options, ...value};
    }
  }
}
</script>

<style scoped>
.custom-block + .custom-block {
  margin-top: 2rem;
}
</style>
