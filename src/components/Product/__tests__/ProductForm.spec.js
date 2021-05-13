import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuelidate from 'vuelidate'
import VueTheMask from 'vue-the-mask'
import busy from '@/mixins/busy'
import { mount } from '@vue/test-utils'
import AppProviderSelect from '@/components/ui/AppProviderSelect'
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

  it('Should touch child component on submit button click', async () => {
    const spy = jest.spyOn(wrapper.findComponent(AppProviderSelect).vm, 'touch')
    await wrapper.find('#submit').trigger('click')
    expect(spy).toHaveBeenCalled()
  })

  it.each([
    ['#product-name', 'productName'],
    ['#product-qty', 'productQty']
  ])(
    '%s field should should be invalid if has no value',
    async (fieldId, fieldRef) => {
      await wrapper.find(fieldId).setValue(null)
      expect(wrapper.findComponent({ ref: fieldRef }).vm.errorMessages).toBe(
        'Campo obrigatório'
      )
    }
  )

  it.each([
    ['#product-name', 'productName'],
    ['#product-qty', 'productQty']
  ])(
    '%s name field should should be valid if has value',
    async (fieldId, fieldRef) => {
      await wrapper.find(fieldId).setValue(faker.random.word())
      expect(wrapper.findComponent({ ref: fieldRef }).vm.errorMessages).toBe(
        null
      )
    }
  )

  it.each([
    ['#product-name', 'productName'],
    ['#product-qty', 'productQty']
  ])('Should touch %s field on submit button click', async (_, fieldRef) => {
    await wrapper.setData({ form: {} })

    await wrapper.find('#submit').trigger('click')
    expect(wrapper.findComponent({ ref: fieldRef }).vm.errorMessages).toBe(
      'Campo obrigatório'
    )
  })

  it('Should not emit submit event on button click if provider component is not valid', async () => {
    AppProviderSelectStub.computed.formIsReady = () => false
    wrapper = factory()
    await fillForm()

    await wrapper.find('#submit').trigger('click')
    expect(wrapper.emitted().submit).toBeFalsy()
  })

  it.each([
    ['product_name', null],
    ['product_qty', null]
  ])(
    'should not emit submit event on button click if %s form attribute is not valid',
    async (attr, value) => {
      await fillForm()

      await wrapper.setData({ form: { [`${attr}`]: value } })
      await wrapper.find('#submit').trigger('click')
      expect(wrapper.emitted().submit).toBeFalsy()
    }
  )

  it('Should emit submit event on button click if form is valid', async () => {
    const { provider, product_qty, product_name } = await fillForm()
    await wrapper.find('#submit').trigger('click')
    expect(wrapper.emitted().submit).toBeTruthy()
    expect(wrapper.emitted().submit[0]).toEqual([
      { provider, product_qty, product_name }
    ])
  })

  const fillForm = async () => {
    const data = {
      provider: faker.random.uuid(),
      product_name: faker.random.word(),
      product_qty: faker.random.number({ min: 1 })
    }
    await wrapper.setData({ form: { ...data } })
    return { ...data }
  }
})
