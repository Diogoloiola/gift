<template>
    <div class="w-33" v-if="releases.length">
        <select v-model="idProject" class="input" @change="setUrlForDownload()">
            <option :value="release?.id" v-for="(release, index) in releases" :key="index">
                {{ release?.tag_name }}
            </option>
        </select>
        {{ urls }}
        <div class="d-flex mt-3">
            <RoundedButton text="Baixar zip" :fn="() => downloadFile(urls?.zipUrl ?? '')"/>
            <RoundedButton text="Baixar tar" :fn="() => downloadFile(urls?.zipUrl ?? '')"/>
        </div>
    </div>
    <div v-else>
        <p>Repositório não possui releases, mas você pode baixar a branch master. Basta clicar <a
                :href="`${project?.html_url}/archive/refs/heads/main.zip`">aqui</a></p>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Client } from '../api/github/client';
import RoundedButton from './../components/AppRoundedButton.vue';

type UrlDownload = {
    zipUrl: string,
    tarUrl: string,
}

const route = useRoute();
const organization = route.params.organization as string;
const name = route.params.name as string;
const project = ref<Project>();
const releases = ref<Release[]>([]);
const idProject = ref<Number>();

const urls = ref<UrlDownload>();

onMounted(async () => {
    const client = new Client().repositories();
    project.value = await client.findByName(organization, name);
    releases.value = await client.findReleasesByOrganizationName(organization, name);
})

const setUrlForDownload = () => {
    const release = releases.value.find((release: Release) => release.id == idProject.value);
    urls.value = {
        zipUrl: release?.zipball_url ?? '',
        tarUrl: release?.tarball_url ?? '',
    }
}


const downloadFile =(uri: string) => {
    var link = document.createElement("a");
    link.setAttribute('download', '');
    link.href = uri ?? '';
    document.body.appendChild(link);
    link.click();
    link.remove();
}
</script>