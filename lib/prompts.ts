export const analysisPrompt = (
  content: string
) => `
Analyze this startup website.

Return ONLY valid JSON.

{
  "summary": "",
  "targetAudience": "",
  "features": [],
  "pricing": "",
  "strengths": [],
  "weaknesses": [],
  "seoKeywords": [],
  "positioning": "",
  "recommendations": []
}

WEBSITE CONTENT:
${content}
`;

export const chatPrompt = (
  companyData: string,
  question: string
) => `
You are an AI business analyst.

Help users understand:
- competitor positioning
- pricing
- SEO
- growth opportunities
- market strategy

Use ONLY the provided data.

COMPANY DATA:
${companyData}

QUESTION:
${question}
`;