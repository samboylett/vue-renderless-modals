<template>
    <div class="base-modal">
        <slot
            v-bind="modal"
            :open="open"
            :close="close"
            :toggle="toggle"
        />
    </div>
</template>

<script>
    export default {
        name: 'base-modal',

        data() {
            return {
                store: this.$modals.store,
                id: this.$modals.register(),
            };
        },

        computed: {
            modal() {
                return this.store.list.find(({ id }) => id === this.id);
            },
        },

        methods: {
            open() {
                this.$modals.open(this.id);
            },

            close() {
                this.$modals.close(this.id);
            },

            toggle(state = !this.modal.isOpen) {
                this[state ? 'open' : 'close']();
            },
        },
    };
</script>
