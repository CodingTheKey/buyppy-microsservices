import { Client, fql } from 'fauna';

export const fauna = new Client({
  secret: 'fnAFsdD_WnAAQBBH9gG_ru5Y5THaCQn42574jmgz',
});

const query = fql``