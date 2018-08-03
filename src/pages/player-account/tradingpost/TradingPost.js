/* istanbul ignore file */
import React, { Fragment } from 'react'
import { css } from 'react-emotion'
import { Layout } from 'providers/MainLayout'

const contentClasses = ({ theme }) => css`
  color: ${theme.colors.white};
`

const TradingPost = () => (
  <Layout>
    {({ SideNav, Content }) => (
      <Fragment>
        <Content styles={contentClasses}>Trading Post</Content>
      </Fragment>
    )}
  </Layout>
)

export default TradingPost
