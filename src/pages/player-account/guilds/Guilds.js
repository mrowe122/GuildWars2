/* istanbul ignore file */
import React, { Fragment } from 'react'
import { css } from 'styled-components'
import { Layout } from 'providers/MainLayout'

const contentClasses = css`
  color: ${({ theme }) => theme.colors.white};
`

const Guilds = () => (
  <Layout>
    {
      ({ SideNav, Content }) => (
        <Fragment>
          <Content customClasses={contentClasses}>
            Guilds
          </Content>
        </Fragment>
      )
    }
  </Layout>
)

export default Guilds
