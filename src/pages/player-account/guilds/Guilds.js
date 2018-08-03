/* istanbul ignore file */
import React, { Fragment } from 'react'
import { css } from 'react-emotion'
import { Layout } from 'providers/MainLayout'

const contentClasses = ({ theme }) => css`
  color: ${theme.colors.white};
`

const Guilds = () => (
  <Layout>
    {({ SideNav, Content }) => (
      <Fragment>
        <Content styles={contentClasses}>Guilds</Content>
      </Fragment>
    )}
  </Layout>
)

export default Guilds
