import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const TEMPLATES = {
  authorNotification: 'd-7a5ed6f5bc7c41cea3fde2674b676474',
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
        c2a_link: 'https://stage-studio.mediajams.dev/desk',
        c2a_button: 'Media Jam Studio',
        worflowState: workflowState,
        subject: `MEDIA JAM STUDIO - ${workflowState}`,
      },
    },
  ],
  from: {
    email: 'jesse@thisdot.co',
    name: 'Media Jam Notifications',
  },
  reply_to: {
    email: 'jesse@thisdot.co',
    name: 'Media Jam Notifications',
  },
  template_id: TEMPLATES[templateName],
});

export function sendNotification(data) {
  const msg = messageBuilder(data);
  return sgMail.send(msg);
}
