import ProductUpdate from '@/views/Products/ProductUpdate'
import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuelidate from 'vuelidate'
import VueTheMask from 'vue-the-mask'
import busy from '@/mixins/busy'
import { mount } from '@vue/test-utils'
import services from '@/services'
import faker from 'faker'

jest.mock('@/services')

describe('<ProductUpdate />', () => {
  Vue.use(Vuetify)
  Vue.use(Vuelidate)
  Vue.use(VueTheMask)
  Vue.mixin(busy)

  let wrapper
  let vuetify
  let propsData

  beforeEach(() => {
    propsData = { productId: faker.random.number({ min: 1 }) }
    services.products = {
      getById: jest.fn(() => Promise.resolve([]))
    }
    vuetify = new Vuetify()
    wrapper = factory()
  })

  const factory = opts =>
    mount(ProductUpdate, { Vue, vuetify, propsData, ...opts })

  it('Component should be defined', () => {
    expect(wrapper.vm).toBeDefined()
  })

  it('Should get product by id', () => {
    const spy = jest.spyOn(services.products, 'getById')
    expect(spy).toHaveBeenCalledWith(propsData.productId)
  })
})
