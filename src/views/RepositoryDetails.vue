<template>
    {{project}}
</template>
<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Client } from '../api/github/client';

const route = useRoute();
const organization = route.params.organization as string;
const name = route.params.name as string;
const project = ref<Project>();

onBeforeMount(async () => {
    project.value = await (new Client()).repositories().findByName(organization, name);
})
</script>