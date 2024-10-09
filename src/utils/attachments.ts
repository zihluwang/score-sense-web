export const getAttachmentUrl = (attachmentId: string) => {
  return `${import.meta.env.VITE_API_BASE_URL}/attachments/${attachmentId}`;
};
