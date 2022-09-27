<template>
  <div class="input-spinner-field">
    <button type="button" @click="$emit('onChange', value - 1)" :disabled="value <= min">
      <Icon icon="minus"/>
    </button>
    <input
        type="text"
        :value="value"
        @input="e=>$emit('onChange', e.target.value)"
        ref="input"
        :readonly="true"
    >
    <button type="button" @click="$emit('onChange', value + 1)" :disabled="value >= max">
      <Icon icon="plus"/>
    </button>
  </div>
</template>

<script>
import Icon from "../Icon.vue";

export default {
  name: "SpinnerField",
  components:{
    Icon
  },
  props: {
    value: Number,
    min: {
      type: Number,
      required: false,
      default: 0
    },
    max: {
      type: Number,
      required: false,
      default: 99999
    }
  }
}
</script>

<style scoped>
.input-spinner-field{
  display: flex;
  height: 2rem;
}

.input-spinner-field > *{
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.input-spinner-field input{
  width: 3rem;
  text-align: center;
  font-family: inherit;
  font-size: inherit;
  border: 1px solid var(--theme-color);
  border-left: none;
  border-right: none;
  font-weight: 400;
}

.input-spinner-field button{
  background-color: var(--theme-color);
  color: #ffffff;
  border: none;
  font-family: inherit;
  padding: 0;
  width: 2rem;
  border-radius: 4px;
}

.input-spinner-field button:disabled{
  background-color: var(--theme-color-gray-300);
}

.input-spinner-field button:first-child{
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.input-spinner-field button:last-child{
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
