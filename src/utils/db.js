
import level from 'levelup'
import qLevel from 'q-level';
import levelSubLevel from 'level-sublevel';

const opendb = (dbdir) => {
  return level(dbdir, {valueEncoding:'json'})
};

const promisifydb = (db) => {
  return qLevel(db)
};

const subdb = (db, subname) => {
  return levelSubLevel(db).sublevel(subname)
};

export {
  opendb,
  subdb,
  promisifydb
}