import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import emptySlot from 'media/images/empty_slot.gif'

const ItemSlotTemplate = ({ className, item }) => {
  return (
    <div className={className}>
      {
        item
          ? <img title={item.data.name} src={item.data.icon} />
          : <img src={emptySlot} />
      }
    </div>
  )
}

ItemSlotTemplate.propTypes = {
  className: PropTypes.string,
  item: PropTypes.object
}

const ItemSlot = styled(ItemSlotTemplate)`
  width: 50px;
  height: 50px;
  margin: 0.35rem;
  ${({ theme }) => theme.generators.boxShadow(0, 0, 7, 0, theme.colors.gray1)};

  img {
    width: 100%;
  }
`

export default ItemSlot
