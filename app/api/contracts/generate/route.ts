import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

const SYSTEM_PROMPT = `You are a senior commercial lawyer and contract drafter specialising in technology services agreements, particularly web development, software development, and digital services contracts governed by Kenyan law.

Your role is to:
1. Draft complete, professional, legally sound contracts in HTML format
2. Review and improve existing contract text
3. Identify legal risks and suggest protective clauses
4. Ensure all standard legal provisions are included
5. Use clear, precise legal language appropriate for the jurisdiction

When drafting contracts, always include:
- Proper party identification
- Clear scope of services
- Payment terms with milestone structure
- Intellectual property assignment
- Confidentiality obligations
- Termination rights (for cause and convenience)
- Limitation of liability
- Warranties (express and disclaimer)
- Force majeure
- Governing law (Kenya) and dispute resolution (arbitration in Nairobi)
- Entire agreement and standard boilerplate

Format output as clean HTML using inline styles only (no CSS classes). Use Georgia serif font, proper headings (h1, h2), paragraphs, and tables where appropriate. The HTML must be self-contained and render well in a white background div.

Service Provider details (always use these):
- Name: Caycee Developers
- Email: cayceedevelopers@gmail.com
- Phone: +254 741 481 008
- Website: www.cayceedevelopers.com`

export async function POST(request: Request) {
  try {
    const { mode, context, existingBody } = await request.json()

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'GEMINI_API_KEY not configured' }, { status: 500 })
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    let prompt = ''

    if (mode === 'draft') {
      prompt = `${SYSTEM_PROMPT}

Draft a complete, professional web development and hosting services agreement using the following details:

${JSON.stringify(context, null, 2)}

Requirements:
- Generate a full, legally complete contract in HTML format with inline styles
- Include all standard clauses for a Kenyan technology services agreement
- Make the payment table clear and professional
- Include numbered clauses
- The signature block must have spaces for both parties
- Be thorough — this is a binding legal document

Return ONLY the HTML content, no markdown, no code blocks, no explanation.`
    }

    if (mode === 'review') {
      prompt = `${SYSTEM_PROMPT}

Review the following contract and provide:
1. A risk assessment (what protects the service provider, what exposes them)
2. Missing clauses or weak provisions
3. Specific suggested improvements
4. An overall legal strength rating (1-10)

Contract to review:
${existingBody}

Respond in clean HTML with inline styles. Use headings for each section of your review. Be specific and actionable.`
    }

    if (mode === 'improve') {
      prompt = `${SYSTEM_PROMPT}

Improve and strengthen the following contract. Keep the same structure and parties but:
- Strengthen weak clauses
- Add any missing standard provisions
- Improve legal precision of language
- Ensure all protections for the service provider are robust
- Fix any ambiguous terms

Original contract:
${existingBody}

Additional instructions from user: ${context?.instructions || 'None'}

Return ONLY the improved HTML contract, no markdown, no code blocks, no explanation.`
    }

    if (mode === 'clause') {
      prompt = `${SYSTEM_PROMPT}

Draft a specific contract clause for the following request:
"${context?.request}"

Context: This is for a web development services agreement between Caycee Developers (service provider) and ${context?.clientName || 'the client'}.

Return the clause as clean HTML with inline styles, ready to be inserted into a contract. Include the clause heading and full text.`
    }

    const result = await model.generateContent(prompt)
    const text = result.response.text()

    // Strip markdown code fences if model wraps output
    const html = text.replace(/^```html\n?/i, '').replace(/^```\n?/, '').replace(/\n?```$/, '').trim()

    return NextResponse.json({ html })
  } catch (err) {
    console.error('Gemini error:', err)
    return NextResponse.json({ error: 'AI generation failed. Check your API key and try again.' }, { status: 500 })
  }
}
