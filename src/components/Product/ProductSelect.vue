<template>
  <div>
    <v-combobox
      id="product-select"
      ref="productSelect"
      label="Produto"
      v-model="productSelected"
      :items="products"
      item-value="id"
      item-text="name"
      @update:search-input="form.name = $event"
      @change="$emit('select', $event.id)"
    >
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-content>
            <v-btn small class="primary" @click="openDialog">
              Novo
              <v-icon right>mdi-plus-circle</v-icon>
            </v-btn>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-combobox>
    <AppDialogConfirm
      title="Cadastrar produto"
      :show-dialog="showDialog"
      text-cancel="fechar"
      text-confirm="cadastrar"
      @confirm="onConfirm"
      @cancel="closeDialog"
      :max-width="580"
    >
      <template v-slot:default>
        <ProductForm ref="productForm" :value="form" @change="form = $event" />
      </template>
    </AppDialogConfirm>
  </div>
</template>

<script>
import services from '@/services'
import ProductForm from '@/components/Product/ProductForm'
import AppDialogConfirm from '@/components/ui/AppDialogConfirm'

export default {
  name: 'ProductSelect',
  components: { ProductForm, AppDialogConfirm },
  data: () => ({
    products: [],
    showDialog: false,
    productSelected: '',
    form: {
      name: ''
    }
  }),
  async created() {
    await this.getProducts()
  },
  methods: {
    async getProducts() {
      this.products = await services.products.getAll()
    },
    openDialog() {
      this.showDialog = true
    },
    async onConfirm() {
      const { name } = this.form
      this.$refs.productForm.touch()
      if (this.$refs.productForm.formIsReady) {
        await services.products.create({ name })
        await this.getProducts()
        this.closeDialog()
        this.productSelected = ''
      }
    },
    closeDialog() {
      this.showDialog = false
    }
  }
}
</script>

<style scoped></style>
