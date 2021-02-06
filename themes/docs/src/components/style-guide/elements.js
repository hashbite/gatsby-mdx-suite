import React, { useState } from 'react'
import tw from 'twin.macro'
import { useMDXComponents } from '@mdx-js/react'

import Label from 'gatsby-theme-mdx-suite-base/src/components/form/decoration/label'
import Button from 'gatsby-theme-mdx-suite-base/src/components/form/fields/button'
import Input from 'gatsby-theme-mdx-suite-base/src/components/form/fields/input'
import Search from 'gatsby-theme-mdx-suite-base/src/components/form/fields/search'
import TextArea from 'gatsby-theme-mdx-suite-base/src/components/form/fields/textarea'
import CheckBox from 'gatsby-theme-mdx-suite-base/src/components/form/fields/checkbox'
import Select from 'gatsby-theme-mdx-suite-base/src/components/form/fields/select'
import Switch from 'gatsby-theme-mdx-suite-base/src/components/form/fields/switch'

import FieldGroup from 'gatsby-theme-mdx-suite-base/src/components/form/decoration/group'
import FieldHelp from 'gatsby-theme-mdx-suite-base/src/components/form/decoration/help'
import FieldGroupInline from 'gatsby-theme-mdx-suite-base/src/components/form/decoration/group-inline'

import {
  StyleGuideSection,
  StyleGuideSectionContent,
  StyleGuideSectionHeader,
  Table,
  GridTwoColumns,
  GridThreeColumns,
} from './styles'
import ErrorMessage from 'gatsby-theme-mdx-suite-base/src/components/form/decoration/error-message'

const fieldDescription =
  'Some description that gives the user more details about what to enter.'

function StyleGuideConfig() {
  const noop = () => {}
  const [switchState, setSwitchState] = useState(false)
  const mdxComponents = useMDXComponents()

  return (
    <>
      <StyleGuideSection>
        <StyleGuideSectionHeader>Lists</StyleGuideSectionHeader>
        <StyleGuideSectionContent>
          <GridThreeColumns>
            <div>
              <h2>Unordered List</h2>
              <mdxComponents.ul>
                <mdxComponents.li>One</mdxComponents.li>
                <mdxComponents.li>Two</mdxComponents.li>
                <mdxComponents.li>3</mdxComponents.li>
                <mdxComponents.li>④</mdxComponents.li>
                <mdxComponents.li>5️⃣</mdxComponents.li>
              </mdxComponents.ul>
            </div>
            <div>
              <h2>Ordered List</h2>
              <mdxComponents.ol>
                <mdxComponents.li>One</mdxComponents.li>
                <mdxComponents.li>Two</mdxComponents.li>
                <mdxComponents.li>3</mdxComponents.li>
                <mdxComponents.li>④</mdxComponents.li>
                <mdxComponents.li>5️⃣</mdxComponents.li>
              </mdxComponents.ol>
            </div>
            <div>
              <h2>Custom List</h2>
              <mdxComponents.ul defaultIcon="star">
                <mdxComponents.li>One</mdxComponents.li>
                <mdxComponents.li>Two</mdxComponents.li>
                <mdxComponents.li>3</mdxComponents.li>
                <mdxComponents.li>④</mdxComponents.li>
                <mdxComponents.li>5️⃣</mdxComponents.li>
              </mdxComponents.ul>
            </div>
          </GridThreeColumns>
        </StyleGuideSectionContent>
      </StyleGuideSection>
      <StyleGuideSection>
        <StyleGuideSectionHeader>Form Elements</StyleGuideSectionHeader>
        <StyleGuideSectionContent>
          <h2>Buttons</h2>
          <Table>
            <thead>
              <tr>
                <th>Variant</th>
                <th>Normal</th>
                <th>Hover</th>
                <th>Focus</th>
                <th>Disabled</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Primary</td>
                <td>
                  <Button href="#">Example Button</Button>
                </td>
                <td>
                  <Button href="#">Example Button</Button>
                </td>
                <td>
                  <Button href="#">Example Button</Button>
                </td>
                <td>
                  <Button href="#" disabled>
                    Example Button
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </StyleGuideSectionContent>
        <StyleGuideSectionContent>
          <h2>Inputs</h2>
          <h3>Text</h3>
          <GridTwoColumns>
            <FieldGroup>
              <Label htmlFor="example-text">Default:</Label>
              <Input id="example-text" type="text" />
              <FieldHelp>{fieldDescription}</FieldHelp>
            </FieldGroup>
            <FieldGroup>
              <Label htmlFor="example-text-error">Error:</Label>
              <Input
                id="example-text-error"
                type="text"
                error="Something went wrong"
              />
              <FieldHelp>{fieldDescription}</FieldHelp>
            </FieldGroup>
          </GridTwoColumns>
          <h3>Search</h3>
          <GridTwoColumns>
            <FieldGroup>
              <Label htmlFor="example-search">Default:</Label>
              <Search id="example-search" />
              <FieldHelp>{fieldDescription}</FieldHelp>
            </FieldGroup>
            <FieldGroup>
              <Label htmlFor="example-search-error">Error:</Label>
              <Search id="example-search-error" error="Something went wrong" />
              <FieldHelp>{fieldDescription}</FieldHelp>
            </FieldGroup>
          </GridTwoColumns>
          <h3>Text area</h3>
          <GridTwoColumns>
            <FieldGroup>
              <Label htmlFor="example-text-area">Default:</Label>
              <TextArea id="example-text-area" />
              <FieldHelp>{fieldDescription}</FieldHelp>
            </FieldGroup>
            <FieldGroup>
              <Label htmlFor="example-text-area-error">Error:</Label>
              <TextArea
                id="example-text-area-error"
                error="Something went wrong"
              />
              <FieldHelp>{fieldDescription}</FieldHelp>
            </FieldGroup>
          </GridTwoColumns>
        </StyleGuideSectionContent>
        <StyleGuideSectionContent>
          <h2>Controls</h2>
          <GridTwoColumns>
            <FieldGroupInline>
              <CheckBox id="example-check-box" />
              <Label htmlFor="example-check-box">Example check box</Label>
            </FieldGroupInline>
            <FieldGroupInline>
              <CheckBox id="example-check-box" />
              <Label htmlFor="example-check-box">Example check box</Label>
              <ErrorMessage>Something went wrong</ErrorMessage>
            </FieldGroupInline>
          </GridTwoColumns>
          <GridTwoColumns>
            <FieldGroup>
              <Switch
                checked={switchState}
                onChange={(e) => setSwitchState(e.target.checked)}
              >
                Example switch
              </Switch>
            </FieldGroup>
            <FieldGroup>
              <Switch
                checked={switchState}
                onChange={(e) => setSwitchState(e.target.checked)}
                error="Something went wrong"
              >
                Example switch
              </Switch>
            </FieldGroup>
          </GridTwoColumns>
          <GridTwoColumns>
            <FieldGroup>
              <Label htmlFor="example-select">Select:</Label>
              <Select id="example-select" onChange={noop}>
                <option>Default option</option>
                <option value="second">Second option</option>
              </Select>
            </FieldGroup>
            <FieldGroup>
              <Label htmlFor="example-select">Select:</Label>
              <Select id="example-select" onChange={noop}>
                <option>Default option</option>
                <option value="second">Second option</option>
              </Select>
              <ErrorMessage>Something went wrong</ErrorMessage>
            </FieldGroup>
          </GridTwoColumns>
        </StyleGuideSectionContent>
      </StyleGuideSection>
    </>
  )
}

export default StyleGuideConfig
