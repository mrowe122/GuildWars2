/* istanbul ignore file */
import React, { Fragment } from 'react'
import { css } from 'styled-components'
import { Layout } from 'providers/MainLayout'

const contentClasses = css`
  color: ${({ theme }) => theme.colors.white};
`

const Pvp = () => (
  <Layout>
    {
      ({ SideNav, Content }) => (
        <Fragment>
          <Content customClasses={contentClasses}>
            PVP
          </Content>
        </Fragment>
      )
    }
  </Layout>
)

export default Pvp
