export const mealSchema = {
  type: 'object',
  required: ['name', 'portions', 'stock', 'date', 'modified', 'ingredients'],
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
    ingredients: {
      type: 'array',
      items: {
        type: 'object',
        required: ['name', 'qty'],
        properties: {
          name: {
            type: 'string',
          },
          qty: {
            type: 'string',
          },
        },
      },
    },
  },
};
