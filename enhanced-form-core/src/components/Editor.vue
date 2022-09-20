<template>
  <p>
    <button type="button" @click="addComponent">Add component</button>
  </p>
  <div v-for="(component, index) in components" :key="component.id" class="component">
    <component
        :is="component.type"
        :value="component.value"
        :key="index"
        @onChange="onInputChange"
        :id="component.id"
    />
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import InputField from "./Fields/InputField.vue";
import InputMultiField from "./Fields/InputMultiField.vue";
import TextEditorField from "./Fields/TextEditorField.vue";

export default {
  name: 'Editor',
  components: {
    InputField,
    InputMultiField,
    TextEditorField
  },
  props: {
    onChange: Function
  },
  computed: {
    ...mapGetters(['components'])
  },
  methods: {
    ...mapActions(['add', 'edit']),
    addComponent: function () {

      this.add({
        value: '',
        type: 'TextEditorField'
      })

      this.onChange(JSON.stringify(this.components));
    },
    onInputChange: function ({id, value}) {
      this.edit({id, value});
    }
  },
  watch: {
    components: function () {
      this.onChange(JSON.stringify(this.components));
    }
  }

}
</script>

<style lang="css">
.component + .component{
  margin-top: 2rem;
}
</style>
