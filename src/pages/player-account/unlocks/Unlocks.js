/* istanbul ignore file */
import React, { Fragment } from 'react'
import { css } from 'react-emotion'
import { Layout } from 'providers/MainLayout'

const contentClasses = ({ theme }) => css`
  color: ${theme.colors.white};
`

const Unlocks = () => (
  <Layout>
    {
      ({ SideNav, Content }) => (
        <Fragment>
          <Content customClasses={contentClasses}>
            Unlocks
          </Content>
        </Fragment>
      )
    }
  </Layout>
)

export default Unlocks
