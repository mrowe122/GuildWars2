/* istanbul ignore file */
import React, { Fragment } from 'react'
import { css } from 'react-emotion'
import { Layout } from 'providers/MainLayout'

const contentClasses = ({ theme }) => css`
  color: ${theme.colors.white};
`

const Pvp = () => (
  <Layout>
    {({ SideNav, Content }) => (
      <Fragment>
        <Content styles={contentClasses}>PVP</Content>
      </Fragment>
    )}
  </Layout>
)

export default Pvp
