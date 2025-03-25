<template>
  <div>
    <FormToggle v-model="discount" :checked="discount" />
  </div>
</template>
<script setup lang="ts">
const discount = ref(false)
</script>

<style scoped></style>
