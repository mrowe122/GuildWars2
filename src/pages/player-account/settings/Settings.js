/* istanbul ignore file */
import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'react-emotion'
import { compose, getOr } from 'lodash/fp'
import { withFormik } from 'formik'
import { withConsumer } from 'context-hoc'
import { fetchHocGet, fetchHocPost } from 'utils/cachedFetch'
import { Layout } from 'providers/MainLayout'
import { Button, Input } from 'elements'
import { withFullPageLoader } from 'components'
import KeyIcon from 'mdi-react/KeyIcon'
import { validateApiKey } from 'utils/validation'

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
    padding-left: 1rem;
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

  .error {
    color: ${({ theme }) => theme.colors.error};
    text-align: center;
  }

  ${Input} {
    margin-top: .8rem;
    margin-bottom: .8rem;
    margin-right: 1rem;
  }

  ${Button} {
    margin-right: 1rem;

    &:last-child {
      margin-right: 0;
    }
  }
`

const Settings = ({ settings, values, handleChange, handleBlur, handleSubmit, isSubmitting, isValid, keyLoading, touched, errors, status }) => (
  <Layout>
    {({ Content }) => (
      <Content styles={contentCSS} loading={keyLoading}>
        <Section>
          <h2 className='Exotic'>API Key</h2>

          {status && <p className='error'>{status}</p>}

          <Input
            name='apiKey'
            placeholder='API key'
            value={values.apiKey}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.apiKey && errors.apiKey}
            icon={<KeyIcon />} />

          <div className='row'>
            {getOr([], 'permissions')(settings).map(p => (
              <div className='permission col-xs-6' key={p}>
                <p className='Exotic'>{p}</p>
                <p className='p2'>{descriptionMap[p]}</p>
              </div>
            ))}
          </div>

          <div className='end-xs'>
            <Button type='button' onClick={handleSubmit} disabled={!isValid}>
              Save changes
            </Button>
          </div>
        </Section>
      </Content>
    )}
  </Layout>
)

Settings.propTypes = {
  settings: PropTypes.object,
  values: PropTypes.object,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  isValid: PropTypes.bool,
  keyLoading: PropTypes.bool,
  touched: PropTypes.object,
  errors: PropTypes.object,
  status: PropTypes.string
}

const SettingsEnhancer = compose(
  withConsumer('app'),
  withConsumer('permissionsProvider'),
  fetchHocGet('api/settings?token=:token', {
    dataProp: 'settings',
    options: { neverCache: true },
    props: ({ loading, settings = {} }) => ({ loading, settings }),
    variables: ({ authUser }) => ({ token: authUser.token })
  }),
  withFullPageLoader(p => p.loading),
  fetchHocPost('api/tokeninfo', {
    name: 'updateApiKey',
    props: ({ loading }) => ({ keyLoading: loading })
  }),
  withFormik({
    mapPropsToValues: ({ settings }) => ({ apiKey: settings.apiKey }),
    validate: values => {
      const apiKey = validateApiKey(values.apiKey)
      return {
        ...(apiKey && { apiKey })
      }
    },
    handleSubmit: ({ apiKey }, { props, setSubmitting, setStatus }) => {
      setStatus(null)
      props.updateApiKey({ apiKey, token: props.authUser.token }).then(res => {
        if (res.status === 400) {
          return setStatus('The key you provided is invalid')
        }
        props.fetchPermissions()
      })
    }
  })
)(Settings)

export default SettingsEnhancer
