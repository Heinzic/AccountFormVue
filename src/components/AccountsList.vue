<template>
    <div class="accounts-container">
        <div class="header">
            <h2>Учетные записи</h2>
            <Button icon="pi pi-plus" label="Добавить" @click="addAccount" />
        </div>
        <div class="">
            <p class="hint">Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</p>
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
    import { storeToRefs } from 'pinia'
    import { useAccountsStore } from '../store/accountStore'
    import AccountRow from './AccountRow.vue'
    import Button from 'primevue/button'
    
    const store = useAccountsStore()
    const { accounts } = storeToRefs(store)

    
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
        grid-template-columns: 3fr 2fr 3.6fr 1.4fr 180px;
        gap:12px; 
        font-weight:600; 
        color:#444; 
        margin-bottom:8px; 
    }
    .empty { 
        color:#666; 
        padding:12px 0; 
    }
    .hint { 
        font-size: 15px; 
        color: #666;
        margin: 15px 0;
        background-color: rgb(235, 235, 235);
        padding: 10px 5px;
    }
</style>
  