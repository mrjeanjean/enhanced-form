<template>
  <div
      class="block"
      :class="{'is-active': currentBlock && currentBlock.id === id}"
      @click="select(id)"
      v-click-outside="clickOutside"
  >
    <slot></slot>
    <ul class="block__actions">
      <li>
        <button type="button" class="button" @click="move({id, direction: 'up'})" :disabled="isFirst">
          <Icon icon="angle-up"/>
        </button>
      </li>
      <li>
        <button type="button" class="button" @click="move({id, direction: 'down'})" :disabled="isLast">
          <Icon icon="angle-down"/>
        </button>
      </li>
      <li class="item-push-down">
        <button type="button" class="button" @click="select(id); setSidebarVisibility(true)">
          <Icon icon="cog"/>
        </button>
      </li>
      <li>
        <button type="button" class="button" @click="remove(id)">
          <Icon icon="trash"/>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import Icon from "../Icon.vue";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Block",
  components: {
    Icon
  },
  props: {
    id: String,
    isFirst: Boolean,
    isLast: Boolean,
  },
  computed: {
    ...mapGetters(['currentBlock'])
  },
  methods: {
    ...mapActions(['remove', 'move', 'select', 'setSidebarVisibility']),
    clickOutside: function () {
      if (this.currentBlock !== null && this.currentBlock.id === this.id) {
        this.select(null);
      }
    }
  }
}
</script>

<style scoped>
.block {
  display: grid;
  grid-template-columns: 1fr var(--button-square-width);
  background-color: var(--theme-color-gray-100);
  gap: 2rem;
  padding: 2rem;
  padding-right: 0;
}

.block.is-active{
  box-shadow: #00000022 0 0 2rem;
}

.block__actions {
  list-style: none;
  padding: 0;
  margin: -2rem 0;
  background-color: var(--theme-color-gray-200);
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.block__actions > .item-push-down {
  margin-top: auto;
}

.block__actions .button {
  padding: 1rem;
  width: 100%;
  height: var(--button-square-width);
}

.block__actions .button:disabled {
  background-color: var(--theme-color-gray-300);
  border-color: var(--theme-color-gray-300);
}

</style>
