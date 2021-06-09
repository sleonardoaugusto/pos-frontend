<template>
  <div>
    <v-data-table :headers="headers" :items="products" class="elevation-1">
      <template v-slot:item.actions="{ item }">
        <v-btn
          :id="`remove-product-${item.id}`"
          @click="productRemove(item.id)"
          icon
        >
          <v-icon size="18"> mdi-delete </v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <v-btn id="add-product" @click="productAdd" icon>
      <v-icon size="18"> mdi-plus </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'ProductTableRow',
  data: () => ({
    headers: [
      { text: 'Produto', value: 'name' },
      { text: 'Quantidade', value: 'qty' },
      { text: 'Ações', value: 'actions' }
    ],
    products: []
  }),
  methods: {
    productAdd() {
      this.products.push({ id: Math.random(), name: Math.random() })
    },
    productRemove(productId) {
      this.products = this.products.filter(product => product.id !== productId)
    }
  }
}
</script>

<style scoped></style>
