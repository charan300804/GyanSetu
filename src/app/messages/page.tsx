
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Paperclip, Send } from "lucide-react";

type Contact = {
  id: string;
  name: string;
  role: string;
  avatar: string;
};

type Message = {
  from: 'me' | 'other';
  text: string;
};

type Conversations = {
  [contactId: string]: Message[];
};

const initialContacts: Contact[] = [];

const initialConversations: Conversations = {};

export default function MessagesPage() {
  const [contacts] = useState<Contact[]>(initialContacts);
  const [conversations, setConversations] = useState<Conversations>(initialConversations);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const selectedContact = contacts.find(c => c.id === selectedContactId);
  const currentMessages = selectedContactId ? conversations[selectedContactId] : [];

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContactId) return;

    const newConversations = { ...conversations };
    if (!newConversations[selectedContactId]) {
      newConversations[selectedContactId] = [];
    }
    
    newConversations[selectedContactId] = [
      ...newConversations[selectedContactId],
      { from: 'me', text: newMessage },
    ];
    setConversations(newConversations);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        handleSendMessage();
    }
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid h-[calc(100vh-10rem)] grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="col-span-1 flex flex-col">
          <CardHeader>
            <CardTitle>Contacts</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <ScrollArea className="h-full">
                {contacts.length > 0 ? (
              <div className="space-y-2 p-2">
                {contacts.map(contact => (
                  <Button
                    key={contact.id}
                    variant={selectedContactId === contact.id ? "secondary" : "ghost"}
                    className="w-full justify-start h-auto p-2"
                    onClick={() => setSelectedContactId(contact.id)}
                  >
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
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                    <p>No contacts found.</p>
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
        <Card className="col-span-1 md:col-span-2 flex flex-col">
          {selectedContact ? (
            <>
              <CardHeader className="flex flex-row items-center gap-3 border-b">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                  <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{selectedContact.name}</p>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-4 space-y-4 overflow-y-auto">
                {currentMessages.length > 0 ? currentMessages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] rounded-lg px-4 py-2 ${msg.from === 'me' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      {msg.text}
                    </div>
                  </div>
                )) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        <p>No messages yet. Start the conversation!</p>
                    </div>
                )}
              </CardContent>
              <div className="p-4 border-t">
                <div className="relative">
                  <Input
                    placeholder="Type a message..."
                    className="pr-24"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <Button variant="ghost" size="icon">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleSendMessage}>
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">Select a contact to start chatting</p>
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}
