import { createFileRoute } from "@tanstack/react-router";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText, type ModelMessage } from "ai";
import { z } from "zod";

const Body = z.object({
  year: z.string().max(40),
  names: z.object({ me: z.string().max(60), her: z.string().max(60) }),
  memories: z.string().min(1).max(6000),
  photos: z.array(z.string().max(900_000)).max(4),
});

const SYSTEM = `You write one chapter of a romantic anniversary storybook, from the boyfriend to his girlfriend, in first person ("I", "you").
Use only the memories given (and what is visible in any photos) — never invent names, places or events. Warm, tender, specific, not cheesy.
Reply in exactly this format, nothing else:
TITLE: <2-5 word chapter title>
STORY: <3-5 sentences, under 90 words>
CAPTION: <under 8 words, lowercase, for the highlight photo>
QUESTION: <one sweet, playful question for her to answer>`;

export const Route = createFileRoute("/api/write-chapter")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const parsed = Body.safeParse(await request.json().catch(() => null));
        if (!parsed.success) return new Response("Please add some memories first.", { status: 400 });
        const { year, names, memories, photos } = parsed.data;
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return new Response("AI is not configured.", { status: 500 });

        const provider = createOpenAI({
          baseURL: "https://ai.gateway.lovable.dev/v1",
          apiKey,
          headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
        });
        const messages: ModelMessage[] = [
          {
            role: "user",
            content: [
              { type: "text", text: `${year}. I am ${names.me}, she is ${names.her}.\nMemories:\n${memories}` },
              ...photos.map((p) => ({ type: "image" as const, image: p })),
            ],
          },
        ];
        const result = streamText({
          model: provider.responses("openai/gpt-6-astra"),
          system: SYSTEM,
          messages,
          abortSignal: request.signal,
          providerOptions: {
            openai: {
              forceReasoning: true,
              reasoningEffort: "low",
              reasoningSummary: "auto",
              store: false,
              include: ["reasoning.encrypted_content"],
            },
          },
        });
        try {
          const text = await result.text;
          return new Response(text, { headers: { "content-type": "text/plain; charset=utf-8" } });
        } catch (e) {
          const status = (e as { statusCode?: number }).statusCode;
          const msg =
            status === 429 ? "Too many requests — try again in a minute."
            : status === 402 ? "AI credits have run out for this workspace."
            : "Couldn't write the chapter right now. Please try again.";
          return new Response(msg, { status: status && status >= 400 ? status : 500 });
        }
      },
    },
  },
});
