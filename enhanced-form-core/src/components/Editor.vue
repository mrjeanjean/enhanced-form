<template>
  <div class="menu-component">
    <div class="menu-component__inner">
      <button type="button" @click="addComponent('TextImageBlock')">Text/Image</button>
      <button type="button" @click="addComponent('TextBlock')">Text</button>
    </div>
  </div>
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
.menu-component {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0;
  display: flex;
  justify-content: center;
}

.menu-component button {
  border-radius: 0;
  background-color: var(--theme-color);
  padding: 2rem;
  color: #ffffff;
  font-weight: 600;
}

.menu-component button:hover {
  outline: none;
}

.menu-component button + button{
  border-left: 2px solid #fff;
}


.component + .component {
  margin-top: 2rem;
}
</style>
