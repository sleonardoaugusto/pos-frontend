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
      <template v-slot:item.name="props">
        <v-edit-dialog :return-value.sync="props.item.name">
          {{ props.item.name }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.name"
              label="Editar"
              single-line
            />
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.qty="props">
        <v-edit-dialog :return-value.sync="props.item.qty">
          {{ props.item.qty }}
          <template v-slot:input>
            <v-text-field
              v-model.number="props.item.qty"
              type="number"
              label="Editar"
              single-line
            />
          </template>
        </v-edit-dialog>
      </template>
    </v-data-table>
    <v-btn id="add-product" @click="productAdd" icon>
      <v-icon size="18"> mdi-plus </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'ProductTable',
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
      this.products.push({ id: Math.random(), name: 'Nome do Produto', qty: 0 })
    },
    productRemove(productId) {
      this.products = this.products.filter(product => product.id !== productId)
    }
  }
}
</script>

<style scoped></style>
