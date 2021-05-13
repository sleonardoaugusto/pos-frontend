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
          id="name"
          ref="Name"
          label="Nome do Produto"
          v-model="$v.form.name.$model"
          :error-messages="errorMessage('name')"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          id="qty"
          ref="Qty"
          label="Quantidade"
          type="number"
          v-model="$v.form.qty.$model"
          :error-messages="errorMessage('qty')"
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
      name: '',
      qty: 1
    }
  }),
  validations() {
    return {
      form: {
        provider: {
          providerIsInvalid: () => this.$refs.appProviderSelect.formIsReady
        },
        name: {
          required
        },
        qty: {
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
