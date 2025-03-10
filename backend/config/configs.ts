import { EAppState } from '../globalTypes'

function isProduction(): boolean {
    return process.env.NODE_ENV === EAppState.PRODUCTION
}

export const config = {
    isProduction,
}
