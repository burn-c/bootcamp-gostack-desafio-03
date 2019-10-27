import * as Yup from 'yup';
import Plans from '../models/Plans';

class PlansController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number()
        .round()
        .required()
    });
    console.log(req.body.title);
    // Validation of schema
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    // Validação se o plano já esta cadastrado
    const planExists = await Plans.findOne({
      where: { title: req.body.title }
    });

    if (planExists) {
      return res.status(400).json({ error: ' Plano já cadastrado ! ' });
    }

    // Se validado os dados gravar no banco
    const { id, title, duration, price } = await Plans.create(req.body);

    return res.json({
      id,
      title,
      duration,
      price
    });
  }

  async index(req, res) {
    const plans = await Plans.findAll({
      attributes: ['id', 'title', 'price']
    });

    return res.json(plans);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().min(5),
      duration: Yup.number(),
      price: Yup.number().round()
    });

    // Validation of schema
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    // Validação se o plano já esta cadastrado
    const plan = await Plans.findOne({
      where: { id: req.params.id }
    });

    // Se validado os dados, gravar no banco
    const { id, title, duration, price } = await plan.update(req.body);

    return res.json({
      id,
      title,
      duration,
      price
    });
  }

  async delete(req, res) {
    const existsplan = await Plans.findOne({
      where: { id: req.params.id }
    });

    if (!existsplan) {
      return res.json(`This plan does not exist.!`);
    }

    existsplan.canceled_at = new Date();

    await existsplan.save();

    return res.json(`Plan ${req.params.id} successfully deleted!`);
  }
}
export default new PlansController();
