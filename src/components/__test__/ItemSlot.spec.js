import React from 'react'
import { enhancer, ItemSlot } from '../ItemSlot'

describe('ItemSlot', () => {
  describe('Enhancer', () => {
    let _component

    beforeEach(() => {
      const Empty = enhancer(EmptyDiv)
      _component = mount(<Empty />)
    })

    it('should mount', () => {
      expect(_component.length).toBe(1)
    })

    it('should default showTooltip to false', () => {
      const component = _component.find(EmptyDiv)
      expect(component.props().showTooltip).toBe(false)
    })

    it('should handleHover to show tooltip', () => {
      let emptyDiv = _component.find(EmptyDiv)
      emptyDiv.props().handleHover()
      _component.update()
      emptyDiv = _component.find(EmptyDiv)
      expect(emptyDiv.props().showTooltip).toBe(true)
    })
  })

  describe('Component', () => {
    let _component
    beforeEach(() => {
      _component = props => shallow(<ItemSlot {...globalProps} {...props} />).dive()
    })

    it('should render empty Logo', () => {
      const img = _component().find('img')
      expect(img.props().alt).toEqual('empty slot')
    })

    it('should render an item slot', () => {
      const props = {
        item: {}
      }
      const img = _component(props).find('img')
      expect(img.props().alt).toEqual('item slot')
    })

    it('should render ArmorTooltip ', () => {
      const slots = ['Helm', 'Shoulders', 'Coat', 'Gloves', 'Leggings', 'Boots', 'HelmAquatic']
      slots.map(s => {
        const props = {
          item: { slot: s },
          showTooltip: true
        }
        const img = _component(props).find('ArmorTooltip')
        expect(img.length).toBe(1)
        const ArmorTooltip = img.dive()
        expect(ArmorTooltip.find('IconTitle').length).toBe(1)
        expect(ArmorTooltip.find('Attributes').length).toBe(1)
        expect(ArmorTooltip.find('Upgrades').length).toBe(1)
        expect(ArmorTooltip.find('Infusions').length).toBe(1)
        expect(ArmorTooltip.find('ItemSkin').length).toBe(1)
        expect(ArmorTooltip.find('ItemInfo').length).toBe(1)
      })
    })

    it('should render WeaponTooltip', () => {
      const slots = ['WeaponA1', 'WeaponA2', 'WeaponB1', 'WeaponB2', 'WeaponAquaticA', 'WeaponAquaticB']
      slots.map(s => {
        const props = {
          item: { slot: s },
          showTooltip: true
        }
        const img = _component(props).find('WeaponTooltip')
        expect(img.length).toBe(1)
        const WeaponTooltip = img.dive()
        expect(WeaponTooltip.find('IconTitle').length).toBe(1)
        expect(WeaponTooltip.find('Attributes').length).toBe(1)
        expect(WeaponTooltip.find('Upgrades').length).toBe(1)
        expect(WeaponTooltip.find('Infusions').length).toBe(1)
        expect(WeaponTooltip.find('ItemSkin').length).toBe(1)
        expect(WeaponTooltip.find('ItemInfo').length).toBe(1)
      })
    })

    it('should render UtilityTooltip', () => {
      const slots = ['Backpack', 'Accessory1', 'Accessory2', 'Amulet', 'Ring1', 'Ring2']
      slots.map(s => {
        const props = {
          item: { slot: s },
          showTooltip: true
        }
        const img = _component(props).find('UtilityTooltip')
        expect(img.length).toBe(1)
        const UtilityTooltip = img.dive()
        expect(UtilityTooltip.find('IconTitle').length).toBe(1)
        expect(UtilityTooltip.find('Attributes').length).toBe(1)
        expect(UtilityTooltip.find('Upgrades').length).toBe(1)
        expect(UtilityTooltip.find('Infusions').length).toBe(1)
        expect(UtilityTooltip.find('ItemSkin').length).toBe(1)
        expect(UtilityTooltip.find('ItemInfo').length).toBe(1)
      })
    })

    it('should render GatheringTooltip', () => {
      const slots = ['Sickle', 'Axe', 'Pick']
      slots.map(s => {
        const props = {
          item: { slot: s },
          showTooltip: true
        }
        const img = _component(props).find('GatheringTooltip')
        expect(img.length).toBe(1)
        const GatheringTooltip = img.dive()
        expect(GatheringTooltip.find('IconTitle').length).toBe(1)
        expect(GatheringTooltip.find('Upgrades').length).toBe(1)
      })
    })
  })
})
