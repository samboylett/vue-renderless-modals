<template>
    <portal :to="portalName">
        <slot
            v-bind="modal"
            :open="open"
            :close="close"
            :toggle="toggle"
        />
    </portal>
</template>

<script>
    export default {
        name: 'base-modal',

        props: {
            name: {
                type: String,
                default: null,
            },
        },

        data() {
            const id = this.$modals.register(this.name);

            this.$emit('id', id);

            return {
                store: this.$modals.store,
                id,
            };
        },

        computed: {
            modal() {
                return this.store.list.find(({ id }) => id === this.id);
            },

            portalName() {
                return this.$modals.getPortalName(this.id);
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

        beforeDestroy() {
            this.$modals.unregister(this.id);
        },
    };
</script>
