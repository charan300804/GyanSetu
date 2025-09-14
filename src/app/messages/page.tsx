import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Paperclip, Send } from "lucide-react";

export default function MessagesPage() {
    const contacts = [
        { id: '1', name: 'Principal', role: 'GyanSetu School', avatar: 'https://picsum.photos/seed/principal/100/100' },
        { id: '2', name: 'Parent of Ravi Kumar', role: 'Parent/Guardian', avatar: 'https://picsum.photos/seed/parent/100/100' },
        { id: '3', name: 'Mr. Sharma', role: 'Class Teacher, 10A', avatar: 'https://picsum.photos/seed/teacher/100/100' },
        { id: '4', name: 'Ms. Gupta', role: 'Science Faculty', avatar: 'https://picsum.photos/seed/faculty1/100/100' },
    ];

    const messages = [
        { from: 'other', text: 'Hello! I wanted to discuss Ravi\'s progress in Science.' },
        { from: 'me', text: 'Of course. He is doing well, but I have a few suggestions.' },
        { from: 'other', text: 'That would be great. Please let me know.' },
    ];

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
       <div className="grid h-[calc(100vh-10rem)] grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="col-span-1 flex flex-col">
            <CardHeader>
                <CardTitle>Contacts</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0">
                <ScrollArea className="h-full">
                <div className="space-y-2 p-2">
                    {contacts.map(contact => (
                    <Button key={contact.id} variant="ghost" className="w-full justify-start h-auto p-2">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={contact.avatar} alt={contact.name} />
                                <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold text-left">{contact.name}</p>
                                <p className="text-xs text-muted-foreground">{contact.role}</p>
                            </div>
                        </div>
                    </Button>
                    ))}
                </div>
                </ScrollArea>
            </CardContent>
        </Card>
        <Card className="col-span-1 md:col-span-2 flex flex-col">
             <CardHeader className="flex flex-row items-center gap-3 border-b">
                 <Avatar className="h-10 w-10">
                    <AvatarImage src="https://picsum.photos/seed/parent/100/100" alt="Parent" />
                    <AvatarFallback>P</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold">Parent of Ravi Kumar</p>
                    <p className="text-xs text-muted-foreground">Online</p>
                </div>
             </CardHeader>
            <CardContent className="flex-1 p-4 space-y-4 overflow-y-auto">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] rounded-lg px-4 py-2 ${msg.from === 'me' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
            </CardContent>
            <div className="p-4 border-t">
                <div className="relative">
                    <Input placeholder="Type a message..." className="pr-24"/>
                    <div className="absolute inset-y-0 right-0 flex items-center">
                        <Button variant="ghost" size="icon">
                            <Paperclip className="h-5 w-5"/>
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Send className="h-5 w-5"/>
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
       </div>
    </main>
  );
}