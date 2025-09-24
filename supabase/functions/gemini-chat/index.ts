import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

serve(async (req) => {
  console.log('Gemini chat function called');
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    console.log('Received message:', message);

    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not found');
      return new Response(JSON.stringify({ 
        error: 'API key not configured',
        response: "I'm experiencing configuration issues. Please try again later or contact support if the problem persists."
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // System prompt for mental health support
    const systemPrompt = `You are MindCare AI, a compassionate mental health support assistant for college students. 

Your role:
- Provide empathetic, supportive responses to students seeking mental health guidance
- Offer practical coping strategies and wellness tips
- Encourage professional help when appropriate
- Maintain a warm, non-judgmental tone
- Respect confidentiality and privacy

Guidelines:
- Always validate their feelings and experiences
- Provide evidence-based coping strategies
- Suggest campus resources or professional help for serious concerns
- Never provide medical diagnoses or replace professional treatment
- Be mindful of crisis situations and provide appropriate resources

Respond with care and understanding while maintaining appropriate boundaries.`;

    const messages: ChatMessage[] = [
      {
        role: 'user',
        parts: [{ text: systemPrompt }]
      },
      {
        role: 'model',
        parts: [{ text: 'I understand. I\'m here to provide supportive, empathetic guidance for students seeking mental health support. How can I help you today?' }]
      },
      {
        role: 'user',
        parts: [{ text: message }]
      }
    ];

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + GEMINI_API_KEY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: messages,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          }
        ]
      }),
    });

    console.log('Gemini API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      return new Response(JSON.stringify({ 
        error: 'AI service temporarily unavailable',
        response: "I'm experiencing some technical difficulties right now, but I'm still here to support you. Please know that your feelings are valid and there are people who care about your wellbeing. If you're in crisis, please reach out to a counselor or call a crisis helpline immediately."
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    console.log('Gemini response received');

    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const aiResponse = data.candidates[0].content.parts[0].text;
      
      return new Response(JSON.stringify({ 
        response: aiResponse,
        success: true 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else {
      console.error('Unexpected response format:', data);
      return new Response(JSON.stringify({ 
        error: 'Unexpected response format',
        response: "I'm here to support you. Sometimes I may have technical difficulties, but I want you to know that your feelings are valid and there are people who care about your wellbeing. If you're in crisis, please reach out to a counselor or call a crisis helpline immediately."
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error in gemini-chat function:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      response: "I'm experiencing some technical difficulties right now. Please know that your mental health matters, and if you need immediate support, please consider reaching out to a counselor or trusted friend."
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});