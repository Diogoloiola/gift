<template>
  <header class="header">
    <nav>
      <a href="">GitHub Repositories Finder Tool (GiFT)</a>
    </nav>
  </header>
  <main class="container">
    <form @submit.prevent="handleLogin">
      <div class="mt-3">
        <label>Linguagem do repositório</label>
        <custom-input
          :inputType="'text'"
          v-model="data.language"
        ></custom-input>
      </div>
      <div class="mt-3">
        <label>Quantidade de forks do repositorio</label>
        <custom-input :inputType="'number'" v-model="data.forks"></custom-input>
      </div>
      <div class="d-flex justify-content-between mt-3">
        <div class="w-45">
          <label>Tamanho do repositorio</label>
          <custom-input
            :inputType="'number'"
            v-model="data.size"
          ></custom-input>
        </div>
        <div class="w-33">
          <label>Licença</label>
          <select v-model="data.license" class="input">
            <option
              :value="licence.value"
              v-for="(licence, index) in licences"
              :key="index"
            >
              {{ licence.name }}
            </option>
          </select>
        </div>
        <div>
          <label>Quantidade de estrelas</label>
          <custom-input :inputType="'text'" v-model="data.stars"></custom-input>
        </div>
      </div>
      <div class="d-flex justify-content-between mt-3">
        <div class="w-50">
          <label>Tópicos</label>
          <custom-input
            :inputType="'text'"
            v-model="data.topics"
          ></custom-input>
        </div>
      </div>
      <div class="mt-3">
        <button class="button">Pesquisar</button>
      </div>
    </form>
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

.button {
  padding: 10px 20px;
  background: transparent;
  outline: none;
  border: none;
  border: 1px solid #343a40;
  border-radius: 5px;
}

.button:hover {
  cursor: pointer;
}
.input {
  width: 100%;
  padding: 10px 15px;
  border: none;
  outline: none;
  border: 1px solid #9eb3c9;
  border-radius: 5px;
  background: #fff;
}
</style>

<script setup lang="ts">
import CustomInput from "./components/Input.vue";
import { reactive } from "@vue/reactivity";
import licences from "./mocks/licences";
import createQueryForRequest from "./api/github/utils";
import { Client } from "./api/github/client";

type Params = {
  language: string;
  forks: number;
  size: number;
  license: string;
  stars: number;
  topics: string;
};

const data = reactive<Params>({
  language: "",
  forks: 0,
  size: 0,
  license: "",
  stars: 0,
  topics: "",
});

async function handleLogin(): Promise<void> {
  const client = new Client();
  const result = await client.repositories().getAll({ q: createQueryForRequest(data), per_page: 100 });
}
</script>
