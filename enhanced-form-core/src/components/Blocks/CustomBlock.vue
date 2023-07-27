<template>
  <div>
    <div class="custom-block" v-for="(field, index) in fields" :key="index">
      <component
          :is="field.type"
          v-bind="getData(field)"
          :content="content"
          :name="field.name"
          :class="field.type"
          @onChange="value=>onInput(value, field.name)"
      ></component>
    </div>
  </div>
</template>

<script>
import {InputMixin} from "../../mixins";

export default {
  name: "CustomBlock",
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
    //console.log(JSON.parse(JSON.stringify(this.$props)))
  }
}
</script>

<style scoped>
.custom-block + .custom-block {
  margin-top: 2rem;
}
</style>
