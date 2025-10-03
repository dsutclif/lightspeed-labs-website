/**
 * Configuration for form submissions
 * Replace these URLs with your actual Zapier webhook URLs
 */

export const WEBHOOKS = {
  // Replace with your Zapier webhook URL for contact form
  CONTACT: 'ZAPIER_CONTACT_WEBHOOK_URL',

  // Replace with your Zapier webhook URL for newsletter
  NEWSLETTER: 'ZAPIER_NEWSLETTER_WEBHOOK_URL'
};

// Data structure that will be sent to webhooks
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