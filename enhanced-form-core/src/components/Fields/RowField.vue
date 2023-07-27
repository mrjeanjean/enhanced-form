<template>
  <div class="row-field" :style="{'grid-template-columns': `repeat(${orderedFields.length}, 1fr)`}">
    <div class="row-field__column" :class="field.type" v-for="(field, columnIndex) in orderedFields">
      <component
          :is="field.type"
          v-bind="getData(columnIndex, field.name)"
          @onChange="value => onChange(columnIndex, field.name, value)"
      />
    </div>
  </div>
</template>

<script>
import ImageField from "../Fields/ImageField.vue";
import InputField from "../Fields/InputField.vue";
import TextEditorField from "../Fields/TextEditorField.vue";
import Icon from "../Icon.vue";
import {unWrap} from "../../utils.js";

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

      return this.model.slice().reverse();
    }
  },
  methods: {
    getData: function (columnIndex, fieldName) {
      let columns = this.content[this.name].columns;
      const fieldModel = this.model.find(model => fieldName === model.name);

      if(this.reverse){
        columns = columns.slice().reverse();
      }

      let value = columns[columnIndex][fieldName];

      value = typeof value === 'object' ? {...value} : {value: value}
      return {...value, ...fieldModel.options};
    },
    onChange: function(columnIndex, fieldName, value){
      let columns = unWrap(this.content[this.name].columns);

      if(this.reverse){
        columnIndex = (this.content[this.name].columns.length - 1) - columnIndex;
      }

      columns[columnIndex] = {
        [fieldName]: value
      };

      this.$emit('onChange', {
        ...this.content[this.name],
        columns: columns,
        reverse: this.reverse
      })

    }
  }
}
</script>

<style scoped>

.row-field{
  display: flex;
  gap: 2rem;
}

.row-field > .row-field__column{
  flex: 1 0;
}

::v-deep .image-field{
  min-height: 100%;
}
</style>
