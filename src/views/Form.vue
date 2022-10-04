<template>
    <form @submit.prevent="$emit('searchProjects', createQueryForRequest(data))">
        <div class="mt-3">
            <label>Linguagem do repositório</label>
            <custom-input :inputType="'text'" v-model="data.language"></custom-input>
        </div>
        <div class="mt-3">
            <label>Quantidade de forks do repositorio</label>
            <custom-input :inputType="'number'" v-model="data.forks"></custom-input>
        </div>
        <div class="d-flex justify-content-between mt-3">
            <div class="w-45">
                <label>Tamanho do repositorio</label>
                <custom-input :inputType="'number'" v-model="data.size"></custom-input>
            </div>
            <div class="w-33">
                <label>Licença</label>
                <select v-model="data.license" class="input">
                    <option :value="licence.value" v-for="(licence, index) in licenses" :key="index">
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
                <custom-input :inputType="'text'" v-model="data.topics"></custom-input>
            </div>
        </div>
        <div class="mt-3">
            <button class="button">Pesquisar</button>
        </div>
    </form>
</template>

<style scoped>
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
</style>

<script lang="ts" setup>
import CustomInput from "../components/Input.vue";
import createQueryForRequest from "../api/github/utils";
import licenses from "../mocks/licenses";
import { ref } from "@vue/reactivity";

const data = ref<Params>({
    language: "",
    forks: 0,
    size: 0,
    license: "",
    stars: 0,
    topics: "",
});

const emit = defineEmits(['searchProjects'])

</script>