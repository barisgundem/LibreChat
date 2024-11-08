import { atom, selector, atomFamily } from 'recoil';
import { TConversation, TMessagesAtom, TMessage, TAttachment } from 'librechat-data-provider';
import { buildTree } from '~/utils';

const conversation = atom<TConversation | null>({
  key: 'conversation',
  default: null,
});
const activeChatIndexAtom = atom<number>({
  key: 'activeChatIndex', // unique ID (with respect to other atoms/selectors)
  default: 0, // default value
});

// current messages of the conversation, must be an array
// sample structure
// [{text, sender, messageId, parentMessageId, isCreatedByUser}]
const messages = atom<TMessagesAtom>({
  key: 'messages',
  default: [],
});

const messagesTree = selector({
  key: 'messagesTree',
  get: ({ get }) => {
    return buildTree({ messages: get(messages) });
  },
});

const messageAttachmentsMap = atom<Record<string, TAttachment[] | undefined>>({
  key: 'messageAttachmentsMap',
  default: {},
});

const latestMessage = atom<TMessage | null>({
  key: 'latestMessage',
  default: null,
});

const messagesSiblingIdxFamily = atomFamily<number, string | null | undefined>({
  key: 'messagesSiblingIdx',
  default: 0,
});

export default {
  messages,
  conversation,
  messagesTree,
  latestMessage,
  messageAttachmentsMap,
  messagesSiblingIdxFamily,
  activeChatIndexAtom
};
