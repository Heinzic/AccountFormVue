<template>
  <div id="app">
    <div class="container">
      <AccountsList />
    </div>
  </div>
</template>

<script setup lang="ts">
  import AccountsList from './components/AccountsList.vue';
</script>

<style scoped>
  body { 
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; 
    margin: 0; 
    background: #f7f8fa; 
    color: #222; 
  }
  .container { 
    padding: 24px; 
  }
</style>
