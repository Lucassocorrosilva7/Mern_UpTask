import nodemailer from "nodemailer";

export const emailRegister = async (datas) => {
  const { email, name, token } = datas;

  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "8f0cc637e4d01e",
      pass: "ee6f866d7cab26",
    },
  });

  const info = await transport.sendMail({
    from: '"UpTask - Administrador de Projetos" <contas@uptask.com>',
    to: email,
    subject: "UpTask, confirmar sua conta",
    text: "Comprovar sua conta em UpTask",
    html: `
        <p>Olá ${name} comprove sua conta em UpTask</p>
        <p>Sua conta está quase pronta. você só tem que verifica-lo no seguinte link:</p>
            <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Compravar sua conta</a>
        <p>Se você não criou essa conta, pode ignorar a mensagem.</p>
    `,
  });
};
