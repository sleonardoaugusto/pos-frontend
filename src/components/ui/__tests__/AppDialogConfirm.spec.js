import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount } from '@vue/test-utils'
import AppDialogConfirm from '@/components/ui/AppDialogConfirm'
import faker from 'faker'

describe('<AppDialogConfirm />', () => {
  Vue.use(Vuetify)

  let wrapper
  let vuetify
  let propsData

  beforeEach(() => {
    propsData = {
      title: faker.lorem.words(),
      text: faker.lorem.words(),
      textCancel: faker.lorem.word(),
      textConfirm: faker.lorem.word()
    }
    vuetify = new Vuetify()
    wrapper = factory()
  })

  const factory = opts =>
    mount(AppDialogConfirm, { Vue, vuetify, propsData, ...opts })

  it('Component should be defined', () => {
    expect(wrapper.vm).toBeDefined()
  })

  it('Should render title props', async () => {
    await showDialog()
    expect(wrapper.find('.v-card__title').text()).toBe(propsData.title)
  })

  it('Should render text props', async () => {
    await showDialog()
    expect(wrapper.find('.v-card__text').text()).toBe(propsData.text)
  })

  it('Should render cancel button text', async () => {
    await showDialog()
    expect(wrapper.find('#cancel').text()).toBe(propsData.textCancel)
  })

  it('Should render confirm button text', async () => {
    await showDialog()
    expect(wrapper.find('#confirm').text()).toBe(propsData.textConfirm)
  })

  it('Should open dialog if props is true', async () => {
    await showDialog()
    expect(wrapper.find('.v-dialog__content').element).toBeDefined()
  })

  it('Should not open dialog if props is false', async () => {
    await wrapper.setProps({ showDialog: false })
    expect(wrapper.find('.v-dialog__content').element).toBeUndefined()
  })

  it('Confirm button click should confirm emit event', async () => {
    await showDialog()

    await wrapper.find('#confirm').trigger('click')
    expect(wrapper.emitted().confirm).toBeTruthy()
  })

  it('Cancel button click should cancel emit event', async () => {
    await showDialog()

    await wrapper.find('#cancel').trigger('click')
    expect(wrapper.emitted().cancel).toBeTruthy()
  })

  it('ESC keydown should emit cancel event', async () => {
    await showDialog()

    await wrapper.find('.v-dialog').trigger('keydown.esc')
    expect(wrapper.emitted().cancel).toBeTruthy()
  })

  it('Should render slot', async () => {
    const slots = {
      default: '<div class="fake-msg"></div>'
    }
    wrapper = factory({ slots })
    await showDialog()

    expect(wrapper.find('.fake-msg').element).toBeDefined()
  })

  const showDialog = () => {
    wrapper.setProps({ showDialog: true })
  }
})
