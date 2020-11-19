import React from 'react'

import Matomo, { MatomoComponentProps } from '../integrations/matomo/component'

export type PrivacyManagerTrackingProps = MatomoComponentProps

const PrivacyManagerTracking = (props: PrivacyManagerTrackingProps) => <Matomo {...props} />

export default PrivacyManagerTracking
