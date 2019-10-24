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
}

export default new PlansController();
