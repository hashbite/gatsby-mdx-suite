import React, { useState, useContext } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useTranslation } from 'react-i18next'
import { useStaticQuery, graphql } from 'gatsby'
import tw from 'twin.macro'

import MdxSuiteContext from '@gatsby-mdx-suite/contexts/mdx-suite'
import {
  generatePageMap,
  getPageWithFallback,
} from '@gatsby-mdx-suite/helpers/routing'

import Columns from '@gatsby-mdx-suite/mdx-layout/columns'

const Form = tw.form`max-w-4xl mx-auto`

const FormItem = tw.div``

const Label = tw.label`block text-gray-700 text-sm font-bold mb-2`

const TextInput = tw.input`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`

const CheckBox = tw.input``
const CheckBoxLabel = tw.label`text-sm ml-4`

// Sweet === Honeypot
const SweetInput = styled(TextInput)`
  position: fixed;
  top: -200vh;
  left: -200vw;
  background: transparent;
  color: transparent;
  pointer-events: none;
`

const FormColumns = styled(Columns)`
  margin: 0;
`

const SubmitWrapper = tw.div`my-8 text-center`

const Submit = tw.input`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`

/**
 * Creates a contact form with spam protection.
 *
 * @todo make fields configurable
 *
 * @example
 * <ContactForm />
 */
export default function ContactForm({ successPageId }) {
  const [t] = useTranslation()
  const result = useStaticQuery(graphql`
    {
      allSitePage {
        nodes {
          ...MdxSuiteSitePageMetadata
        }
      }
    }
  `)

  const pages = result.allSitePage.nodes

  const {
    themeConfig: { defaultLocale, pageId },
    pageContext: { locale },
  } = useContext(MdxSuiteContext)

  const pageMap = generatePageMap({ pages, activePageId: pageId })

  const successPage = getPageWithFallback({
    pageMap,
    locale,
    defaultLocale,
  })

  const [salt] = useState(Math.random().toString(36).substr(2, 5))

  return (
    <Form
      name="contact"
      netlify-honeypot="name"
      data-netlify="true"
      method="post"
      action={successPage && successPage.path}
    >
      <SweetInput name="name" autoComplete="off" />
      <FormColumns availableSpace="600">
        <FormItem>
          <Label for={`firstName${salt}`}>{t('contactFormFirstName')}</Label>
          <TextInput
            name={`firstName${salt}`}
            id={`firstName${salt}`}
            required
          />
        </FormItem>
        <FormItem>
          <Label for={`lastName${salt}`}>{t('contactFormLastName')}</Label>
          <TextInput name={`lastName${salt}`} id={`lastName${salt}`} required />
        </FormItem>
      </FormColumns>
      <FormItem>
        <Label for={`position${salt}`}>{t('contactFormPosition')}</Label>
        <TextInput name={`position${salt}`} id={`position${salt}`} required />
      </FormItem>
      <FormItem>
        <Label for={`companyEmail${salt}`}>
          {t('contactFormCompanyEmail')}
        </Label>
        <TextInput
          type="email"
          name={`companyEmail${salt}`}
          id={`companyEmail${salt}`}
          required
        />
      </FormItem>
      <FormItem>
        <Label for={`company${salt}`}>{t('contactFormCompany')}</Label>
        <TextInput name={`company${salt}`} id={`company${salt}`} required />
      </FormItem>
      <FormItem>
        <Label for={`numberOfEmployees${salt}`}>
          {t('contactFormNumberOfEmployees')}
        </Label>
        <TextInput
          type="number"
          min="1"
          name={`numberOfEmployees${salt}`}
          id={`numberOfEmployees${salt}`}
          required
        />
      </FormItem>
      <FormItem>
        <CheckBox
          type="checkbox"
          name={`tosAccepted${salt}`}
          id={`tosAccepted${salt}`}
          required
        />
        <CheckBoxLabel for={`tosAccepted${salt}`}>
          {t('contactFormTosAccepted')}
        </CheckBoxLabel>
      </FormItem>
      <SubmitWrapper>
        <Submit type="submit" value={t('contactFormSubmit')} />
      </SubmitWrapper>
    </Form>
  )
}

ContactForm.propTypes = {
  successPageId: propTypes.string,
}
