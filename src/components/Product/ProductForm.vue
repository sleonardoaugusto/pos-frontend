<template>
  <v-form>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          id="name"
          ref="name"
          label="Nome do Produto"
          v-model="$v.form.name.$model"
          :error-messages="errorMessage('name')"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          id="qty"
          ref="qty"
          label="Quantidade"
          type="number"
          v-model.number="$v.form.qty.$model"
          :error-messages="errorMessage('qty')"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          id="description"
          ref="description"
          label="Descrição"
          v-model="form.description"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import formValidations from '@/mixins/formValidations'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'ProductForm',
  mixins: [formValidations],
  props: ['value'],
  data: () => ({
    form: {
      name: '',
      qty: 1,
      description: ''
    }
  }),
  validations() {
    return {
      form: {
        name: {
          required
        },
        qty: {
          required
        }
      }
    }
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler(props) {
        if (
          typeof props === 'object' &&
          JSON.stringify(props) !== JSON.stringify(this.form)
        )
          this.form = { ...this.form, ...props }
      }
    },
    form: {
      deep: true,
      handler(form) {
        this.$emit('change', form)
      }
    }
  }
}
</script>

<style scoped></style>
