import Realm from 'realm'
import { ProductSchema } from './Schemas/Products'

export const getRealm = async () =>
  await Realm.open({
    path: 'gestao-app',
    schema: [ProductSchema],
    schemaVersion: 3,
  })
