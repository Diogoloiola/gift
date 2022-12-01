<template>
  <header class="header">
    <nav>
      <a href="">GitHub Repositories Finder Tool (GiFT)</a>
    </nav>
  </header>
  <main class="container">
    <Form v-if="formIsVisible" @searchProjects='searchProjects' />
    <AppTable v-else :headers="['Nome projeto', 'Descrição']" :total_count="projects?.total_count" :back="backToForm" >
      <tr v-for="(project, id) in projects?.items" :id="`${id}`" @click="$router.push(`details/${project.full_name}`)">
        <td>{{project.name}}</td>
        <td>{{project.description}}</td>
      </tr>
    </AppTable>

    <AppOverlay v-if="searchingProjects" text="Buscando projetos"/>
  </main>
</template>

<style scoped>
.header {
  padding: 20px;
  background-color: #343a40;
}

.header a {
  color: #ffff;
}

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

const formIsVisible = ref(true);

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
  const client = new Client();
  searchingProjects.value = true
  data.value.q = query;
  projects.value = await client.repositories().getAll(data.value);
  formIsVisible.value = false;
  searchingProjects.value = false
}

const backToForm = () => formIsVisible.value = !formIsVisible.value;
</script>
