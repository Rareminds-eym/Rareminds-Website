export const formatCompanyAddressLine = (
  settings: { city: string; state: string; pincode: string }
) => `${settings.city}, ${settings.state} - ${settings.pincode}`;
