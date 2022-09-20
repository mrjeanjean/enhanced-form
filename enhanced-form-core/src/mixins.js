export const InputMixin = {
    props: {
        value: null,
        id: String
    },
    methods: {
        onInput: function (value, fieldName) {
            this.$emit('onChange', {
                id: this.id,
                value: {
                    ...this.value,
                    [fieldName]: value
                }
            })
        }
    }
}
