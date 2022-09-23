export const ModalMixin = {
    data: function () {
        return {
            value: '',
            visible: false,
            resolvePromise: null,
            rejectPromise: null
        }
    },
    computed: {
        hasHeaderSlot: function () {
            return !!this.$slots.header;
        }
    },
    mounted() {
        window.addEventListener('keyup', this.handleKeyInput);
    },
    beforeUnmount(){
        window.removeEventListener('keyup', this.handleKeyInput);
    },
    methods: {
        onCancel: function () {
            this.resolvePromise(null);
            this.value = '';
            this.visible = false;
        },
        onSelect: function () {
            this.resolvePromise(this.value);
            this.value = '';
            this.visible = false;
        },
        show(value = null) {
            this.value = value ? value : '';
            this.visible = true;

            this.$nextTick(() => {
                this.onModalEnter();
            })

            return new Promise((resolve, reject) => {
                this.resolvePromise = resolve
                this.rejectPromise = reject
            })
        },
        onModalEnter(){
            // Could be implements on parent component
        },
        handleKeyInput(e) {
            if(!this.visible || this.resolvePromise === null){
                return;
            }

            if(e.key === 'Escape'){
                this.onCancel();
            }

            if(e.key === 'Enter'){
                this.onSelect();
            }
        }
    }
}
