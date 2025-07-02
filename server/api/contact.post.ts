import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // Validation côté serveur
  if (!body.email || !body.subject || !body.message) {
    throw createError({
      statusCode: 400,
      statusMessage: "Champs manquants",
    });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Chez Ju Website <onboarding@resend.dev>", // Votre domaine vérifié
      to: ["chezju.boetie@gmail.com"], // Votre email de réception
      subject: `[Contact Chez Ju] ${body.subject}`,
      html: `
        <h2>Nouveau message depuis le site</h2>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Sujet:</strong> ${body.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${body.message.replace(/\n/g, "<br>")}</p>
      `,
      replyTo: body.email,
    });

    if (error) {
      throw error;
    }

    return { success: true, id: data?.id };
  } catch (error) {
    console.error("Erreur Resend:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Erreur envoi email",
    });
  }
});
