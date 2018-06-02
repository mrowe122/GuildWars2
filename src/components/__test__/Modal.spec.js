import React from 'react'
import Modal, { withModal } from '../Modal'

describe.only('Modal', () => {
  describe('Enhancer', () => {
    let _component, Empty, _props

    beforeEach(() => {
      _props = { initial: true }
      Empty = withModal(EmptyDiv)
      _component = mount(<Empty {..._props} />)
    })

    it('should default showModal to false', () => {
      const component = mount(<Empty />).find(EmptyDiv)
      expect(component.props().showModal).toBe(false)
    })

    it('should default showModal to true', () => {
      const component = _component.find(EmptyDiv)
      expect(component.props().showModal).toBe(true)
    })

    it('should handle modal close', () => {
      let emptyDiv = _component.find(EmptyDiv)
      emptyDiv.props().closeModal()
      _component.update()
      emptyDiv = _component.find(EmptyDiv)
      expect(emptyDiv.props().showModal).toBe(false)
    })
  })

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
