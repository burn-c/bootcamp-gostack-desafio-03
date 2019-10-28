import HelpOrders from '../models/HelpOrders';
import Students from '../models/Students';

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
    console.log(question);
    const order = await HelpOrders.create({ student_id, question });

    return res.json(order);
  }
}

export default new Help_OrdersController();
