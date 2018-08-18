/* istanbul ignore file */
import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'react-emotion'
import { compose } from 'lodash/fp'
import { withConsumer } from 'context-hoc'
import { fetchHocGet } from 'utils/cachedFetch'
import { Layout } from 'providers/MainLayout'
import { Input } from 'elements'
import { withFullPageLoader } from 'components'
import KeyIcon from 'mdi-react/KeyIcon'

const descriptionMap = {
  tradingpost: 'Your Trading Post transactions.',
  characters: 'Basic information about your characters.',
  pvp: 'Your PvP stats, match history, reward track progression, and custom arena details.',
  progression: 'Your achievements, dungeon unlock status, mastery point assignments, and general PvE progress.',
  wallet: 'Your account\'s wallet.',
  guilds: 'Guilds\' rosters, history, and MOTDs for all guilds you are a member of.',
  builds: 'Your currently equipped specializations, traits, skills, and equipment for all game modes.',
  account: 'Your account display name, ID, home world, and list of guilds. Required permission.',
  inventories: 'Your account bank, material storage, recipe unlocks, and character inventories.',
  unlocks: 'Your wardrobe unlocks—skins, dyes, minipets, finishers, etc.—and currently equipped skins.'
}

const contentCSS = ({ theme }) => css`
  width: 75%;

  h2 {
    padding-bottom: .5rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid ${theme.colors.gray1};
  }

  .permission {
    margin-bottom: 1.5rem;

    .p2 {
      color: ${theme.colors.gray1};
      margin-top: .1rem;
    }
  }
`

const Section = styled.div`
  padding: 1rem;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.primary2};

  ${Input} {
    margin-top: 1rem;
  }
`

const Settings = ({ settings }) => (
  <Layout>
    {({ Content }) => (
      <Content styles={contentCSS}>
        <Section>
          <h2 className='Exotic'>API Key</h2>

          <Input
            value={settings.apiKey}
            icon={<KeyIcon />} />

          <div className='row'>
            {settings.permissions.map(p => (
              <div className='permission col-xs-6' key={p}>
                <p className='Exotic'>{p}</p>
                <p className='p2'>{descriptionMap[p]}</p>
              </div>
            ))}
          </div>
        </Section>
      </Content>
    )}
  </Layout>
)

Settings.propTypes = {
  settings: PropTypes.object
}

const SettingsEnhancer = compose(
  withConsumer('app'),
  fetchHocGet('api/account/settings?token=:token', {
    dataProp: 'settings',
    options: { forever: true },
    props: ({ loading, settings = {}, errorStatus }) => ({ loading, settings, errorStatus }),
    variables: ({ authUser }) => ({ token: authUser.token })
  }),
  withFullPageLoader(p => p.loading)
)(Settings)

export default SettingsEnhancer
