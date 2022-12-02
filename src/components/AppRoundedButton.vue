<template>
    <button class="btn btn-gray" :class="fetchClass(props.borderRadiusType)" @click="handleClick">{{text}}</button>
</template>

<style scoped>
.btn {
    display: block;
    width: 100%;
    padding: 15px;
    outline: none;
    border: none;
}
.radius-0 {
  border-radius: 50px;
}

.radius-1{
  border-radius: 5px 0px 0px 5px;
}

.radius-2{
  border-radius: 0px 5px 5px 0px;
}

.radius-4{
  border-radius: 0;
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
    fn?: () => void;
    borderRadiusType: number
  }

  const props = defineProps<Props>();

  const handleClick = (()=>{
    if(props.fn){
      props.fn();
    }
  });

  const fetchClass = (borderRadiusType: number) => {
    return {
      0: 'radius-0',
      1: 'radius-1',
      2: 'radius-2',
      3: 'radius-3',
      4: 'radius-4'
    }[borderRadiusType]
  }

</script>