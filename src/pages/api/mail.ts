import type { NextApiRequest, NextApiResponse } from 'next';
import { MailTrapProvider } from './providers/mailtrap.provider';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const provider = new MailTrapProvider();

  if (req.method === 'POST') {
    const { body } = req;
    try {
      await provider.sendMail(body);
      res.status(204).send({});
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(405).json({ msg: 'Method not allowed' });
  }
};
