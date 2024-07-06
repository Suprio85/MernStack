import jwt from 'jsonwebtoken';
import express from 'express';

export const generateToken = (res,id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })

    res.cookie('jwt', token, {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure : process.env.NODE_ENV === 'production' ? true : false
    });
}