import React, { useMemo } from 'react'
import { t, Trans } from '@lingui/macro'

export const useMessages = () => {
  return useMemo(
    () => ({
      // General
      'consent-manager.close': t({ id: 'consent-manager.close' }),

      // Intro
      'consent-manager.introduction.title': () => (
        <Trans
          id="consent-manager.introduction.title"
          defaults="Data protection enabled"
          message="Data protection enabled"
          default="Data protection enabled"
        >
          Data protection enabled
        </Trans>
      ),
      'consent-manager.introduction.description': () => (
        <Trans
          id="consent-manager.introduction.description"
          defaults="Some Website features are disabled to protect your privacy."
        />
      ),
      'consent-manager.introduction.learn-more': () => (
        <Trans
          id="consent-manager.introduction.learn-more"
          defaults="Learn more"
        />
      ),
      'consent-manager.introduction.enable-all': () => (
        <Trans
          id="consent-manager.introduction.enable-all"
          defaults="Enable all features"
        />
      ),

      // Form
      'consent-manager.form.headline': () => (
        <Trans
          id="consent-manager.form.headline"
          defaults="Website Features and Cookies"
        />
      ),
      'consent-manager.form.description': () => (
        <Trans
          id="consent-manager.form.description"
          defaults="
        <p>
          By default third party features are disabled to protect your privacy.
        </p>
        <p>
          To view third-party content, you first have to accept their specific
          terms and conditions. This includes their cookie policies, which can
          change anytime and which we have no control over.
          <br />
          But if you do not view this content, no third-party cookies are
          installed on your device.
        </p>
        <p>
          By activating the features you agree to the providers' terms of use and
          their cookie policy. You can opt out at any time.
        </p>
      "
        />
      ),
      'consent-manager.form.reset': () => (
        <Trans id="consent-manager.form.reset" defaults="reset defaults" />
      ),
      'consent-manager.form.enable-all': () => (
        <Trans
          id="consent-manager.form.enable-all"
          defaults="enable all features"
        />
      ),
      'consent-manager.form.disable-all': () => (
        <Trans
          id="consent-manager.form.disable-all"
          defaults="disable all features"
        />
      ),
      'consent-manager.form.save': () => (
        <Trans id="consent-manager.form.save" defaults="save and close" />
      ),

      // Fallback component
      'consent-manager.fallback.default.title': () => (
        <Trans
          id="consent-manager.fallback.default.title"
          defaults="Recommended external content"
        />
      ),
      'consent-manager.fallback.default.description': ({
        IntegrationLabel,
        title,
      }) => (
        <Trans
          id="consent-manager.fallback.default.description"
          defaults="
        <p>
          This feature contains content by <IntegrationLabel />
        </p>
        <p>
          To view this third-party content, you first have to accept their
          specific terms and conditions.
        </p>
        <p>This includes their cookie policies, which we have no control over.</p>
      "
          components={{ IntegrationLabel: <IntegrationLabel /> }}
          values={{ title }}
        />
      ),

      'consent-manager.fallback.default.enable': (values) => (
        <Trans
          id="consent-manager.fallback.default.enable"
          defaults="Enable {{category}} by {{title}}"
          values={values}
        />
      ),
      'consent-manager.fallback.default.learn-more': () => (
        <Trans
          id="consent-manager.fallback.default.learn-more"
          defaults="Learn more"
        />
      ),

      // Integration Default
      'consent-manager.integration.default.company': ({ IntegrationLabel }) => (
        <Trans
          id="consent-manager.integration.default.company"
          components={{ IntegrationLabel: <IntegrationLabel /> }}
          defaults="by <IntegrationLabel />"
        />
      ),
      'consent-manager.integration.default.category': ({ category }) => (
        <Trans
          id="consent-manager.integration.default.category"
          defaults={category}
        />
      ),
      'consent-manager.integration.default.title': ({ title }) => (
        <Trans
          id="consent-manager.integration.default.title"
          defaults={title}
        />
      ),
      'consent-manager.integration.default.description': ({ description }) => (
        <Trans
          id="consent-manager.integration.default.description"
          defaults={'{{description}}'}
          values={{ description }}
        />
      ),
      'consent-manager.integration.default.privacy-policy': ({
        Link,
        title,
      }) => (
        <Link>
          <Trans
            id="consent-manager.integration.default.privacy-policy"
            defaults="Privacy Policy by {{title}}"
            values={{ title }}
          />
        </Link>
      ),

      // Project specific overrides:
      'consent-manager.integration.algolia.description': ({
        description,
        PrivacyPolicyLink,
      }) => (
        <p>
          <Trans
            id="consent-manager.integration.algolia.description"
            defaults={'{{description}}'}
            values={{ description }}
          />
          <br />
          <PrivacyPolicyLink />
        </p>
      ),
      'consent-manager.integration.algolia.category': ({ category }) => (
        <Trans
          id="consent-manager.integration.algolia.category"
          defaults={category}
        />
      ),
      'consent-manager.integration.mapbox.description': ({
        description,
        PrivacyPolicyLink,
      }) => (
        <p>
          <Trans
            id="consent-manager.integration.mapbox.description"
            defaults={'{{description}}'}
            values={{ description }}
          />
          <br />
          <PrivacyPolicyLink />
        </p>
      ),
      'consent-manager.integration.mapbox.category': ({ category }) => (
        <Trans
          id="consent-manager.integration.mapbox.category"
          defaults={category}
        />
      ),
      'consent-manager.integration.matomo.description': ({
        description,
        PrivacyPolicyLink,
      }) => (
        <p>
          <Trans
            id="consent-manager.integration.matomo.description"
            defaults={'{{description}}'}
            values={{ description }}
          />
          <br />
          <PrivacyPolicyLink />
        </p>
      ),
      'consent-manager.integration.matomo.category': ({ category }) => (
        <Trans
          id="consent-manager.integration.matomo.category"
          defaults={category}
        />
      ),
      'consent-manager.integration.vimeo.description': ({
        description,
        PrivacyPolicyLink,
      }) => (
        <p>
          <Trans
            id="consent-manager.integration.vimeo.description"
            defaults={'{{description}}'}
            values={{ description }}
          />
          <br />
          <PrivacyPolicyLink />
        </p>
      ),
      'consent-manager.integration.vimeo.category': ({ category }) => (
        <Trans
          id="consent-manager.integration.vimeo.category"
          defaults={category}
        />
      ),
      'consent-manager.integration.youtube.description': ({
        description,
        PrivacyPolicyLink,
      }) => (
        <p>
          <Trans
            id="consent-manager.integration.youtube.description"
            defaults={'{{description}}'}
            values={{ description }}
          />
          <br />
          <PrivacyPolicyLink />
        </p>
      ),
      'consent-manager.integration.youtube.category': ({ category }) => (
        <Trans
          id="consent-manager.integration.youtube.category"
          defaults={category}
        />
      ),
      'consent-manager.fallback.mapbox.title': ({ title }) => (
        <Trans id="consent-manager.fallback.mapbox.title" defaults={title} />
      ),
      'consent-manager.fallback.algolia.title': ({ title }) => (
        <Trans id="consent-manager.fallback.algolia.title" defaults={title} />
      ),
      'consent-manager.fallback.youtube.title': ({ title }) => (
        <Trans id="consent-manager.fallback.youtube.title" defaults={title} />
      ),
      'consent-manager.fallback.vimeo.title': ({ title }) => (
        <Trans id="consent-manager.fallback.vimeo.title" defaults={title} />
      ),
    }),
    []
  )
}
