<template>
    <div class="base-modal">
        <slot v-bind="modal" />
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
    };
</script>
