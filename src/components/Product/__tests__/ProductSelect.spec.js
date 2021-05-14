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

  beforeEach(() => {
    propsData = { products: [{}] }
    vuetify = new Vuetify()
    wrapper = factory()
  })

  const factory = () => mount(ProductSelect, { Vue, vuetify, propsData })

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

  it('Should create product', async () => {
    const spy = jest.spyOn(services.products, 'create')
    const payload = { name: faker.lorem.words() }
    await wrapper.vm.openDialog()
    await wrapper.findComponent(ProductForm).vm.$emit('change', payload)

    await wrapper.find('#confirm').trigger('click')
    expect(spy).toHaveBeenCalledWith(payload)
  })
})
