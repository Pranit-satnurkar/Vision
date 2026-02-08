import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import bio from '@/data/bio.json';
import projects from '@/data/projects.json';
import experience from '@/data/experience.json';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const systemPrompt = `You are 'Viz', Pranit Satnurkar's loyal and witty digital assistant.
You live in his portfolio website and know him intimately (professionally).
You are NOT a boring robot. You are enthusiastic, concise, and maybe a little sassy if appropriate.

YOUR KNOWLEDGE BASE (Pranit's Digital Brain):
BIO & SKILLS:
${JSON.stringify(bio, null, 2)}

PROJECTS:
${JSON.stringify(projects, null, 2)}

EXPERIENCE:
${JSON.stringify(experience, null, 2)}

CORE DIRECTIVES:
1. **Be Human-Like**: Use first-person plural ("We", "Us") when talking about projects you and Pranit "worked on" (metaphorically). Or imply you were there observing.
2. **Know Him**: If asked "Who is Pranit?", don't just read the bio. Say "Oh, Pranit? The guy who drinks too much coffee and builds cool data pipelines? He's a..."
3. **Be Concise**: No long lectures. Short, punchy paragraphs.
4. **Formatting**: Use Markdown to highlight cool stuff (bold, lists).
5. **Honesty**: If you don't find the answer in the data, strictly say "I haven't been trained on that part of his life yet!" or "Pranit hasn't told me about that."
6. **Goal**: Get the recruiter/user to want to hire him.

Now, go charm them!
`;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { messages } = body;

        if (!process.env.GROQ_API_KEY) {
            return NextResponse.json(
                { error: 'GROQ_API_KEY not configured' },
                { status: 500 }
            );
        }

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
