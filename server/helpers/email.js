import nodemailer from "nodemailer";

export const emailRegister = async (datas) => {
  const { email, name, token } = datas;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
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

export const emailForgotThePassword = async (datas) => {
  const { email, name, token } = datas;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transport.sendMail({
    from: '"UpTask - Administrador de Projetos" <contas@uptask.com>',
    to: email,
    subject: "UpTask, Recuperando sua senha",
    text: "Recuperando sua senha",
    html: `
        <p>Olá ${name} Solicitou recuperação de sua senha</p>
        <p>Siga o seguinte link para recuperar e gerar uma nova senha:</p>
            <a href="${process.env.FRONTEND_URL}/recuperar-senha/${token}">Recuperando a senha</a>
        <p>Se você não solicitou esse e-mail, pode ignorar a mensagem.</p>
    `,
  });
};
