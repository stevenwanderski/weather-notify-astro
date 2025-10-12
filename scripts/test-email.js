import 'dotenv/config';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const { data, error } = await resend.emails.send({
  from: 'Sky Brief <hello@skybrief.app>',
  to: ['steven.wanderski@gmail.com'],
  subject: 'Hullo there.',
  html: '<p>Hi everybody.</p>'
});