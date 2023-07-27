<template>
  <div class="repeater" :class="{'columns' : isFixed}" :style="{'--nbColumns': nbColumns}">
    <div v-for="(line, index) in fields" class="repeater-list__item">
      <div class="repeater__actions" v-if="!isFixed">
        <button
            class=""
            type="button"
            @click="removeItem(index)"
            :disabled="fields.length <= 1"
        >
          <Icon icon="trash"/>
        </button>
      </div>
      <div class="repeater__content">
        <div class="repeater__field" v-for="(field, fieldIndex) in line" :key="field.name">
          <component
              :is="field.type"
              v-bind="getFieldData(field)"
              :class="field.type"
              @onChange="v => onChange(index, fieldIndex, v)"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="repeater__footer" v-if="!isFixed">
    <button
        type="button"
        class="button button--outline button--rounded button--with-icon"
        @click="addItem"
    ><Icon icon="circle-plus"/> Add item</button>
  </div>
</template>

<script>
import ImageField from "../Fields/ImageField.vue";
import InputField from "../Fields/InputField.vue";
import TextEditorField from "../Fields/TextEditorField.vue";
import Icon from "../Icon.vue";
import {unWrap} from "../../utils.js";

export default {
  name: "RepeatField",
  emits: ['onChange'],
  components: {
    ImageField,
    InputField,
    TextEditorField,
    Icon
  },
  props: {
    fields: Array,
    model: Object,
    options: Object,
    fixed: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: 1
    },
    content: Object,
    name: String
  },
  computed: {
    isFixed: function () {
      return this.fixed;
    },
    nbColumns: function () {
      return this.size;
    }
  },
  methods: {
    addItem: function () {
      const fields = [
        ...this.fields
      ];

      fields.push(this.addItemDry());

      this.$emit('onChange', {
        fields,
        fixed: this.fixed,
        size: this.size
      })
    },
    addItemDry: function () {
      const line = {};

      this.model.forEach(field => {
        const value = typeof field.value === 'object' ? {...field.value} : {value: field.value}

        line[field.name] = {
          name: field.name,
          type: field.type,
          content: {...field.options, ...value}
        }
      });

      return line;
    },
    removeItem(index) {
      this.$emit(
          'onChange', {
            fields: this.fields.filter((_, itemIndex) => index !== itemIndex),
            fixed: this.fixed,
            size: this.size
          }
      )
    },
    onChange: function (index, fieldIndex, value) {
      const fields = this.fields.map((line, lineIndex) => {
        line = JSON.parse(JSON.stringify(line));

        if (index === lineIndex) {
          line[fieldIndex].content = value;
        }

        return line;
      });

      this.$emit('onChange', {
        fields,
        fixed: this.fixed,
        size: this.size
      })
    },
    adjustFields: function () {
      const items = [];

      for (let i = 0; i < this.size; i++) {
        if (this.fields[i]) {
          items.push(this.fields[i]);
        } else {
          items.push(this.addItemDry());
        }
      }

      this.$emit('onChange', {
        fields: items,
        fixed: this.fixed,
        size: this.size
      })
    },
    getFieldData: function (field) {
      const fieldModel = this.model.find(model => field.name === model.name);
      let value = field.content;
      value = typeof value === 'object' ? {...value} : {value: value}
      return {...value, ...fieldModel.options};
    }
  },
  mounted() {
    if (this.fixed && this.size !== this.fields.length) {
      this.adjustFields();
    }

    if (!this.fixed && this.fields.length <= 0) {
      this.adjustFields();
    }
  },
  updated() {
    //console.log(unWrap(this.$props));
  },
  watch: {
    size: function () {
      this.adjustFields();
    }
  }
}
</script>

<style scoped lang="scss">
.repeater.columns {
  --nbColumns: 1;
  display: grid;
  grid-template-columns: repeat(var(--nbColumns), 1fr);
  gap: 1rem;
}

.repeater-list__title {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.repeater:not(.columns) .repeater-list__item + .repeater-list__item {
  margin-top: 1rem;
}

.repeater-list__item{
  background-color: rgba(#fff, 0.6);
  border-radius: var(--editor-block-border-radius);
  padding: 2rem;
  box-shadow: var(--editor-block-shadow);
}

.repeater__field + .repeater__field {
  margin-top: 1rem;
}

.repeater__content {
  flex: 1 0;
}

.repeater__actions {
  display: flex;
  justify-content: flex-end;
  margin-top: -1.75rem;
  margin-right: -1.75rem;

}

.repeater__actions button {
  padding: 0;
  height: 40px;
  width: 40px;
  border: none;
  background-color: transparent;
  color: var(--theme-color-button);
}

.repeater__footer {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}
</style>
