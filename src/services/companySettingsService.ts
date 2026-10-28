import { supabase } from '../lib/supabaseClient';
import type { CompanySettings } from '../types/companySettings';

const COMPANY_SETTINGS_SELECT = 'office_address, city, state, pincode, logo_url';

function isValidLogoUrl(logoUrl: string) {
  if (logoUrl.startsWith('/')) {
    return true;
  }

  try {
    const parsedUrl = new URL(logoUrl);
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch {
    return false;
  }
}

export async function getCompanySettings(): Promise<CompanySettings> {
  const { data, error } = await supabase
    .from('company_settings')
    .select(COMPANY_SETTINGS_SELECT)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Error fetching company settings:', error);
    const detail = error.message ? ` ${error.message}` : '';

    const tableMissing =
      error.code === '42P01' ||
      (/company_settings/i.test(error.message ?? '') &&
        /does not exist|not found|schema cache/i.test(error.message ?? ''));

    if (tableMissing) {
      throw new Error(`Company settings database table is missing.${detail}`);
    }

    throw new Error(`Unable to load company settings from Supabase.${detail}`);
  }

  if (!data) {
    throw new Error('Company settings row is missing in Supabase.');
  }

  const settings = {
    office_address: data.office_address?.trim() ?? '',
    city: data.city?.trim() ?? '',
    state: data.state?.trim() ?? '',
    pincode: data.pincode?.trim() ?? '',
    logo_url: data.logo_url?.trim() ?? '',
  };

  const missingFields = [
    !settings.office_address ? 'office address' : null,
    !settings.city ? 'city' : null,
    !settings.state ? 'state' : null,
    !settings.pincode ? 'pincode' : null,
    !settings.logo_url ? 'logo URL' : null,
  ].filter(Boolean);

  if (missingFields.length > 0) {
    throw new Error(`Company settings are incomplete: missing ${missingFields.join(', ')}.`);
  }

  if (!/^\d{6}$/.test(settings.pincode)) {
    throw new Error('Company settings contain an invalid pincode.');
  }

  if (!isValidLogoUrl(settings.logo_url)) {
    throw new Error('Company settings contain an invalid logo URL.');
  }

  return settings;
}
