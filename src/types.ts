export type AccountType = 'LDAP' | 'Локальная';

export interface ILabel {
  text: string;
}

export interface IAccount {
  id: string;
  labels: ILabel[];
  type: AccountType;
  login: string | null;
  password: string | null;
}
