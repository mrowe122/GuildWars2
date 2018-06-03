/* istanbul ignore file */
import React from 'react'
import { css } from 'styled-components'
import { Layout } from 'providers/MainLayout'

const contentClasses = css`
  color: ${({ theme }) => theme.colors.white};
`

const Home = () => (
  <Layout>
    {
      ({ Container, Content }) => (
        <Container header>
          <Content customClasses={contentClasses}>
            <h3>Home</h3>
          </Content>
        </Container>
      )
    }
  </Layout>
)

export default Home
