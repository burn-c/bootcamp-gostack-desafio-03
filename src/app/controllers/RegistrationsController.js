import * as Yup from 'yup';
import { addMonths } from 'date-fns';
import Students from '../models/Students';
import Plans from '../models/Plans';
import Registrations from '../models/Registrations';

class RegistrationController {
  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { student_id, plan_id, start_date } = req.body;

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
      where: { id: plan_id, canceled_at: null }
    });

    if (!validPlan) {
      return res.status(401).json({
        error: 'Plan not registered or canceled!'
      });
    }

    const numMonths = await Plans.findByPk(req.body.plan_id);
    const { duration } = numMonths;
    const priceMonth = numMonths.price;
    const price = duration * priceMonth;

    const end_date = addMonths(new Date(start_date), duration);

    const registration = await Registrations.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price
    });

    return res.json(registration);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // Verifica se o student_id é valido
    const validStudent = await Students.findOne({
      where: { id: req.body.student_id }
    });

    if (!validStudent) {
      return res.status(401).json({
        error: 'Student not registered!'
      });
    }
    // Verifica se o plan_id é valido
    const validPlan = await Plans.findOne({
      where: { id: req.body.plan_id, canceled_at: null }
    });

    if (!validPlan) {
      return res.status(401).json({
        error: 'Plan not registered or canceled!'
      });
    }

    const registration = await Registrations.findOne({
      where: { id: req.params.id }
    });

    const numMonths = await Plans.findByPk(req.body.plan_id);
    const { duration } = numMonths;
    const priceMonth = numMonths.price;
    const price = duration * priceMonth;
    const end_date = addMonths(new Date(req.body.start_date), duration);

    const { id, student_id, plan_id, start_date } = req.body;
    await registration.update({
      id,
      student_id,
      plan_id,
      price,
      start_date,
      end_date
    });

    return res.json({ id, student_id, plan_id, start_date, end_date, price });
  }

  async index(req, res) {
    const registrations = await Registrations.findAll({
      attributes: ['id', 'student_id', 'plan_id', 'price', 'canceled_at']
    });

    return res.json(registrations);
  }

  async delete(req, res) {
    const registrationDel = await Registrations.findByPk(req.params.id);

    registrationDel.canceled_at = new Date();

    await registrationDel.save();

    return res.json(registrationDel);
  }
}

export default new RegistrationController();
