import { Client, fql } from 'fauna';

export const fauna = new Client({
  secret: 'fnAFsdD_WnAAQBBH9gG_ru5Y5THaCQn42574jmgz',
});

export const baseFaunaClient = new Client({
  secret: 'fnAFsnTRyTAAzyxTvYix6bch3Qx1TGd2XDDp3Q1x',
})
const query = fql``