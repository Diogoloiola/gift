<template>
    <Header />
    <section class="container">
        <div class="d-flex justify-content-between mt-3">
            <div class="w-45">
                <label>Nome do projeto</label>
                <custom-input :inputType="'text'" :placeholder="project?.full_name" :disable="true"></custom-input>
            </div>
            <div class="w-33">
                <label>Descrição</label>
                <custom-input :inputType="'text'" :placeholder="project?.description" :disable="true"></custom-input>
            </div>
            <div>
                <label>Dono do projeto</label>
                <custom-input :inputType="'text'" :placeholder="project?.owner?.login" :disable="true"></custom-input>
            </div>
        </div>
        <div class="w-33 mt-3" v-if="releases.length">
            <label for="">Selecione a release para baixar</label>
            <select v-model="idProject" class="input" @change="setUrlForDownload()">
                <option :value="release?.id" v-for="(release, index) in releases" :key="index">
                    {{ release?.tag_name }}
                </option>
            </select>
            <div class="d-flex mt-3">
                <RoundedButton text="Baixar zip" :fn="() => downloadFile(urls?.zipUrl ?? '')" />
                <RoundedButton text="Baixar tar" :fn="() => downloadFile(urls?.zipUrl ?? '')" />
            </div>
        </div>
        <div v-else>
            <p>Repositório não possui releases, mas você pode baixar a branch master. Basta clicar <a
                    :href="`${project?.html_url}/archive/refs/heads/main.zip`">aqui</a></p>
        </div>
    </section>
    <section>
        <div class="p-absolute bottom-0">
            <RoundedButton text="Voltar para página inicial" :fn="() => $router.push('/')"/>
        </div>
    </section>

    <AppOverlay v-if="isVisible" text="Carregando..." />
</template>

<style scoped>
.container {
    width: 98%;
    margin: auto;
    margin-top: 20px;
}
</style>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Client } from '../api/github/client';
import RoundedButton from './../components/AppRoundedButton.vue';
import AppOverlay from "../components/AppOverlay.vue";
import Header from "../components/Header.vue";
import CustomInput from "../components/Input.vue";

import { useToast } from 'vue-toastification';
const toast = useToast();

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
const isVisible = ref<boolean>(false);


onMounted(async () => {
    isVisible.value = true;
    const client = new Client().repositories();
    project.value = await client.findByName(organization, name);
    releases.value = await client.findReleasesByOrganizationName(organization, name);
    isVisible.value = false;
})

const setUrlForDownload = () => {
    const release = releases.value.find((release: Release) => release.id == idProject.value);
    urls.value = {
        zipUrl: release?.zipball_url ?? '',
        tarUrl: release?.tarball_url ?? '',
    }
}

const downloadFile = (url: string) => {

    if (!url.length) {
        toast.error('Nenhum projeto foi selecionado');
        return;
    }

    toast.info('Baixando o projeto');

    const link = document.createElement("a");
    link.setAttribute('download', '');
    link.href = url ?? '';
    document.body.appendChild(link);
    link.click();
    link.remove();
}
</script>