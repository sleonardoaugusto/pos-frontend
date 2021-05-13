<template>
  <div>
    <v-combobox
      id="provider-select"
      ref="providerSelect"
      label="Fornecedor"
      v-model="$v.form.providerSelected.$model"
      :items="providers"
      item-value="id"
      item-text="name"
      @update:search-input="form.providerName = $event"
      @change="$emit('select', $event.id)"
      :error-messages="errorMessage('providerSelected')"
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
      title="Cadastrar fornecedor"
      :show-dialog="showDialog"
      text-cancel="fechar"
      text-confirm="cadastrar"
      @confirm="onConfirm"
      @cancel="closeDialog"
    >
      <template v-slot:default>
        <v-text-field
          id="provider-name"
          label="Nome"
          v-model="$v.form.providerName.$model"
          :error-messages="errorMessage('providerName')"
        />
      </template>
    </AppDialogConfirm>
  </div>
</template>

<script>
import services from '@/services'
import AppDialogConfirm from '@/components/ui/AppDialogConfirm'
import { required } from 'vuelidate/lib/validators'
import formValidations from '@/mixins/formValidations'

export default {
  name: 'AppProviderSelect',
  components: { AppDialogConfirm },
  mixins: [formValidations],
  props: ['value'],
  data: () => ({
    providers: [],
    showDialog: false,
    form: {
      providerSelected: '',
      providerName: ''
    }
  }),
  validations: {
    form: {
      providerSelected: {
        required
      },
      providerName: {
        required
      }
    }
  },
  async created() {
    await this.getProviders()
  },
  methods: {
    async getProviders() {
      this.providers = await services.providers.getAll()
    },
    openDialog() {
      this.showDialog = true
    },
    closeDialog() {
      this.showDialog = false
    },
    async onConfirm() {
      this.touch()
      if (!this.$v.form.providerName.$invalid) {
        await services.providers.create(this.form.providerName)
        await this.getProviders()
        this.form.providerSelected = ''
        this.closeDialog()
      }
    }
  },
  computed: {
    formIsReady() {
      return !this.$v.form.providerSelected.$invalid
    }
  },
  watch: {
    value(prop) {
      if (prop)
        this.form.providerSelected = this.providers.find(
          provider => provider.id === prop
        )
    }
  }
}
</script>

<style scoped></style>
