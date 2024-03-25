import React from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import "./chatbot.css"

const currentUser = { id: 1, name: "Jon" };

export function ChatbotPage() {
  return (
    <div className="chatbot-page">
      <ChatBot user={currentUser} />
    </div>
  )
}

interface User {
  id: number,
  name: string
}

interface ChatMessage {
  userId: number,
  content: string
}

function ChatBot({ user }: { user: User }) {
  const [isOpen, setOpen] = React.useState(false);
  const buttonRef = React.useRef(null);
  const windowRef = React.useRef(null);
  const nodeRef = isOpen ? windowRef : buttonRef;

  return (
    <>
      <div className='chatbot'>
        <SwitchTransition>
          <CSSTransition
            in={true}
            key={isOpen ? "window" : "button"}
            nodeRef={nodeRef}
            timeout={300}
            classNames='chat'
          >
            {isOpen ? <ChatWindow ref={windowRef} user={user} onClose={() => setOpen(false)} /> : <ChatButton ref={buttonRef} onClick={() => setOpen(true)} />}
          </CSSTransition>
        </SwitchTransition>
      </div>
    </>
  );
}

const ChatButton = React.forwardRef<HTMLButtonElement, { onClick: () => void }>(({ onClick }, ref) => {
  return <button ref={ref} className='chatbot-button' onClick={onClick}>{"Chat bot"}</button>;
})

const ChatWindow = React.forwardRef<HTMLDivElement, { user: User, onClose: () => void }>(({ user, onClose }, ref) => {
  const { messages, sendMessage } = useCurrentChatMessages(user);

  return (
    <div ref={ref} className='chat-window'>
      <div className='scroll-container'>
        <div className='messages'>
          {messages.map((message, index) => <Message key={index} currentUserId={user.id} message={message} />)}
        </div>
      </div>
      <button className='close-button' onClick={onClose}>{"close"}</button>
      <NewMessageInput sendMessage={sendMessage} />
    </div>
  );
});

function Message({ currentUserId, message }: { currentUserId: number, message: ChatMessage }) {
  const className = message.userId === currentUserId ? "outgoing" : "incoming";

  return (
    <div className={`message-container ${className}`}>
      <div className={`message ${className}`}>{message.content}</div>
    </div>
  );
}

function NewMessageInput({ sendMessage }: { sendMessage: (content: string) => void }) {
  const [currentMessage, setCurrentMessage] = React.useState<string>("");

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentMessage.length) {
      sendMessage(currentMessage);
      setCurrentMessage("");
    }
  };

  return (
    <input autoFocus={true} className='new-message' onChange={(e) => setCurrentMessage(e.target.value)}
      value={currentMessage}
      onKeyDown={handleKeyDown}>
    </input>
  );
}

const chatBotUserId = 10;

function useCurrentChatMessages(user: User) {
  const timerRef = React.useRef<any>();
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);

  const sendMessage = (content: string) => {
    setMessages(prevMessages => [...prevMessages, { userId: user.id, content }]);
    const timerId = setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, { userId: chatBotUserId, content: `Hey! Good quesion ${prevMessages.length}...` }]);
    }, 1000);
    timerRef.current = timerId;
  }

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    }
  }, []);

  return {
    messages,
    sendMessage
  }
}