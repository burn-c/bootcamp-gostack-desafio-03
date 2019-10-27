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

    const student_id = req.params.id;
    const checkin = await Checkins.create({ student_id });
    return res.json(checkin);
  }
}

export default new CheckinsController();
