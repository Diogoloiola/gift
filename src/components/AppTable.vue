<template>
    <div class="mt-2 container-table">
        <table class="table">
            <thead>
                <tr>
                    <th v-for="(header, id) in props.headers" :id="`${id}`">{{header}}</th>
                </tr>
            </thead>
            <tbody>
                <slot />
            </tbody>
        </table>
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
.table td, .table th {
  border: 1px solid #ddd;
  padding: 8px;
}
.table tr:nth-child(even){background-color: #f2f2f2;}
.table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #f2f2f2;
  color: #000;
}

.table tr:hover{
    cursor: pointer;
}
</style>

<script setup lang="ts">
import { defineProps } from 'vue';
type propsTable = {
    headers: String[],
    title?: string,
}
const props = defineProps<propsTable>();
</script>