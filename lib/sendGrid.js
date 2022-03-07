import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const TEMPLATES = {
  authorNotification: process.env.SENDGRID_TEMPLATE_KEY,
};

const messageBuilder = ({
  authorEmail,
  authorName,
  workflowState,
  moderators = [],
  templateName,
  title,
}) => ({
  personalizations: [
    {
      to: [
        {
          email: authorEmail,
          name: authorName,
        },
      ],
      bcc: moderators,
      dynamic_template_data: {
        header: `Jam Status ${workflowState}`,
        text: `Hey ${authorName} the jam '${title}' status has been updated to ${workflowState}.`,
        c2a_link: 'https://studio.mediajams.dev/desk',
        c2a_button: 'Media Jam Studio',
        worflowState: workflowState,
        subject: `MEDIA JAM STUDIO - ${workflowState}`,
      },
    },
  ],
  from: {
    email: 'info@mediajams.dev',
    name: 'Media Jam Notifications',
  },
  reply_to: {
    email: 'info@mediajams.dev',
    name: 'Media Jam Notifications',
  },
  template_id: TEMPLATES[templateName],
});

export function sendNotification(data) {
  const msg = messageBuilder(data);
  return sgMail.send(msg);
}
