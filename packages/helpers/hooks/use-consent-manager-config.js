// Enhance users configuration with required integrations from MDX components
export const useConsentManagerConfig = (components, userConfig) => {
  const uniqueIntegrations = new Map(
    (userConfig.integrations || []).map((i) => [i.id, i])
  )

  // Add integration from component when not defined by user
  Object.keys(components).forEach((key) => {
    const integration = components[key]?.privacy
    if (integration && !uniqueIntegrations.has(integration.id)) {
      if (process.env.gatsby_log_level === `verbose`) {
        console.log('Located integration from MDX component:', {
          component: components[key],
          integration,
        })
      }
      uniqueIntegrations.set(integration.id, integration)
    }
  })

  const integrations = [...uniqueIntegrations.values()]

  return { ...userConfig, integrations }
}
