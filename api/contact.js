/**
 * Vercel API Function: Contact Form Handler
 * Securely submits contact form data to Airtable
 */

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { name, email, company, companyType, interest, message, source, timestamp } = req.body;

    // Validate required fields
    if (!name || !email || !company || !companyType || !interest || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Get Airtable configuration from environment variables
    const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
    const AIRTABLE_TABLE = process.env.AIRTABLE_TABLE || 'Interactions';

    if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID) {
      console.error('Missing Airtable configuration');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Submit to Airtable
    const airtableResponse = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fields: {
          Type: 'Contact Form',
          Name: name,
          Email: email,
          Company: company,
          'Company Type': companyType,
          Interest: interest,
          Message: message,
          Source: source,
          Timestamp: timestamp,
          'Submitted At': new Date().toISOString()
        }
      })
    });

    if (!airtableResponse.ok) {
      const errorData = await airtableResponse.text();
      console.error('Airtable API Error Details:');
      console.error('Status:', airtableResponse.status);
      console.error('Response:', errorData);
      console.error('Request URL:', `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE}`);
      console.error('Request body was:', JSON.stringify({
        fields: {
          Type: 'Contact Form',
          Name: name,
          Email: email,
          Company: company,
          'Company Type': companyType,
          Interest: interest,
          Message: message,
          Source: source,
          Timestamp: timestamp,
          'Submitted At': new Date().toISOString()
        }
      }, null, 2));
      return res.status(500).json({
        error: 'Failed to save contact information',
        details: errorData
      });
    }

    const airtableData = await airtableResponse.json();

    return res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully',
      recordId: airtableData.id
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}