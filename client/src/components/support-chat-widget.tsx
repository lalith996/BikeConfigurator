import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";

export function SupportChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ text: string; sender: "user" | "support" }>>([
    {
      text: "Hi! How can we help you with your custom bike build today?",
      sender: "support",
    },
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { text: message, sender: "user" }]);
    setMessage("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "Thanks for your message! Our team will get back to you shortly. In the meantime, check out our FAQ section for common questions.",
          sender: "support",
        },
      ]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] shadow-2xl border-border z-50">
          <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground">
            <CardTitle className="text-lg font-heading">Support Chat</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 hover:bg-primary-foreground/20"
              onClick={() => setIsOpen(false)}
              data-testid="button-close-chat"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-3 bg-background">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex",
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-4 py-2 text-sm",
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    )}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  data-testid="input-chat-message"
                />
                <Button
                  size="icon"
                  onClick={handleSendMessage}
                  className="bg-trail hover:bg-trail"
                  data-testid="button-send-message"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Toggle Button */}
      <Button
        size="icon"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl bg-trail hover:bg-trail text-trail-foreground z-50"
        onClick={() => setIsOpen(!isOpen)}
        data-testid="button-toggle-chat"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </>
  );
}
