<template>
  <p>
    <button type="button" @click="addComponent">Add component</button>
  </p>
  <div v-for="(component, index) in components" :key="component.id" class="component">
    <component
        :is="component.type"
        :content="component.content"
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
import TextInlineField from "./Fields/TextInlineField.vue";
import TextImageBlock from "./Blocks/TextImageBlock.vue";

const defaultValueMapping = {
  TextImageBlock: () => {
    return {
      text: '',
      image: {
        url: '',
        title: ''
      }
    }
  }
}

export default {
  name: 'Editor',
  components: {
    InputField,
    InputMultiField,
    TextEditorField,
    TextInlineField,
    TextImageBlock
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

      const type = 'TextImageBlock';

      this.add({
        content: defaultValueMapping[type](),
        type: Math.random() > 0.5 ? 'TextImageBlock' : 'TextImageBlock'
      })

      this.onChange(JSON.stringify(this.components));
    },
    onInputChange: function ({id, content}) {
      this.edit({id, content});
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
.component + .component {
  margin-top: 2rem;
}
</style>
