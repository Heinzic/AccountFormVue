<template>
    <div class="accounts-container">
        <div class="header">
            <h2>Учетные записи</h2>
            <Button icon="pi pi-plus" label="Добавить" @click="addAccount" />
        </div>
    
        <div class="list-headers">
            <div>Метка</div>
            <div>Тип</div>
            <div>Логин</div>
            <div>Пароль</div>
        </div>
    
        <div v-if="accounts.length === 0" class="empty">
            Список пуст — нажмите «Добавить», чтобы создать запись.
        </div>
    
        <AccountRow v-for="acc in accounts" :key="acc.id" :account="acc" />
    </div>
</template>
  
<script setup lang="ts">
    import { useAccountsStore } from '../store/accountStore'
    import AccountRow from './AccountRow.vue'
    import Button from 'primevue/button'
    
    const store = useAccountsStore()
    const accounts = store.accounts
    
    const addAccount = () => {
        store.addEmptyAccount()
    }

</script>
  
<style scoped>
    .accounts-container { 
        padding: 16px; 
        max-width: 1000px; 
        margin: 0 auto; 
    }
    
    .header { 
        display:flex; 
        justify-content:space-between; 
        align-items:center; 
        margin-bottom: 12px; 
    }
    .list-headers { 
        display:grid; 
        grid-template-columns: 2fr 1fr 2fr 2fr 60px; 
        gap:12px; 
        font-weight:600; 
        color:#444; 
        margin-bottom:8px; 
    }
    .empty { 
        color:#666; 
        padding:12px 0; 
    }
</style>
  