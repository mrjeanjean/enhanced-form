<template>
  <div v-for="(field, fieldName) in filteredSettings" class="field">
    <div class="setting-form__row" :class="setting.component.type" v-for="(setting, index) in field">
      <div class="setting-form__row__label">{{ setting.label }}</div>
      <component
          :is="setting.component.type"
          v-bind="getSettingData(fieldName, setting)"
          :value="block.content[fieldName][setting.component.name]"
          @onChange="value=>onChange(fieldName, setting.component.name, value)"
      />
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "Settings",
  props: {
    blockData: Object,
    block: Object
  },
  computed: {
    filteredSettings: function(){
      const settings = {};
      Object.entries(this.blockData.settings).forEach(([key, value])=>{
        if(value && value.length > 0){
          settings[key] = value;
        }
      })
      return settings;
    }
  },
  methods: {
    ...mapActions(['edit']),
    onChange: function (field, key, value) {
      this.edit({
        id: this.block.id,
        content: {
          ...this.block.content,
          [field]: {
            ...this.block.content[field],
            [key]: value
          }
        }
      })
    },
    getSettingData: function (fieldName, setting) {
      return {
        ...this.block.content[fieldName][setting.component.name],
        ...setting.component.options
      }
    }
  }
}
</script>

<style scoped>
.setting-form__row {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  height: 100%;
}

.setting-form__row__label {
  font-weight: 600;
  font-size: 85%;
}
</style>
