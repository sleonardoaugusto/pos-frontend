<template></template>

<script>
import services from '@/services'

export default {
  name: 'ProductUpdate',
  props: {
    productId: {
      type: Number,
      required: true
    }
  },
  created() {
    services.products.getById(this.productId)
  }
}
</script>

<style scoped></style>
