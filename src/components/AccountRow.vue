<template>
    <div class="account-row">
      <div class="row-field label-field">
        <InputText
          v-model="labelsInput"
          @blur="onLabelsBlur"
          :class="{'invalid': errors.labels}"
          placeholder="tag1;tag2"
        />
      </div>
  
      <div class="row-field type-field">
        <Select
          v-model="local.type"
          :options="typeOptions"
          optionLabel="label"
          optionValue="value"
          @change="onTypeChange"
        />
      </div>
  
      <div class="row-field login-field">
        <InputText
          v-model="local.login"
          @blur="onLoginBlur"
          :class="{'invalid': errors.login}"
          maxlength="100"
        />
      </div>
  
      <div class="row-field password-field" v-if="local.type === 'Локальная'">
        <Password
          v-model="local.password"
          toggleMask
          :feedback="false"
          @blur="onPasswordBlur"
          :class="{'invalid': errors.password}"
        />
      </div>
  
      <div class="row-field actions-field">
        <Button icon="pi pi-trash" class="p-button-danger" @click="removeAccount" />
      </div>
    </div>
</template>
  
<script setup lang="ts">
    import { ref } from 'vue'
    import InputText from 'primevue/inputtext'
    import Password from 'primevue/password'
    import Button from 'primevue/button'
    import { Select } from 'primevue'
    import { IAccount } from '../types'
    import { useAccountsStore } from '../store/accountStore'
    
    const props = defineProps<{ account: IAccount }>()
    
    const store = useAccountsStore()
    
    const local = ref({
        id: props.account.id,
        labels: props.account.labels.slice(),
        type: props.account.type,
        login: props.account.login ?? '',
        password: props.account.password ?? ''
    })
    
    const labelsInput = ref(local.value.labels.map(l => l.text).join(';'))
    
    const errors = ref({
        labels: false,
        login: false,
        password: false
    })
    
    const typeOptions = [
        { label: 'LDAP', value: 'LDAP' },
        { label: 'Локальная', value: 'Локальная' }
    ]
    
    function parseLabels(input: string) {
        if (!input) return []
        
        return input
        .split(';')
        .map(s => s.trim())
        .filter(Boolean)
        .map(s => ({ text: s }))
    }
    
    function onLabelsBlur() {
        const labelsArray = parseLabels(labelsInput.value)
        const invalid = labelsArray.some(l => l.text.length > 50)

        errors.value.labels = invalid
        if (!invalid) {
            local.value.labels = labelsArray
            store.updateAccount(local.value.id, { labels: labelsArray })
        }
    }
    
    function onTypeChange() {
        if (local.value.type === 'LDAP') {
            local.value.password = ''
            store.updateAccount(local.value.id, { type: local.value.type, password: null })
        } else {
            store.updateAccount(local.value.id, { type: local.value.type, password: local.value.password ?? '' })
        }
    }
    
    function onLoginBlur() {
        const val = local.value.login.trim()
        const invalid = !val || val.length > 100

        errors.value.login = invalid
        if (!invalid) {
            store.updateAccount(local.value.id, { login: val })
        }
    }
    
    function onPasswordBlur() {
        if (local.value.type !== 'Локальная') return

        const val = local.value.password.trim()
        const invalid = !val || val.length > 100
        errors.value.password = invalid

        if (!invalid) {
            store.updateAccount(local.value.id, { password: val })
        }
    }
    
    function removeAccount() {
        store.removeAccount(local.value.id)
    }
    
</script>
  
<style scoped>
    .account-row {
        display: grid;
        grid-template-columns: 2fr 1fr 2fr 2fr 60px;
        gap: 12px;
        align-items: end;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
    }
    .row-field label { 
        display:block; 
        font-size: 12px; 
        color: #333; 
        margin-bottom: 6px; 
    }
    .invalid { 
    border: 1px solid #d9534f; 
    }
    .hint { 
        font-size: 11px; 
        color: #666; 
    }
    @media (max-width: 900px) {
        .account-row { 
            grid-template-columns: 1fr; 
            gap: 8px; 
        }
    }
</style>
  