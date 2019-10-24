import * as Yup from 'yup';
// eslint-disable-next-line import/no-unresolved
import Students from '../models/Students';

class StudentsController {
  async store(req, res) {
    // Inicio da Validation Yup
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      idade: Yup.number()
        .integer()
        .min(1)
        .required(),
      peso: Yup.number()
        .round()
        .min(1)
        .required(),
      altura: Yup.number()
        .round()
        .min(1)
        .required()
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    // End
    const studentExists = await Students.findOne({
      where: { email: req.body.email }
    });

    if (studentExists) {
      return res.status(400).json({ error: 'Estudante já cadastrado!' });
    }

    const { id, name, email, provider } = await Students.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider
    });
  }

  async update(req, res) {
    // Inicio da Validation Yup
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string()
        .email()
        .required(),
      idade: Yup.number()
        .integer()
        .min(1),
      peso: Yup.number()
        .round()
        .min(1),
      altura: Yup.number()
        .round()
        .min(1)
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    // End

    const student = await Students.findOne({
      where: { email: req.body.email }
    });

    if (!student) {
      return res.json({ error: 'Estudante não cadastrado!' });
    }
    const { id, name, idade, peso, altura, provider } = await student.update(
      req.body
    );
    return res.json({
      id,
      name,
      idade,
      peso,
      altura,
      provider
    });
    // return res.json({ error: 'Estudante não cadastrado!!' });
  }
}

export default new StudentsController();
