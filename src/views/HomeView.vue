<template>
  <header class="header">
    <nav>
      <a href="">GitHub Repositories Finder Tool (GiFT)</a>
    </nav>
  </header>
  <main class="container">
    <Form v-if="formIsVisible" @searchProjects='searchProjects' />
    <AppTable v-else :headers="['Nome projeto', 'Descrição']">
      <tr v-for="(project, id) in projects?.items" :id="`${id}`">
        <td>{{project.name}}</td>
        <td>{{project.description}}</td>
      </tr>
    </AppTable>
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

const formIsVisible = ref(true);

type RequestForGithubApi = {
  q: string,
  per_page: number,
  page: number,
}

const data = ref<RequestForGithubApi>({
  q: '',
  per_page: 15,
  page: 1
});

const projects = ref<Result>();

async function searchProjects(query: string): Promise<void> {
  const client = new Client();
  data.value.q = query;
  projects.value = await client.repositories().getAll(data.value);
  formIsVisible.value = false;
}
</script>
