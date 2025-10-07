import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { IAccount } from '../types';

const STORAGE_KEY = 'accounts_store';

export const useAccountsStore = defineStore('accounts', () => {

    const accounts = ref<IAccount[]>([]);

    function loadFromStorage() {

        const data = localStorage.getItem(STORAGE_KEY);

        if (data) {
            try {
                accounts.value = JSON.parse(data) as IAccount[];
            } catch (e) {
                accounts.value = [];
            }
        }
    }

    function saveDataToStorage() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts.value));
    }

    function addAccount() {
        const account: IAccount = {
            id: String(Date.now()),
            labels: [],
            type: 'LDAP',
            login: null,
            password: null
        };

        accounts.value.push(account);
        saveDataToStorage();
    }

    function updateAccount(id: string, payload: Partial<IAccount>) {
        const accountIndex = accounts.value.findIndex(a => a.id === id);

        if (accountIndex === -1) return;
        const updated = { ...accounts.value[accountIndex], ...payload };

        if (payload.labels !== undefined) {
            updated.labels = payload.labels;
        }

        accounts.value[accountIndex] = updated;
        saveDataToStorage();
    }

    function removeAccount(id: string) {
        accounts.value = accounts.value.filter(a => a.id !== id);
        saveDataToStorage();
    }

    loadFromStorage();

    return {
        accounts,
        addEmptyAccount: addAccount,
        updateAccount,
        removeAccount,
        loadFromStorage
    };
});