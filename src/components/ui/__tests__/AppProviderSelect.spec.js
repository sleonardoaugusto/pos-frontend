import AppProviderSelect from '@/components/ui/AppProviderSelect'
import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuelidate from 'vuelidate'
import VueTheMask from 'vue-the-mask'
import busy from '@/mixins/busy'
import { mount } from '@vue/test-utils'
import services from '@/services'
import flushPromises from 'flush-promises'
import faker from 'faker'
import { invalidFeedback } from '@/utils/testHelpers'

jest.mock('@/services')

describe('<AppProviderSelect />', () => {
  Vue.use(Vuetify)
  Vue.use(Vuelidate)
  Vue.use(VueTheMask)
  Vue.mixin(busy)

  let wrapper
  let vuetify
  let propsData

  beforeEach(() => {
    vuetify = new Vuetify()
    wrapper = factory()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const factory = opts =>
    mount(AppProviderSelect, { Vue, vuetify, propsData, ...opts })

  it('Component should be defined', () => {
    expect(wrapper.vm).toBeDefined()
  })

  it('Should insert slot if no content on filter', async () => {
    const providers = [{ id: 1, name: 'Maria Isabel' }]
    services.providers.getAll.mockResolvedValueOnce(providers)
    wrapper = factory()

    await flushPromises()
    expect(
      wrapper.findComponent({ ref: 'providerSelect' }).vm.items
    ).toStrictEqual(providers)
  })

  it('Should create provider', async () => {
    const spy = jest.spyOn(services.providers, 'create')
    await wrapper.setData({ showDialog: true })

    const providerName = faker.lorem.word()
    await wrapper.find('#provider-select').setValue(providerName)
    await wrapper.find('#confirm').trigger('click')
    expect(spy).toHaveBeenCalledWith(providerName)
  })

  it('Provider select should be required', async () => {
    await wrapper.vm.touch()
    expect(invalidFeedback(wrapper, '#provider-select')).toBe(
      'Campo obrigatório'
    )
  })

  it('Provider name should be required', async () => {
    const spy = jest.spyOn(services.providers, 'create')
    await wrapper.setData({ showDialog: true })

    await wrapper.find('#confirm').trigger('click')
    expect(spy).not.toHaveBeenCalled()
    expect(invalidFeedback(wrapper, '#provider-name')).toBe('Campo obrigatório')
  })

  it('Should set value props', async () => {
    const providers = [{ id: 1, name: 'Maria Isabel' }]
    wrapper.setData({ providers: providers })

    await wrapper.setProps({ value: 1 })
    expect(
      wrapper.findComponent({ ref: 'providerSelect' }).vm.value
    ).toStrictEqual(providers[0])
  })

  it('Provider select should emit select event', async () => {
    const payload = { id: faker.random.uuid(), name: faker.random.word() }
    await wrapper
      .findComponent({ ref: 'providerSelect' })
      .vm.$emit('change', payload)

    expect(wrapper.emitted().select).toBeTruthy()
    expect(wrapper.emitted().select[0]).toEqual([payload.id])
  })
})
