<template>
    <div class="base-modal">
        <slot :open="open" />
    </div>
</template>

<script>
    export default {
        name: 'base-modal',

        props: {
            open: {
                type: Boolean,
                default: false,
            },
        },
    };
</script>
