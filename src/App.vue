<template>
  <div id="app">
    <div class="container">
      <AccountsList />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import AccountsList from './components/AccountsList.vue';

  export default defineComponent({
    name: 'App',
    components: { AccountsList }
  });
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
