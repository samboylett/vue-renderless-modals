<template>
    <div class="modals-target">
        <portal-target
            v-for="name in portalNames"
            :name="name"
        />
    </div>
</template>

<script>
    export default {
        name: 'modals-target',

        data() {
            return {
                store: this.$modals.store,
            };
        },

        computed: {
            portalNames() {
                return this.store.list.map(({ id }) => this.$modals.getPortalName(id));
            },
        },
    };
</script>
