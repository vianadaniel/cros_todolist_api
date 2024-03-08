import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';


const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não encontrado ou inválido.' });
  }

  verify(token, 'your_secret_key_here', (err: any,) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido.' });
    }

    next();
  });
};

export default verifyToken;
