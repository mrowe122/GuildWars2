import styled from 'react-emotion'
import { compose } from 'lodash/fp'
import { withStateHandlers, branch, renderNothing } from 'recompose'
import { withProvider, withConsumer } from 'utils/withContext'

export const withDropdown = compose(
  withStateHandlers(
    ({ initial = false }) => ({ showDropdown: initial }),
    { handleDropdown: ({ showDropdown }) => () => ({ showDropdown: !showDropdown }) }
  ),
  withProvider('dropdown', ({ showDropdown }) => ({ showDropdown }))
)

const DropdownEnhancer = compose(
  withConsumer('dropdown'),
  branch(
    ({ showDropdown }) => !showDropdown,
    renderNothing
  )
)

export default DropdownEnhancer(styled.div`
  top: calc(100% + 1rem);
  left: ${({ dropdown }) => dropdown || '50%'};
  transform: translateX(-50%);
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 0.6rem 0;
  border-radius: .5rem;
  background-color: ${({ theme }) => theme.colors.gray4};

  &:before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    position: absolute;
    border-top: 0px solid transparent;
    border-left: 10px solid transparent;
    border-bottom: 8px solid ${({ theme }) => theme.colors.gray4};
    border-right: 10px solid transparent;
    top: -8px;
    left: ${({ arrow }) => arrow || '50%'};
    transform: translateX(-50%);
  }
`)
