<template>
  <v-form>
    <v-row>
      <v-col cols="12" md="6">
        <AppProviderSelect
          ref="appProviderSelect"
          @select="form.provider = $event"
          :value="form.provider"
        />
      </v-col>
      <v-col cols="12" md="12">
        <ProductTable @change="payload => (form.products = payload)" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn id="submit" color="primary" @click="onSubmit">Cadastrar</v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import AppProviderSelect from '@/components/ui/AppProviderSelect'
import formValidations from '@/mixins/formValidations'
import ProductTable from '@/components/Product/ProductTable'

export default {
  name: 'StockEntry',
  components: { ProductTable, AppProviderSelect },
  mixins: [formValidations],
  data: () => ({
    form: {
      provider: '',
      products: []
    }
  }),
  validations() {
    return {
      form: {
        provider: {
          providerIsInvalid: () => this.$refs.appProviderSelect.formIsReady
        }
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.appProviderSelect.touch()
      this.touch()
      if (this.formIsReady) this.$emit('submit', this.form)
    }
  }
}
</script>

<style scoped></style>
