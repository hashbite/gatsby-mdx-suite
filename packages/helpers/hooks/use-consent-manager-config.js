// Enhance users configuration with required integrations from MDX components
export const useConsentManagerConfig = (components, userConfig) => {
  const uniqueIntegrations = new Map(
    (userConfig.integrations || []).map((i) => [i.id, i])
  )

  // Add integration from component when not defined by user
  Object.keys(components).forEach((key) => {
    const integration = components[key]?.privacy
    console.log({ com: components[key], integration })
    if (integration && !uniqueIntegrations.has(integration.id)) {
      uniqueIntegrations.set(integration.id, integration)
    }
  })

  const integrations = [...uniqueIntegrations.values()]

  return { ...userConfig, integrations }
}
