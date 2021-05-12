import Products from '@/views/Products/ProductsList'
import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuelidate from 'vuelidate'
import VueTheMask from 'vue-the-mask'
import busy from '@/mixins/busy'
import { mount } from '@vue/test-utils'
import services from '@/services'
import faker from 'faker'
import flushPromises from 'flush-promises'

jest.mock('@/services')

describe('<Products />', () => {
  Vue.use(Vuetify)
  Vue.use(Vuelidate)
  Vue.use(VueTheMask)
  Vue.mixin(busy)

  let wrapper
  let vuetify

  beforeEach(() => {
    services.products = {
      getAll: jest.fn(() => Promise.resolve([]))
    }
    vuetify = new Vuetify()
    wrapper = factory()
  })

  const factory = opts => mount(Products, { Vue, vuetify, ...opts })

  it('Component should be defined', () => {
    expect(wrapper.vm).toBeDefined()
  })

  it('Table should receive products response as items props', async () => {
    const responseData = [
      { id: faker.random.uuid(), name: faker.random.word() }
    ]
    services.products.getAll.mockResolvedValueOnce(responseData)

    wrapper = factory()
    await flushPromises()

    expect(
      wrapper.findComponent({ ref: 'productsList' }).vm.items
    ).toStrictEqual(responseData)
  })

  it('Table should receive headers props as headers props', () => {
    const headers = [
      { text: 'Código', value: 'code' },
      { text: 'Produto', value: 'name' },
      { text: 'Preço', value: 'price' }
    ]
    expect(
      wrapper.findComponent({ ref: 'productsList' }).vm.headers
    ).toStrictEqual(headers)
  })

  it('Button url should be /produtos/novo', () => {
    expect(wrapper.find('a').attributes().href).toBe('/produtos/novo')
  })
})
