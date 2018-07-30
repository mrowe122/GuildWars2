/* istanbul ignore file */
import React from 'react'
import { css } from 'react-emotion'
import { Layout } from 'providers/MainLayout'

const contentClasses = ({ theme }) => css`
  color: ${theme.colors.white};
`

const Home = () => (
  <Layout>
    {({ Content }) => (
      <Content customClasses={contentClasses}>
        <h3>Home</h3>
      </Content>
    )}
  </Layout>
)

export default Home
