<template>
    <button class="btn btn-gray" @click="handleClick">{{text}}</button>
</template>

<style scoped>
.btn {
    display: block;
    width: 100%;
    padding: 15px;
    outline: none;
    border: none;
    border-radius: 50px;
}

.btn:hover {
    cursor: pointer;
}

.btn-gray {
    background-color: #808080;
    color: #fff;
}
</style>

<script lang="ts" setup>
  type Props = {
    text: string,
    back: () => void;
  }

  const props = defineProps<Props>();

  const handleClick = () => props?.back();
</script>