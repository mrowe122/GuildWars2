/* istanbul ignore file */
import React, { Fragment } from 'react'
import { css } from 'react-emotion'
import { Layout } from 'providers/MainLayout'

const contentClasses = ({ theme }) => css`
  color: ${theme.colors.white};
`

const Inventories = () => (
  <Layout>
    {({ SideNav, Content }) => (
      <Fragment>
        <Content styles={contentClasses}>Inventories</Content>
      </Fragment>
    )}
  </Layout>
)

export default Inventories
