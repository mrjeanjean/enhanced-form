<template>
  <p>
    <button type="button" @click="addComponent('TextImageBlock')">Add Text/Image block</button>
    <button type="button" @click="addComponent('TextBlock')">Add Text block</button>
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
import TextImageBlock from "./Blocks/TextImageBlock.vue";
import TextBlock from "./Blocks/TextBlock.vue";
import {getDefaultBlockValue} from "../blocks";

export default {
  name: 'Editor',
  components: {
    TextImageBlock,
    TextBlock
  },
  props: {
    onChange: Function
  },
  computed: {
    ...mapGetters(['components'])
  },
  methods: {
    ...mapActions(['add', 'edit']),
    addComponent: function (type) {

      this.add({
        content: getDefaultBlockValue(type),
        type: type
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
