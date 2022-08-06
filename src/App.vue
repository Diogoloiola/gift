<template>
  <header class="header">
    <nav>
      <a href="">GitHub Repositories Finder Tool (GiFT)</a>
    </nav>
  </header>
  <main class="container">
    <div>
      <label>Linguagem do repositório</label>
      <custom-input :inputType="'text'" v-model="data.language"></custom-input>
    </div>
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
</style>

<script setup lang="ts">
import CustomInput from "./components/Input.vue";

import { reactive } from "@vue/reactivity";

const data = reactive({
  language: "",
});
</script>
