<template>
  <Header />
  <main class="container">
    <Form v-if="formIsVisible" @searchProjects='searchProjects' />

    <AppTable v-else-if="(!showDetails() && !formIsVisible)" :headers="['Nome projeto', 'Descrição']"
      :total_count="projects?.total_count" :back="backToForm">
      <tr v-for="(project, id) in projects?.items" :id="`${id}`" @click="formatDetailsProject(project.full_name)">
        <td>{{ project.name }}</td>
        <td>{{ project.description }}</td>
      </tr>
    </AppTable>

    <RepositoryDetails v-if="showDetails()" :name="projectDetails?.name ?? ''"
      :organization="projectDetails?.organization ?? ''" :fn="() => resetProjectDetails()" />

    <AppOverlay v-if="searchingProjects" text="Buscando projetos" />

  </main>
</template>

<style scoped>
.container {
  width: 98%;
  margin: auto;
  margin-top: 20px;
}
</style>

<script setup lang="ts">
import { ref } from "vue";
import Form from "./Form.vue";

import { Client } from "../api/github/client";
import AppTable from "../components/AppTable.vue";
import AppOverlay from "../components/AppOverlay.vue";
import Header from "../components/Header.vue";
import RepositoryDetails from "./RepositoryDetails.vue";
import { useToast } from 'vue-toastification';

const formIsVisible = ref(true);
const toast = useToast();

type ProjectDetails = {
  organization: string,
  name: string
}

const projectDetails = ref<ProjectDetails>();

type RequestForGithubApi = {
  q: string,
  per_page: number,
  page: number,
}

const data = ref<RequestForGithubApi>({
  q: '',
  per_page: 13,
  page: 1
});

const searchingProjects = ref(false)

const projects = ref<Result>();

async function searchProjects(query: string): Promise<void> {
  try {
    const client = new Client();
    searchingProjects.value = true
    data.value.q = query;
    projects.value = await client.repositories().getAll(data.value);
    formIsVisible.value = false;
    searchingProjects.value = false
  } catch (error) {
    toast.error('Algo deu errado ao procurar o projeto');
    searchingProjects.value = false;
  }

}

const backToForm = () => formIsVisible.value = !formIsVisible.value;

const formatDetailsProject = (full_name: string) => {
  const [organization, name] = full_name.split('/')

  projectDetails.value = { organization, name }
}

const showDetails = () => projectDetails.value?.name?.length && projectDetails.value?.organization?.length

const resetProjectDetails = () => {
  projectDetails.value = { name: '', organization: '' }
}

</script>
