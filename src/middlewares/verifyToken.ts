import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';


const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token is missing.' });
  }

  verify(token, 'your_secret_key_here', (err: any,) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token.' });
    }

    next();
  });
};

export default verifyToken;
