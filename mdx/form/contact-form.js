import React, { useState, useContext } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useTranslation } from 'react-i18next'

import LocationContext from '@gatsby-mdx-suite/contexts/location'

import Columns from './Columns'

const Form = styled.form`
  max-width: 600px;
  margin: 0 auto;
`

const FormItem = styled.div``

const Label = styled.label`
  font-size: 12px;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.grey000};
`

const TextInput = styled.input`
  display: block;
  width: 100%;
  border-radius: 2px;
  height: 20px;
  line-height: 20px;
  border: 1px solid ${({ theme }) => theme.colors.grey000};
  border-radius: 3px;
  margin-bottom: ${({ theme }) => theme.spacing.s1}px;
`

const CheckBox = styled.input``
const CheckBoxLabel = styled.label`
  font-size: 14px;
  margin-left: ${({ theme }) => theme.spacing.s1}px;
`

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

const SubmitWrapper = styled.div`
  margin: ${({ theme }) => theme.spacing.s2}px 0;
  text-align: center;
`

const Submit = styled.input`
  display: inline-block;
  padding: 0 5em;
  text-align: center;
  text-transform: uppercase;
  background: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  /* font-family: ${({ theme }) => theme.fonts.heading}; */
  border-radius: 32px;
  font-size: 12px;
  line-height: 32px;
  cursor: pointer;
`

export default function ContactForm({ successPageId }) {
  const { pages } = useContext(LocationContext)

  const [salt] = useState(
    Math.random()
      .toString(36)
      .substr(2, 5)
  )
  const [t] = useTranslation()

  const successPage = pages.find(({ id }) => id === successPageId)

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
  successPageId: propTypes.string
}
