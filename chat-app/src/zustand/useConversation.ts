import { create } from "zustand";

interface ConversationState {
  selectedConversation: any;
  setSelectedConversation: (conversation: any) => void;
  messages: any[];
  setMessages: (messages: any[]) => void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (conversation) =>
    set({ selectedConversation: conversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
