export const ProductSchema = {
  name: 'Products',
  properties: {
    _id: 'string',
    description: 'string',
    unit: 'string',
    group: 'string',
    amount: 'int',
    costPrice: 'decimal128',
    salePrice: 'decimal128',
  },
  primaryKey: '_id',
}
