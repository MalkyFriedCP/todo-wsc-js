import { Request, Response } from 'express'
import { getAllExamples } from './example.service'

async function getAll(req: Request, res: Response) {
    try {
        const example = await getAllExamples()
        res.send(example)
    } catch (err) {
        res.status(404).send({ err: 'Example to Error' })
    }
}
function getById() {}
function save() {}
function update() {}
function remove() {}

export { getAll, getById, save, update, remove }
