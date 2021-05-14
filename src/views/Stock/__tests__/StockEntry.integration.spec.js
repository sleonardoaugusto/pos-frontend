import { mount } from '@vue/test-utils'
import StockEntry from '@/views/Stock/StockEntry'
import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuelidate from 'vuelidate'
import VueTheMask from 'vue-the-mask'
import busy from '@/mixins/busy'
import faker from 'faker'
import AppProviderSelect from '@/components/ui/AppProviderSelect'

jest.mock('@/services')

describe('<StockEntry />', () => {
  Vue.use(Vuetify)
  Vue.use(Vuelidate)
  Vue.use(VueTheMask)
  Vue.mixin(busy)

  let wrapper
  let vuetify
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

  const factory = () => mount(StockEntry, { Vue, vuetify, stubs })

  it('Should mount component', () => {
    expect(wrapper).toBeDefined()
  })

  it('Should touch child component on submit button click', async () => {
    const spy = jest.spyOn(wrapper.findComponent(AppProviderSelect).vm, 'touch')
    await wrapper.find('#submit').trigger('click')
    expect(spy).toHaveBeenCalled()
  })

  it('Should not emit submit event on button click if provider component is not valid', async () => {
    AppProviderSelectStub.computed.formIsReady = () => false
    wrapper = factory()

    await wrapper.find('#submit').trigger('click')
    expect(wrapper.emitted().submit).toBeFalsy()
  })

  it('Should emit submit event on button click if form is valid', async () => {
    const { provider } = await fillForm()

    await wrapper.find('#submit').trigger('click')
    expect(wrapper.emitted().submit).toBeTruthy()
    expect(wrapper.emitted().submit).toHaveLength(1)
    expect(wrapper.emitted().submit[0]).toEqual([{ provider }])
  })

  const fillForm = async () => {
    const provider = faker.random.uuid()
    await wrapper.findComponent(AppProviderSelect).vm.$emit('select', provider)

    return { provider }
  }
})
