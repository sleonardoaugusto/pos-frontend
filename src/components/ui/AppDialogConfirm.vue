<template>
  <v-row justify="center">
    <v-dialog
      v-model="internalShowDialog"
      @keydown.esc="onCancel"
      :max-width="maxWidth"
    >
      <v-card>
        <v-card-title class="headline">{{ title }}</v-card-title>
        <v-card-text>
          {{ text }}
          <v-container>
            <slot name="default"></slot>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn id="cancel" text @click="onCancel"> {{ textCancel }} </v-btn>
          <v-spacer></v-spacer>
          <v-btn id="confirm" color="primary" text @click="onConfirm">
            {{ textConfirm }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'AppDialogConfirm',
  props: {
    showDialog: {
      type: Boolean,
      required: false
    },
    title: {
      type: String
    },
    text: {
      type: String
    },
    textCancel: {
      type: String,
      default: 'não'
    },
    textConfirm: {
      type: String,
      default: 'sim'
    },
    maxWidth: {
      type: Number,
      default: 290
    }
  },
  data: () => ({
    internalShowDialog: false
  }),
  methods: {
    onConfirm() {
      this.$emit('confirm')
    },
    onCancel() {
      this.$emit('cancel')
    }
  },
  watch: {
    showDialog(val) {
      this.internalShowDialog = val
    }
  }
}
</script>

<style scoped></style>
