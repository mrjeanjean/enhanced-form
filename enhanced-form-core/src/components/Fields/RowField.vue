<template>
  <div class="row-field" :style="{'grid-template-columns': `repeat(${orderedFields.length}, 1fr)`}">
    <div class="column column-6" v-for="field in orderedFields">
      <component
          :is="field.type"
          v-bind="getData(field)"
          @onChange="value => onChange(field.name, value)"
      />
    </div>
  </div>
</template>

<script>
import ImageField from "../Fields/ImageField.vue";
import InputField from "../Fields/InputField.vue";
import TextEditorField from "../Fields/TextEditorField.vue";
import Icon from "../Icon.vue";

export default {
  name: "RowField",
  emits: ['onChange'],
  components: {
    ImageField,
    InputField,
    TextEditorField,
    Icon
  },
  props: {
    fields: Array,
    model: Object,
    options: Object,
    reverse: Boolean,
    content: Object,
    name: String
  },
  computed: {
    orderedFields: function(){
      if(!this.reverse){
        return this.model;
      }

      return this.model.slice().reverse();;
    }
  },
  methods: {
    getData: function (field) {
      let value = this.content[this.name][field.name];
      value = typeof value === 'object' ? {...value} : {value: value}
      return {...field.options, ...value};
    },
    onChange: function(fieldName, value){
      this.$emit('onChange', {
        ...this.content[this.name],
        [fieldName]: value,
        reverse: this.reverse
      })

    }
  }
}
</script>

<style scoped>

.row-field{
  display: grid;
  gap: 2rem;
}

::v-deep .image-field{
  min-height: 100%;
}
</style>
