import express from 'express'
import { getAll, getById, save, update, remove } from './example.controller'
import { exampleMiddleware } from '../../middleware/example.middleware'

export const exampleRouter = express.Router()

exampleRouter.get('/', exampleMiddleware, getAll)
exampleRouter.get('/:id', getById)
exampleRouter.post('/', save)
exampleRouter.put('/', update)
exampleRouter.delete('/:id', remove)
