import React, { Fragment } from 'react'
import { css } from 'styled-components'
import { Layout } from 'providers/MainLayout'

const contentClasses = css`
  margin-left: ${({ theme }) => theme.sizes.pivotBar};
  color: ${({ theme }) => theme.colors.white};
`

const Achievements = () => (
  <Layout>
    {
      ({ SideNav, Content }) => (
        <Fragment>
          <Content customClasses={contentClasses}>
            Achievements
          </Content>
        </Fragment>
      )
    }
  </Layout>
)

export default Achievements