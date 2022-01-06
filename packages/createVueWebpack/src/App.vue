<script lang="ts" setup>
import { ref } from 'vue'
import img from './assets/Snipaste.png'
import './styles/index.scss'

const helloWorld = ref<string>('123456789')
</script>

<template>
    <h1>{{ helloWorld }}</h1>
    <h2>你好这是 h2</h2>
    <img :src="img" />
</template>

<style lang="scss" scoped>
h1 {
    color: orange;
}
</style>