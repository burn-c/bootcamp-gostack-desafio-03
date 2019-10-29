import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { name, email, title, start_date, end_date, price } = data;

    console.log(`A REGISTRATION fila executou!!!`);
    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: `Matrícula Concluída!!!`,
      template: 'registration',
      context: {
        student: name,
        plan: title,
        start_date,
        end_date,
        price
      }
    });
  }
}

export default new RegistrationMail();
