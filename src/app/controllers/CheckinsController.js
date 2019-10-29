import { subDays } from 'date-fns';
import { Op } from 'sequelize';
import Checkins from '../models/Checkins';
import Students from '../models/Students';

class CheckinsController {
  async store(req, res) {
    const studentcheckin = await Students.findOne({
      where: { id: req.params.id }
    });

    if (!studentcheckin) {
      return res.json(`Unregistered student`);
    }

    // Conta quantidade de checkin máx. = 5 por semana

    const dateOld = subDays(new Date(), 7);

    const checkins = await Checkins.findAndCountAll({
      where: {
        student_id: req.params.id,
        created_at: {
          [Op.gte]: dateOld
        }
      }
    });

    if (checkins.count >= 5) {
      return res
        .status(401)
        .json({ error: 'Quantidade máxima de check-in atingida' });
    }
    const student_id = req.params.id;
    const checkin = await Checkins.create({ student_id });
    return res.json(checkin);
  }

  async index(req, res) {
    const checkins = await Checkins.findAll({
      where: { student_id: req.params.id }
    });

    return res.json(checkins);
  }
}

export default new CheckinsController();
