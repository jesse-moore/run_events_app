import ui, { uiInitialState } from './ui'
import user, { userInitialState } from './user'

const reducer = { ui, user }
export default reducer

const rootState = { ui: uiInitialState, user: userInitialState }
export type RootState = typeof rootState
