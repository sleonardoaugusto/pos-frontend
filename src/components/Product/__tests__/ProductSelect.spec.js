import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuelidate from 'vuelidate'
import { mount } from '@vue/test-utils'
import ProductSelect from '@/components/Product/ProductSelect'
import services from '@/services'
import flushPromises from 'flush-promises'
import faker from 'faker'
import ProductForm from '@/components/Product/ProductForm'

jest.mock('@/services')

describe('<ProductSelect />', () => {
  Vue.use(Vuetify)
  Vue.use(Vuelidate)

  let wrapper
  let vuetify
  let propsData
  let stubs
  let ProductFormStub

  beforeEach(() => {
    ProductFormStub = {
      render: () => {},
      methods: { touch: jest.fn() },
      computed: { formIsReady: () => true },
      props: { value: {} }
    }
    stubs = { ProductForm: ProductFormStub }
    propsData = { products: [{}] }
    vuetify = new Vuetify()
    wrapper = factory()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  const factory = () => mount(ProductSelect, { Vue, vuetify, propsData, stubs })

  it('Should mount component', () => {
    expect(wrapper).toBeDefined()
  })

  it('Should insert slot if no content on filter', async () => {
    const products = [{ id: 1, name: faker.lorem.words() }]
    services.products.getAll.mockResolvedValueOnce(products)
    wrapper = factory()
    await flushPromises()

    expect(
      wrapper.findComponent({ ref: 'productSelect' }).vm.items
    ).toStrictEqual(products)
  })

  it('Should pass product name to product form component', async () => {
    const productName = faker.lorem.words()
    await wrapper.find('#product-select').setValue(productName)
    await wrapper.vm.openDialog()

    expect(wrapper.findComponent(ProductForm).vm.value).toEqual({
      name: productName
    })
  })

  it('Should touch product form on modal confirm', async () => {
    const spy = jest.spyOn(ProductFormStub.methods, 'touch')
    await wrapper.vm.openDialog()
    await wrapper.find('#confirm').trigger('click')

    expect(spy).toHaveBeenCalled()
  })

  it('Should create product and close modal', async () => {
    const createSpy = jest.spyOn(services.products, 'create')
    const closeModalSpy = jest.spyOn(wrapper.vm, 'closeDialog')

    await wrapper.vm.openDialog()
    const payload = { name: faker.lorem.words() }
    await wrapper.findComponent(ProductForm).vm.$emit('change', payload)
    await wrapper.find('#confirm').trigger('click')
    await flushPromises()

    expect(createSpy).toHaveBeenCalledWith(payload)
    expect(closeModalSpy).toHaveBeenCalled()
  })

  it('Should not create product if product form is invalid', async () => {
    const spy = jest.spyOn(services.products, 'create')
    ProductFormStub.computed.formIsReady = () => false
    wrapper = factory()

    await wrapper.vm.openDialog()
    await wrapper.find('#confirm').trigger('click')

    expect(spy).not.toHaveBeenCalled()
  })
})
