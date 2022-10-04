<template>
  <header class="header">
    <nav>
      <a href="">GitHub Repositories Finder Tool (GiFT)</a>
    </nav>
  </header>
  <main class="container">
    <Form v-if="formIsVisible" @searchProjects='searchProjects' />
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
}

</style>

<script setup lang="ts">
import Form from "./Form.vue";
import { Client } from "../api/github/client";
import { ref } from "vue";

const formIsVisible = ref(true);

async function searchProjects(query: string): Promise<void> {
  const client = new Client();
  const result = await client.repositories().getAll({ q: query, per_page: 100 });
}
</script>
