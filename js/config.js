/**
 * Configuration for form submissions
 * Uses Vercel API functions to securely submit to Airtable
 */

export const API_ENDPOINTS = {
  // Vercel API function for contact form
  CONTACT: '/api/contact',

  // Vercel API function for newsletter
  NEWSLETTER: '/api/newsletter'
};

// Data structure that will be sent to API endpoints
export const FORM_SCHEMAS = {
  contact: {
    name: 'string',
    email: 'string',
    company: 'string',
    companyType: 'string',
    interest: 'string',
    message: 'string',
    source: 'string',
    timestamp: 'ISO string'
  },
  newsletter: {
    email: 'string',
    source: 'string',
    timestamp: 'ISO string'
  }
};