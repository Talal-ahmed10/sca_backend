export declare const sendEmail: ({ recipientEmail, subject, html, }: {
    recipientEmail?: string | undefined;
    subject?: string | undefined;
    html?: string | undefined;
}) => Promise<void>;
