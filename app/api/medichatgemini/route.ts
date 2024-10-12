import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
});

const promptTemplate = (reportData: string, userQuestion: string) => `
Patient medical report says: 
${reportData}

Question: ${userQuestion}

## Response:
`;

export async function POST(req: Request, res: Response) {
    const { messages, data } = await req.json();
    console.log("Messages:", messages);
    console.log("Report Data:", data.reportData);

    const userQuestion = messages[messages.length - 1].content;
    console.log("User Question:", userQuestion);

    const reportData = data.reportData;
    const prompt = promptTemplate(reportData, userQuestion);

    const generatedContent = await model.generateContent([prompt]);
    console.log("Generated Content:", generatedContent);

    const aiResponse = generatedContent.response.candidates![0].content.parts[0].text;
    console.log("AI Response:", aiResponse);

    return new Response(JSON.stringify({ message: aiResponse }), { status: 200 });
}

