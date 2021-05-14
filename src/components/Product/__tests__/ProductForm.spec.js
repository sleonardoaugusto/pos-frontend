import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuelidate from 'vuelidate'
import VueTheMask from 'vue-the-mask'
import busy from '@/mixins/busy'
import { mount } from '@vue/test-utils'
import faker from 'faker'
import ProductForm from '@/components/Product/ProductForm'

jest.mock('@/services')

describe('<Product />', () => {
  Vue.use(Vuetify)
  Vue.use(Vuelidate)
  Vue.use(VueTheMask)
  Vue.mixin(busy)

  let wrapper
  let vuetify
  let propsData
  let stubs
  let AppProviderSelectStub

  beforeEach(() => {
    AppProviderSelectStub = {
      render: () => {},
      methods: { touch: jest.fn() },
      computed: { formIsReady: () => true }
    }
    stubs = { AppProviderSelect: AppProviderSelectStub }
    vuetify = new Vuetify()
    wrapper = factory()
  })

  const factory = opts =>
    mount(ProductForm, { Vue, vuetify, propsData, stubs, ...opts })

  it('Component should be defined', () => {
    expect(wrapper.vm).toBeDefined()
  })

  it.each([['#description', 'description']])(
    '%s field should not be required',
    async (fieldId, fieldRef) => {
      await wrapper.find('#description').setValue(null)
      expect(wrapper.findComponent({ ref: fieldRef }).vm.errorMessages).toEqual(
        []
      )
    }
  )

  it.each([
    ['#name', 'name', faker.random.word()],
    ['#qty', 'qty', faker.random.number({ min: 1 })]
  ])(
    '%s field should be valid if has value',
    async (fieldId, fieldRef, value) => {
      await wrapper.find(fieldId).setValue(value)
      expect(wrapper.findComponent({ ref: fieldRef }).vm.errorMessages).toBe(
        null
      )
    }
  )

  it.each([
    ['#name', 'name'],
    ['#qty', 'qty']
  ])(
    '%s field should be invalid if has no value',
    async (fieldId, fieldRef) => {
      await wrapper.find(fieldId).setValue(null)
      expect(wrapper.findComponent({ ref: fieldRef }).vm.errorMessages).toBe(
        'Campo obrigatório'
      )
    }
  )

  it('Should fill form with received props', async () => {
    const props = { name: faker.lorem.words() }
    await wrapper.setProps({ value: props })
    expect(wrapper.find('#name').element.value).toBe(props.name)
  })

  it.each([
    ['#name', 'name', faker.random.word()],
    ['#qty', 'qty', faker.random.number({ min: 1 })]
  ])(
    'Should emit form on field %s change',
    async (fieldId, attrName, value) => {
      await wrapper.find(fieldId).setValue(value)
      const payload = { ...wrapper.vm.form, [`${attrName}`]: value }
      expect(wrapper.emitted().change).toBeTruthy()
      expect(wrapper.emitted().change[0]).toEqual([payload])
    }
  )

  it.each([
    ['#name', 'name', faker.random.word()],
    ['#qty', 'qty', faker.random.number({ min: 1 })]
  ])(
    'Should not emit the same form twice',
    async (fieldId, attrName, value) => {
      await wrapper.find(fieldId).setValue(value)
      await wrapper.setProps({
        value: { ...wrapper.vm.form, [`${attrName}`]: value }
      })
      expect(wrapper.emitted().change).toHaveLength(1)
    }
  )
})
