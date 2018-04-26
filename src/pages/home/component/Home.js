import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose } from 'lodash/fp'
import { withStateHandlers } from 'recompose'
import { Modal } from 'components'

const HomeTemplate = ({ className, showModal, handleModal }) => (
  <div className={className}>
    <h3>Home</h3>
    <button type='button' onClick={handleModal}>open</button>
    <Modal showModal={showModal} closeModal={handleModal}>
      Test
    </Modal>
  </div>
)

HomeTemplate.propTypes = {
  className: PropTypes.string,
  showModal: PropTypes.bool,
  handleModal: PropTypes.func
}

const Home = styled(HomeTemplate)`
`

export default compose(
  withStateHandlers(
    () => ({ showModal: false }),
    { handleModal: ({ showModal }) => () => (({ showModal: !showModal })) }
  )
)(Home)
