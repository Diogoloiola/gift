<template>
  <input
    class="input"
    :type="data.inputType"
    :placeholder="data.placeholder"
     @input="$emit('update:modelValue', handleInputChange($event))"
  />
</template>

<style scope>
.input {
  width: 100%;
  padding: 10px 15px;
  border: none;
  outline: none;
  border: 1px solid #9eb3c9;
  border-radius: 5px;
}
</style>

<script setup lang="ts">
import { ref } from "vue";

const data = defineProps({
  placeholder: {
    type: String,
    required: false,
  },
  inputType: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const handleInputChange = (event: Event) =>  (event.target as HTMLInputElement).value
</script>
