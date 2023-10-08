export const mealSchema = {
  type: 'object',
  required: ['name', 'portions', 'stock', 'date', 'modified'],
  properties: {
    name: {
      type: 'string',
    },
    portions: {
      type: 'number',
    },
    stock: {
      type: 'number',
    },
    date: {
      type: 'string',
    },
    modified: {
      type: 'string',
    },
  },
};
