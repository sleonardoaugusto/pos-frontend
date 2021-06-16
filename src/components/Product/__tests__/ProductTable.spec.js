import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount } from '@vue/test-utils'
import ProductTable from '@/components/Product/ProductTable'

describe('<Product />', () => {
  Vue.use(Vuetify)

  let wrapper
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
    wrapper = factory()
  })

  const factory = opts => mount(ProductTable, { Vue, vuetify, ...opts })

  it('Component should be defined', () => {
    expect(wrapper).toBeDefined()
  })

  it('Add button click should add table row', async () => {
    await wrapper.find('#add-product').trigger('click')
    expect(wrapper.findAll('tbody > tr')).toHaveLength(1)
  })

  it('Remove button click should remove table row', async () => {
    await wrapper.setData({
      products: [
        { id: 1, name: 'name1' },
        { id: 2, name: 'name2' },
        { id: 3, name: 'name3' }
      ]
    })

    await wrapper.find('#remove-product-1').trigger('click')
    await wrapper.find('#remove-product-3').trigger('click')
    expect(wrapper.findAll('tbody > tr')).toHaveLength(1)
    expect(wrapper.findAll('tbody > tr').at(0).text()).toBe('name2')
  })
})
