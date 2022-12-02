<template>
    <div class="box">
        <div class="box-header">
            Total de projetos
        </div>
        <div class="box-body">
            {{ total_count }}
        </div>
    </div>
    <div class="mt-2 container-table">
        <table class="table">
            <thead>
                <tr>
                    <th v-for="(header, id) in props.headers" :id="`${id}`">{{ header }}</th>
                </tr>
            </thead>
            <tbody>
                <slot />
            </tbody>
        </table>
    </div>
    <div class="d-flex justify-content-between mt-3">
        <div>
            <RoundedButton text="Voltar" :fn="() => props?.back()" :borderRadiusType="0"/>
        </div>
        <div class="d-flex">
            <RoundedButton text="<" :fn="() => props?.previousPage()" :borderRadiusType="1"/>
            <RoundedButton text=">" :fn="() => props?.nextPage()" :borderRadiusType="2"/>
        </div>
    </div>
</template>

<style>
.container-table {
    width: 100%;
    height: 60%;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
}

.table {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

.table td,
.table th {
    border: 1px solid #ddd;
    padding: 8px;
}

.table tr:nth-child(even) {
    background-color: #f2f2f2;
}

.table th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #f2f2f2;
    color: #000;
}

.table tr:hover {
    cursor: pointer;
}

.box {
    width: 300px;
    height: 90px;
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.box-header {
    font-weight: bold;
    font-size: 1rem;
}

.box-header,
.box-body {
    margin-left: 10px;
}
</style>

<script setup lang="ts">
import { defineProps } from 'vue';
import RoundedButton from './AppRoundedButton.vue';

type propsTable = {
    headers: String[],
    title?: string,
    total_count?: number,
    back: () => void;
    nextPage: () => void;
    previousPage: () => void;
}
const props = defineProps<propsTable>();
</script>