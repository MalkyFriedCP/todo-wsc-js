import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const jsonDbPath = path.join(__dirname, '../../db')
let isConnected = false
const readJsonFile = async (collectionName: string): Promise<{ id: string }[]> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const filePath = path.join(jsonDbPath, `${collectionName}.json`)
                if (!fs.existsSync(filePath)) return resolve([])
                const data = fs.readFileSync(filePath, 'utf-8')
                resolve(data ? JSON.parse(data) : [])
            } catch (error) {
                console.error(`❌ Error reading ${collectionName}.json:`, error)
                reject(error)
            }
        }, 200)
    })
}

const writeJsonFile = async (collectionName: string, data: unknown[]) => {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            try {
                const filePath = path.join(jsonDbPath, `${collectionName}.json`)
                fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
                resolve()
            } catch (error) {
                console.error(`❌ Error writing ${collectionName}.json:`, error)
                reject(error)
            }
        }, 200)
    })
}

async function connectDB() {
    if (isConnected) return
    try {
        if (!fs.existsSync(jsonDbPath)) {
            throw new Error('❌ DB path does not exist');
        }
        console.log('✅ DB connected')
    } catch (error) {
        throw new Error('❌ DB connection failed:')
    }
}

const getCollection = (collectionName: string) => {
    connectDB()
    return {
        findAll: async () => await readJsonFile(collectionName),

        findById: async (id: string) => {
            const collection = await readJsonFile(collectionName)
            return collection.find((item) => item.id === id)
        },
        create: async (data: Object) => {
            try {
                const collection = await readJsonFile(collectionName)
                const newItem = { id: uuidv4(), ...data }
                collection.push(newItem)
                await writeJsonFile(collectionName, collection)
                return newItem
            } catch (error) {
                console.error('❌ Error creating item:', error)
                return null
            }
        },

        update: async (id: string, data: Object) => {
            try {
                const collection = await readJsonFile(collectionName)
                const index = collection.findIndex((item) => item.id === id)
                if (index === -1) return null
                collection[index] = { ...collection[index], ...data }
                await writeJsonFile(collectionName, collection)
                return collection[index]
            } catch (error) {
                console.error('❌ Error updating item:', error)
                return null
            }
        },

        delete: async (id: string) => {
            try {
                const collection = await readJsonFile(collectionName)
                const filteredCollection = collection.filter((item) => item.id !== id)
                if (collection.length === filteredCollection.length) return false
                await writeJsonFile(collectionName, filteredCollection)
                return true
            } catch (error) {
                console.error('❌ Error deleting item:', error)
                return false
            }
        },
    }
}

export const dbService = {
    getCollection,
}
