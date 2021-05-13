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
      <v-col cols="12" md="6">
        <v-text-field
          id="product-name"
          ref="productName"
          label="Nome do Produto"
          v-model="$v.form.product_name.$model"
          :error-messages="errorMessage('product_name')"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          id="product-qty"
          ref="productQty"
          label="Quantidade"
          type="number"
          v-model="$v.form.product_qty.$model"
          :error-messages="errorMessage('product_qty')"
        />
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
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'ProductForm',
  components: { AppProviderSelect },
  mixins: [formValidations],
  data: () => ({
    form: {
      provider: '',
      product_name: '',
      product_qty: 1
    }
  }),
  validations() {
    return {
      form: {
        provider: {
          providerIsInvalid: () => this.$refs.appProviderSelect.formIsReady
        },
        product_name: {
          required
        },
        product_qty: {
          required
        }
      }
    }
  },
  methods: {
    onSubmit() {
      this.touch()
      this.$refs.appProviderSelect.touch()
      if (this.formIsReady) this.$emit('submit', this.form)
    }
  }
}
</script>

<style scoped></style>
