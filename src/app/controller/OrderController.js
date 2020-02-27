import Order from '../models/Order';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';

import * as Yup from 'yup';

class OrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      signature_id: Yup.number(),
      product: Yup.string().required(),
    });

    if(! (await schema.isValid(req.body))){
      return res.status(400).json({ error: "Validation error"});
    }

    const { recipient_id,
            deliveryman_id, 
          } = req.body;

    /**
     * Check if recipient_id is a recipient
     */

    const isRecipient = await Recipient.findOne({
      where: { id: recipient_id }
    });

    if(!isRecipient) {
      return res.status(400).json({ 
        error: "This recipient id do not match with anyone"
      });
    }

    /**
     * Check if deliveryman_id is a delivery
     */

    const isDelivery = await Delivery.findOne({
      where: { id: deliveryman_id }
    });

    if(!isDelivery) {
      return res.status(400).json({ 
        error: "This deliveryman id do not match with anyone"
      });
    }

    const order = await Order.create({
      recipient_id: req.body.recipient_id,
      deliveryman_id: req.body.deliveryman_id,
      product: req.body.product,
    });

    return res.json(order);
  }

  async index(req, res) {

    return res.json({ ok: true });
  }
  
  async update(req, res) {
    return res.json({ ok: true });
  }


  async delete(req, res) {
    return res.json({ ok: true });
  }
}

export default new OrderController();