<template>
  <component
      v-for="field in fields"
      :is="field.component.type"
      v-bind="{value: block.content[field.field][field.key]}"
      @onChange="value => onChange(value, field.field, field.key)"
  />
</template>

<script>
export default {
  name: "Settings",
  props: {
    fields: [],
    block: Object
  },
  methods: {
    onChange: function (value, field, key) {
      this.$emit('onChange', {
        id: this.block.id,
        content: {
          ...this.block.content,
          [field]: {
            ...this.block.content[field],
            [key]: value
          }
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
