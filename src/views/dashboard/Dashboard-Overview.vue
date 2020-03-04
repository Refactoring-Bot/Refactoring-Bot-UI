<template>
    <div>
        <h1>Dashboard</h1>
        <Timeline></Timeline>
    </div>
</template>

<script lang="ts">
    import Stats from "../../components/Stats/Stats.vue";
    import Timeline from "../../components/Timeline/Timeline.vue";

    export default {
        name: "dashboard",
        components: {
            Stats,
            Timeline
        }
    };
</script>

<style scoped>

</style>
