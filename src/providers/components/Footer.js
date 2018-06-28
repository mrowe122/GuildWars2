import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'

const FooterTemplate = ({ className }) => (
  <div className={className}>
    <p className='p4'>
      © 2015 ArenaNet, LLC. All rights reserved. NCSOFT, the interlocking NC logo, ArenaNet, Guild Wars, Guild Wars
      Factions, Guild Wars Nightfall, Guild Wars: Eye of the North, Guild Wars 2, Heart of Thorns, and all associated
      logos and designs are trademarks or registered trademarks of NCSOFT Corporation. All other trademarks are the
      property of their respective owners.
    </p>
  </div>
)

FooterTemplate.propTypes = {
  className: PropTypes.string
}

const Footer = styled(FooterTemplate)`
  padding: 1rem;
  align-self: stretch;
  background: ${({ theme }) => theme.colors.gray5};
  z-index: ${({ theme }) => theme.zIndexLayers.footer};
  color: ${({ theme }) => theme.colors.white};
`

export default Footer
