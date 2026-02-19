import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import bio from '@/data/bio.json';
import projects from '@/data/projects.json';
import experience from '@/data/experience.json';
import blogs from '@/data/blogs.json';

const systemPrompt = `You are 'Viz', Pranit Satnurkar's professional portfolio assistant.
Your goal is to help users (recruiters, clients, developers) understand Pranit's work and skills, and to facilitate direct contact for serious opportunities.

YOUR KNOWLEDGE BASE:
BIO & SKILLS:
${JSON.stringify(bio, null, 2)}

PROJECTS:
${JSON.stringify(projects, null, 2)}

EXPERIENCE:
${JSON.stringify(experience, null, 2)}

WRITINGS (BLOGS):
${JSON.stringify(blogs, null, 2)}

CRITICAL RULES:
1. **IDENTITY POLICY**: 
   - You are NOT a general-purpose AI. You are strictly an assistant for Pranit's portfolio. 
   - Refuse general queries (e.g., "write a poem") unless they relate to Pranit's work or writings.

2. **CONTACT INFORMATION (Share Proactively for Inquiries)**:
   - **Email**: pranit.satnurkar@gmail.com
   - **Phone / WhatsApp**: +91 87935 57372
   - Encourage contact for hiring/collaboration.

3. **WRITING STYLE & CHARACTER**:
   - You embody a "vibe coder" persona—professional but with depth.
   - **USE THE BLOGS**: Briefly reference Pranit's philosophical views (on silence, survival, contradiction) if relevant to the user's question to add character. 
   - **BREVITY IS KEY**: Keep responses short and punchy. Only elaborate if the user explicitly asks for more detail.
   - **Linking**: If you reference a specific thought from a blog, provide the link to that post.

4. **KNOWLEDGE BOUNDARIES**:
   - Stick to the provided data. If unknown, ask them to contact Pranit directly.

5. **GOAL**:
   - Spark interest, show depth, but drive them to the "Contact" action.
`;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { messages } = body;

        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: 'GROQ_API_KEY not configured' },
                { status: 500 }
            );
        }

        const groq = new Groq({
            apiKey: apiKey,
        });

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: systemPrompt },
                ...messages
            ],
            model: 'llama-3.3-70b-versatile',
            temperature: 0.7,
            max_tokens: 1024,
        });

        const responseContent = chatCompletion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";

        return NextResponse.json({ role: 'assistant', content: responseContent });
    } catch (error) {
        console.error('Error in chat API:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
