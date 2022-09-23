<template>
  <div class="editor">
    <BlockSelectorModal ref="blockSelectorModalRef">
      <template v-slot:header>
        Select block
      </template>
    </BlockSelectorModal>
    <button type="button" @click="showBlockSelector" class="button">Add block</button>
    <div class="components-list">
      <Block
          v-for="(component, index) in components"
          :key="component.id"
          class="component"
          :id="component.id"
          :isFirst="index === 0"
          :isLast="index >= components.length - 1"
      >
        <component
            :is="component.type"
            :content="component.content"
            :key="index"
            @onChange="onInputChange"
            :id="component.id"
        />
      </Block>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import TextImageBlock from "./Blocks/TextImageBlock.vue";
import TextBlock from "./Blocks/TextBlock.vue";
import {getDefaultBlockValue} from "../blocks";
import BlockSelectorModal from "./Modals/BlockSelectorModal.vue";
import ImageBlock from "./Blocks/ImageBlock.vue";
import Block from "./Blocks/Block.vue";

export default {
  name: 'Editor',
  components: {
    Block,
    TextImageBlock,
    TextBlock,
    ImageBlock,
    BlockSelectorModal
  },
  data: function () {
    return {
      blockSelectorModal: null
    }
  },
  props: {
    onChange: Function
  },
  computed: {
    ...mapGetters(['components'])
  },
  mounted() {
    this.blockSelectorModal = this.$refs.blockSelectorModalRef;
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
    },
    showBlockSelector: async function () {
      const value = await this.blockSelectorModal.show();

      if (value) {
        this.addComponent(value);
      }
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
.editor{
  margin-bottom: 2rem;
}

.components-list {
  margin-top: 2rem;
}

.component + .component {
  margin-top: 2rem;
}
</style>
