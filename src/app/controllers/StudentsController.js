import * as Yup from 'yup';
// eslint-disable-next-line import/no-unresolved
import { Op } from 'sequelize';
import Students from '../models/Students';
import HelpOrders from '../models/HelpOrders';

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
      return res.status(400).json({ error: 'Estudante não cadastrado!' });
    }
    console.log(req.body);
    const { name, idade, peso, altura, provider } = await student.update(
      req.body
    );

    return res.json({
      name,
      idade,
      peso,
      altura,
      provider
    });
    // return res.json({ error: 'Estudante não cadastrado!!' });
  }

  async index(req, res) {
    // SE ENVIAR O ID DO STUDENT,ELE BUSCA "HelpOrders" EXISTENTES
    if (req.params.id) {
      const listStudent = await HelpOrders.findAll({
        where: { student_id: req.params.id }
      });
      return res.json(listStudent);
    }

    const searchName = req.query.q;
    const { page = 1 } = req.query;

    // BUSCA A LISTAGEM DE TODOS STUDENTS E RETIRA DA LISTAGEM TODOS STUDENTS DELETADOS
    const nameStudent = await Students.findAll({
      where: { name: { [Op.iLike]: `${searchName}%` }, deleted_at: null },
      limit: 10,
      offset: page - 1
    });

    return res.json(nameStudent);
  }

  async edit(req, res) {
    const response = await Students.findOne({
      where: { id: req.params.id }
    });

    return res.json(response);
  }

  async delete(req, res) {
    const existStudent = await Students.findOne({
      where: { id: req.params.id }
    });

    if (!existStudent) {
      return res.json(`This student  does not exist!`);
    }

    existStudent.deleted_at = new Date();

    await existStudent.save();

    return res.json(`Student ${req.params.id} successfully deleted!`);
  }
}

export default new StudentsController();
