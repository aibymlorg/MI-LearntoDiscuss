import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { provider, messages, apiKey, contextMessage, ollamaUrl, ollamaModel } = await request.json();

  try {
    let response: Response;
    let result;

    switch (provider) {
      case 'openai':
        response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4',
            messages: [
              ...messages.slice(-10),
              { role: 'user', content: contextMessage }
            ],
            max_tokens: 1000,
            temperature: 0.7
          })
        });

        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`OpenAI API error: ${response.statusText} - ${errorData}`);
        }

        result = await response.json();
        return NextResponse.json({
          content: result.choices[0].message.content
        });

      case 'anthropic':
        response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 1000,
            messages: [
              ...messages.slice(-10).map((msg: { role: string; content: string }) => ({
                role: msg.role === 'assistant' ? 'assistant' : 'user',
                content: msg.content
              })),
              { role: 'user', content: contextMessage }
            ]
          })
        });

        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Anthropic API error: ${response.statusText} - ${errorData}`);
        }

        result = await response.json();
        return NextResponse.json({
          content: result.content[0].text
        });

      case 'gemini':
        response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: contextMessage
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1000
            }
          })
        });

        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Gemini API error: ${response.statusText} - ${errorData}`);
        }

        result = await response.json();
        return NextResponse.json({
          content: result.candidates[0].content.parts[0].text
        });

      case 'ollama':
        response = await fetch(`${ollamaUrl}/api/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: ollamaModel || 'llama3.3:latest',
            messages: [
              ...messages.slice(-10),
              { role: 'user', content: contextMessage }
            ],
            stream: false
          })
        });

        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Ollama API error: ${response.statusText} - ${errorData}`);
        }

        result = await response.json();
        return NextResponse.json({
          content: result.message.content
        });

      case 'ollamaCloud':
        response = await fetch(`${ollamaUrl}/api/chat`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: ollamaModel || 'llama3.3:latest',
            messages: [
              ...messages.slice(-10),
              { role: 'user', content: contextMessage }
            ],
            stream: false
          })
        });

        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Ollama Cloud API error: ${response.statusText} - ${errorData}`);
        }

        result = await response.json();
        return NextResponse.json({
          content: result.message.content
        });

      case 'claude':
        // Claude is same as Anthropic
        response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 1000,
            messages: [
              ...messages.slice(-10).map((msg: { role: string; content: string }) => ({
                role: msg.role === 'assistant' ? 'assistant' : 'user',
                content: msg.content
              })),
              { role: 'user', content: contextMessage }
            ]
          })
        });

        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Claude API error: ${response.statusText} - ${errorData}`);
        }

        result = await response.json();
        return NextResponse.json({
          content: result.content[0].text
        });

      default:
        return NextResponse.json({ error: `Unsupported provider: ${provider}` }, { status: 400 });
    }
  } catch (error: unknown) {
    console.error('API Route Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
