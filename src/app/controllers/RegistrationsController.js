import * as Yup from 'yup';
import Students from '../models/Students';
import Plans from '../models/Plans';
import Registrations from '../models/Registrations';

class RegistrationController {
  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
      price: Yup.number().round()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { student_id, plan_id, start_date, end_date, price } = req.body;

    // Verifica se o student_id é valido
    const validStudent = await Students.findOne({
      where: { id: student_id }
    });

    if (!validStudent) {
      return res.status(401).json({
        error: 'Student not registered!'
      });
    }

    // Verifica se o plan_id é valido
    const validPlan = await Plans.findOne({
      where: { id: plan_id }
    });

    if (!validPlan) {
      return res.status(401).json({
        error: 'Plan not registered!'
      });
    }
    const registration = await Registrations.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price
    });

    return res.json(registration);
  }

  async index(req, res) {
    const registrations = await Registrations.findAll({
      attributes: ['id', 'student_id', 'plan_id', 'price', 'canceled_at']
    });

    return res.json(registrations);
  }
}

export default new RegistrationController();
