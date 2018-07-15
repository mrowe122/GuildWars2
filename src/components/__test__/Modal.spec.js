import React from 'react'
import Modal from '../Modal'

describe('Modal', () => {
  describe('Component', () => {
    let _component, EmptyContent

    beforeEach(() => {
      EmptyContent = EmptyDiv
      _component = (props, children) => shallow(<Modal {...globalProps} {...props}>{children}</Modal>).dive()
    })

    it('should mount', () => {
      const _props = { showModal: true }
      const _mount = mount(<Modal {..._props}><div /></Modal>)
      expect(_mount.length).toBe(1)
    })

    it('should render nothing when modal false', () => {
      const _props = { showModal: false }
      expect(_component(_props).length).toBe(1)
    })

    it('should render FilledContent', () => {
      const _props = { showModal: true }
      const FilledContent = () => <div>Empty Modal</div>
      const ModalWithContent = _component(_props, <FilledContent />)
      expect(ModalWithContent.find(FilledContent).dive().text()).toBe('Empty Modal')
    })

    it('should render close icon', () => {
      const _props = { showModal: true }
      const ModalWithContent = _component(_props, <EmptyContent />)
      expect(ModalWithContent.find('CloseIcon').length).toBe(1)
    })

    it('should not render close icon', () => {
      const _props = { showModal: true, hideClose: true }
      const ModalWithContent = _component(_props, <EmptyContent />)
      expect(ModalWithContent.find('CloseIcon').length).toBe(0)
    })
  })
})
