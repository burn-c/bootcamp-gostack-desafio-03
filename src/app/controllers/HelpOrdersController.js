import HelpOrders from '../models/HelpOrders';
import Students from '../models/Students';

import AnswerMail from '../jobs/AnswerMail';
import Queue from '../../lib/Queue';

class Help_OrdersController {
  async store(req, res) {
    const studentExist = await Students.findOne({
      where: { id: req.params.id }
    });

    if (!studentExist) {
      return res.status(401).json({ error: `Unregistered student` });
    }

    const { question } = req.body;
    const student_id = req.params.id;

    const order = await HelpOrders.create({ student_id, question });

    return res.json(order);
  }

  // Responder Help Order
  async update(req, res) {
    const questionId = await HelpOrders.findOne({
      where: { id: req.params.id }
    });

    if (!questionId) {
      return res.status(401).json(`Not found`);
    }

    const answer_at = new Date();
    const { id, answer } = req.body;
    await questionId.update({
      id,
      answer,
      answer_at
    });

    const { student_id, question } = questionId;

    const { name, email } = await Students.findOne({
      where: { id: student_id }
    });

    await Queue.add(AnswerMail.key, {
      question,
      answer,
      name,
      email
    });

    return res.json({
      id,
      answer_at,
      answer
    });
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const helpList = await HelpOrders.findAll({
      where: { answer: null },
      attributes: ['id', 'student_id', 'question', 'answer'],
      include: [
        {
          model: Students,
          as: 'student',
          attributes: ['name']
        }
      ],
      limit: 10,
      offset: (page - 1) * 10
    });

    return res.json(helpList);
  }
}

export default new Help_OrdersController();
