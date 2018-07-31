import React, { Component, createRef } from 'react'

export const withOutsideClick = handleOutsideClick => ComponentHoc =>
  class extends Component {
    constructor(props) {
      super(props)
      this.comp = createRef()
    }

    handle = e => {
      if (e.type === 'touchend') this.isTouch = true
      if (e.type === 'click' && this.isTouch) return
      const el = this.comp.current
      if (el && !el.contains(e.target)) {
        this.props[handleOutsideClick]()
      }
    }

    componentDidMount = () => {
      document.addEventListener('touchend', this.handle, true)
      document.addEventListener('click', this.handle, true)
    }

    componentWillUnmount = () => {
      document.removeEventListener('touchend', this.handle, true)
      document.removeEventListener('click', this.handle, true)
    }

    render = () => (
      <span ref={this.comp}>
        <ComponentHoc {...this.props} />
      </span>
    )
  }
