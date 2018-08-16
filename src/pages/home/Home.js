/* istanbul ignore file */
import React from 'react'
import { Layout } from 'providers/MainLayout'

const Home = () => (
  <Layout>
    {({ Content }) => (
      <Content>
        <h3>Home</h3>
      </Content>
    )}
  </Layout>
)

export default Home
