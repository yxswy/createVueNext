<script lang="ts" setup>
import { ref } from 'vue'

const helloWorld = ref<string>('123456789')
</script>

<template>
    <h1>{{ helloWorld }}</h1>
</template>