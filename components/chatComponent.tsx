import { Badge } from "@/components/ui/badge";
import { useChat } from 'ai/react';
import React, { useState } from 'react';
import MessageBox from "./messageBox";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { CornerDownLeft, Loader2 } from "lucide-react";

type Props = {
    reportData: string;
};

const ChatComponent = ({ reportData }: Props) => {
    const [chatMessages, setChatMessages] = useState<{ role: string, content: string }[]>([]);
    const [input, setInput] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!input.trim()) return;

        // Add the user's message to the chat
        const userMessage = { role: "user", content: input };
        setChatMessages((prev) => [...prev, userMessage]);
        setInput('');  // Clear the input after submission
        setIsLoading(true);

        try {
            
            const response = await fetch('/api/medichatgemini', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [{ role: "user", content: input }],
                    data: { reportData }
                }),
            });

            const { message } = await response.json(); 
            console.log("AI Response:", message); 

            
            const aiMessage = { role: "ai", content: message };
            setChatMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            console.error("Error fetching AI response:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='h-full bg-muted/50 relative flex flex-col min-h-[50vh] rounded-xl p-4 gap-4'>
            <Badge className={`absolute right-3 top-1.5 ${reportData && 'bg-green-600'}`} variant={"outline"}>
                {reportData ? 'Report Added' : 'No Report Added'}
            </Badge>
            <div className="flex-1"></div>
            <div className="flex flex-col gap-4">
                {chatMessages.map((m, idx) => (
                    <MessageBox key={idx} role={m.role} content={m.content} />
                ))}
            </div>
            <form className="relative overflow-hidden rounded-lg border bg-background" onSubmit={handleSubmit}>
                <Textarea
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type your query here..."
                    className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                />
                <div className="flex items-center p-3 pt-0">
                    <Button disabled={isLoading} className="ml-auto" type="submit" size={'sm'}>
                        {isLoading ? "Analyzing..." : "Ask"}
                        {isLoading ? <Loader2 className="size-3.5 animate-spin" /> : <CornerDownLeft className="size-3.5" />}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ChatComponent;
