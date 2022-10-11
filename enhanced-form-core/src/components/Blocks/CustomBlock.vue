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

export default {
  name: "CustomBlock",
  components: {
    ImageField,
    InputField,
    TextEditorField
  },
  mixins: [InputMixin],
  props: {
    fields: Array,
    content: Object
  },
  methods: {
    getData: function (field) {
      let value = this.content[field.name];
      value = typeof value === 'object' ? {...value} : {value: value}
      return {...field.options, ...value};
    }
  },
  mounted() {
    console.log(this.$props.content);
    console.log(this.$props.fields);
  }
}
</script>

<style scoped>
.custom-block + .custom-block {
  margin-top: 2rem;
}
</style>
