<template>
  <div class="repeater" :class="{'columns' : isFixed}" :style="{'--nbColumns': nbColumns}">
    <div v-for="(line, index) in fields" class="repeater-list__item">
      <div class="repeater__content">
        <div class="repeater-list__title" v-if="!isFixed">#{{ index + 1 }}</div>
        <div class="repeater__field" v-for="(field, fieldIndex) in line" :key="field.name">
          <component
              :is="field.type"
              v-bind="typeof field.content !== 'string' ? { ...field.content} : {value: field.content}"
              @onChange="v => onChange(index, fieldIndex, v)"
          />
        </div>
      </div>
      <div class="repeater__actions" v-if="!isFixed">
        <button
            class="button"
            type="button"
            @click="removeItem(index)"
            :disabled="fields.length <= 1"
        >
          <Icon icon="trash"/>
        </button>
      </div>
    </div>
  </div>
  <div class="repeater__footer" v-if="!isFixed">
    <button type="button" class="button" @click="addItem">Add item
    </button>
  </div>
</template>

<script>
import ImageField from "../Fields/ImageField.vue";
import InputField from "../Fields/InputField.vue";
import TextEditorField from "../Fields/TextEditorField.vue";
import Icon from "../Icon.vue";

console.log('HERE YO!')

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
        line[field.name] = {
          name: field.name,
          type: field.type,
          content: field.value
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
  watch: {
    size: function () {
      this.adjustFields();
    }
  }
}
</script>

<style scoped>
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

.repeater-list__item {
  background-color: #fff;
}

.repeater__field + .repeater__field {
  margin-top: 1rem;
}

.repeater-list__item {
  display: flex;
  gap: 1rem;
  border: 2px solid var(--theme-color-gray-200);
}

.repeater__content {
  padding: 2rem;
  flex: 1 0;
}

.repeater__actions {
  background-color: var(--theme-color-gray-200);
  width: 60px;
}

.repeater__actions button {
  width: 100%;
  padding: 0;
  height: 60px;
}

.repeater__footer {
  text-align: right;
  padding: 1rem;
  margin-top: 1rem;
  background-color: var(--theme-color-gray-200);
}
</style>
