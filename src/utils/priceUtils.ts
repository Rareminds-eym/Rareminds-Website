/**
 * Utility functions for handling price parsing and formatting
 */

/**
 * Parse price string to number, handling various formats
 * @param priceString - The price string from database (e.g., "₹500", "FREE", "100", "₹1,500")
 * @returns Parsed price as number, 0 for free events
 */
export function parsePrice(priceString: string | null | undefined): number {
  if (!priceString) return 0;
  
  // Convert to uppercase for case-insensitive comparison
  const upperPrice = priceString.toString().toUpperCase();
  
  // Handle free events
  if (upperPrice === 'FREE' || upperPrice === 'FREE EVENT' || upperPrice === '0') {
    return 0;
  }
  
  // Remove currency symbols and commas, extract numbers
  const numericString = priceString.replace(/[₹$€£¥,\s]/g, '');
  
  // Parse the cleaned string
  const parsed = parseFloat(numericString);
  
  // Return 0 if parsing failed (NaN)
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Format price for display
 * @param price - Price as number
 * @param currency - Currency symbol (default: ₹)
 * @returns Formatted price string
 */
export function formatPrice(price: number, currency: string = '₹'): string {
  if (price === 0) return 'FREE';
  return `${currency}${price.toLocaleString('en-IN')}`;
}