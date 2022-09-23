<template>
  <div class="block">
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
import {mapActions} from "vuex";

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
  methods: {
    ...mapActions(['remove', 'move'])
  }
}
</script>

<style scoped>
.block {
  display: grid;
  grid-template-columns: 1fr 60px;
  background-color: #fafafa;
  gap: 2rem;
}

.block:hover .block__actions {
  opacity: 1;
  pointer-events: auto;
}

.block__actions {
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  gap: 2px;
  /*opacity: 0;*/
  transition: opacity 300ms;
  pointer-events: none;
}

.block__actions > :last-child {
  margin-top: auto;
}

.block__actions .button {
  padding: 1rem;
  width: 100%;
}

.block__actions .button:disabled{
  background-color: #acacac;
  border-color: #acacac;
}

</style>
