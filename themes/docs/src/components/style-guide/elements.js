import React, { useState } from 'react'

import Label from 'gatsby-theme-mdx-suite-base/src/components/form/decoration/label'

import Button from 'gatsby-theme-mdx-suite-base/src/components/form/fields/button'
import Input from 'gatsby-theme-mdx-suite-base/src/components/form/fields/input'
import Search from 'gatsby-theme-mdx-suite-base/src/components/form/fields/search'
import TextArea from 'gatsby-theme-mdx-suite-base/src/components/form/fields/textarea'
import CheckBox from 'gatsby-theme-mdx-suite-base/src/components/form/fields/checkbox'
import Select from 'gatsby-theme-mdx-suite-base/src/components/form/fields/select'
import Switch from 'gatsby-theme-mdx-suite-base/src/components/form/fields/switch'

import {
  StyleGuideSection,
  StyleGuideSectionContent,
  StyleGuideSectionHeader,
} from './styles'
import FieldGroup from 'gatsby-theme-mdx-suite-base/src/components/form/decoration/group'
import FieldHelp from 'gatsby-theme-mdx-suite-base/src/components/form/decoration/help'
import FieldGroupInline from 'gatsby-theme-mdx-suite-base/src/components/form/decoration/group-inline'

function StyleGuideConfig() {
  const noop = () => {}
  const [switchState, setSwitchState] = useState(false)
  return (
    <>
      <StyleGuideSection>
        <StyleGuideSectionHeader>Form Elements</StyleGuideSectionHeader>
        <StyleGuideSectionContent>
          <h2>Buttons</h2>
          <Button href="#">Example Button</Button>
          <Button href="#" disabled>
            Disabled Button
          </Button>
        </StyleGuideSectionContent>
        <StyleGuideSectionContent>
          <h2>Inputs</h2>
          <FieldGroup>
            <Label htmlFor="example-text">Text input:</Label>
            <Input id="example-text" type="text" />
            <FieldHelp>
              Some description that gives the user more details about what to
              enter.
            </FieldHelp>
          </FieldGroup>
          <FieldGroup>
            <Label htmlFor="example-search">Search input:</Label>
            <Search id="example-search" />
          </FieldGroup>
          <FieldGroup>
            <Label htmlFor="example-text-area">Text area:</Label>
            <TextArea id="example-text-area" />
          </FieldGroup>
        </StyleGuideSectionContent>
        <StyleGuideSectionContent>
          <h2>Controls</h2>
          <FieldGroupInline>
            <CheckBox id="example-check-box" />
            <Label htmlFor="example-check-box">Example check box</Label>
          </FieldGroupInline>
          <FieldGroup>
            <Switch
              checked={switchState}
              onChange={(e) => setSwitchState(e.target.checked)}
            >
              Example switch
            </Switch>
          </FieldGroup>
          <FieldGroup>
            <Label htmlFor="example-select">Select:</Label>
            <Select id="example-select" onChange={noop}>
              <option>Default option</option>
              <option value="second">Second option</option>
            </Select>
          </FieldGroup>
        </StyleGuideSectionContent>
      </StyleGuideSection>
    </>
  )
}

export default StyleGuideConfig
