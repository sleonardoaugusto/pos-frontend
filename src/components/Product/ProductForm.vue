<template>
  <v-form>
    <AppProviderSelect />
  </v-form>
</template>

<script>
import AppProviderSelect from '@/components/ui/AppProviderSelect'

export default {
  name: 'ProductForm',
  components: { AppProviderSelect }
}
</script>

<style scoped></style>
