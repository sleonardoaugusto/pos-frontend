<template>
  <div>
    <v-row>
      <v-col>
        <AppHeading text="Produtos" />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-right">
        <v-btn href="/produtos/novo" color="primary"> Novo </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          ref="productsList"
          :headers="headers"
          :items="products"
          :items-per-page="10"
          class="elevation-1"
          loading-text="Carregando fornecedores... Por favor aguarde"
          :footer-props="{
            itemsPerPageAllText: 'Todos',
            itemsPerPageText: 'Qtd. por página'
          }"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import services from '@/services'
import AppHeading from '@/components/ui/AppHeading'

export default {
  name: 'ProductsList',
  components: {
    AppHeading
  },
  data: () => ({
    products: [],
    headers: [
      { text: 'Código', value: 'code' },
      { text: 'Produto', value: 'name' },
      { text: 'Preço', value: 'price' }
    ]
  }),
  async created() {
    this.products = await services.products.getAll()
  }
}
</script>

<style scoped></style>
