import React from 'react'
import propTypes from 'prop-types'
import { Form } from 'react-final-form'
import MailchimpSubscribe from 'react-mailchimp-subscribe'
import styled from '@emotion/styled'
import tw from 'twin.macro'

import Link from '@gatsby-mdx-suite/mdx-link/link'
import { styleCTA } from '@gatsby-mdx-suite/mdx-link/cta'
import InputField from 'gatsby-theme-mdx-suite-base/src/components/form/final-form/input'
import SwitchField from 'gatsby-theme-mdx-suite-base/src/components/form/final-form/switch'

const SubmitButton = styled.button`
  ${tw`block mx-auto`}
  ${styleCTA}
`

const FormWrapper = styled.div`
  ${tw`max-w-xl mx-auto sm:p-8 sm:shadow rounded`}
`

const FieldWrapper = styled.div`
  ${tw`mb-4 flex items-center`}
`

const FieldLabel = styled.label`
  ${tw`whitespace-nowrap w-32 mr-4`}
`

const required = (value) => (value ? undefined : 'Required')

const MailchimpSignup = ({
  url,
  enableNameFields,
  privacyPolicyId,
  children,
}) => {
  return (
    <MailchimpSubscribe
      url={url}
      render={({ subscribe, status, message }) => (
        <Form
          onSubmit={subscribe}
          render={({
            handleSubmit,
            submitting,
            pristine,
            hasValidationErrors,
          }) => (
            <form onSubmit={handleSubmit}>
              <FormWrapper>
                {children}
                <FieldWrapper>
                  <FieldLabel htmlFor="mailchimp-signup-email">
                    Email *
                  </FieldLabel>
                  <InputField
                    id="mailchimp-signup-email"
                    name="EMAIL"
                    type="email"
                    placeholder="john.doe@gmail.com"
                    validate={required}
                  />
                </FieldWrapper>
                {enableNameFields && (
                  <>
                    <FieldWrapper>
                      <FieldLabel htmlFor="mailchimp-signup-fname">
                        First Name
                      </FieldLabel>
                      <InputField id="mailchimp-signup-fname" name="FNAME" />
                    </FieldWrapper>
                    <FieldWrapper>
                      <FieldLabel htmlFor="mailchimp-signup-lname">
                        Last Name
                      </FieldLabel>
                      <InputField id="mailchimp-signup-lname" name="LNAME" />
                    </FieldWrapper>
                  </>
                )}
                <FieldWrapper>
                  <SwitchField
                    id="mailchimp-signup-gdpr"
                    name="gdpr"
                    validate={required}
                    type="checkbox"
                  >
                    Yes, I accept data processing and saving for future
                    information and contact. My data will be deleted immediately
                    upon my request. I have taken note of our{' '}
                    <Link id={privacyPolicyId}>Privacy Policy</Link>.
                  </SwitchField>
                </FieldWrapper>
                <SubmitButton
                  type="submit"
                  disabled={submitting || pristine || hasValidationErrors}
                >
                  Sign up
                </SubmitButton>
                {status === 'sending' && (
                  <div style={{ color: 'blue' }}>Sending...</div>
                )}
                {status === 'error' && (
                  <div
                    style={{ color: 'red' }}
                    dangerouslySetInnerHTML={{ __html: message }}
                  />
                )}
                {status === 'success' && (
                  <div style={{ color: 'green' }}>Signed up!</div>
                )}
              </FormWrapper>
            </form>
          )}
        />
      )}
    />
  )
}

MailchimpSignup.defaultProps = {
  privacyPolicyId: 'privacyPolicy',
  enableNameFields: false,
}

MailchimpSignup.propTypes = {
  // Endpoint URL for a signup form for a specific audience
  url: propTypes.string.isRequired,
  // Display optional form fields that ask for first and last name of the subscriber.
  enableNameFields: propTypes.bool,
  // Page id of your privacy policy.
  privacyPolicyId: propTypes.string,
  // Optional content above the sign up form
  children: propTypes.node,
}

export default MailchimpSignup
