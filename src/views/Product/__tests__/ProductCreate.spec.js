import ProductCreate from '@/views/Product/ProductCreate'
import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuelidate from 'vuelidate'
import VueTheMask from 'vue-the-mask'
import busy from '@/mixins/busy'
import { mount } from '@vue/test-utils'
import services from '@/services'

jest.mock('@/services')

describe('<ProductCreate />', () => {
  Vue.use(Vuetify)
  Vue.use(Vuelidate)
  Vue.use(VueTheMask)
  Vue.mixin(busy)

  let wrapper
  let vuetify
  let propsData

  beforeEach(() => {
    services.products = {
      create: jest.fn(() => Promise.resolve([]))
    }
    vuetify = new Vuetify()
    wrapper = factory()
  })

  const factory = opts =>
    mount(ProductCreate, { Vue, vuetify, propsData, ...opts })

  it('Component should be defined', () => {
    expect(wrapper.vm).toBeDefined()
  })
})
