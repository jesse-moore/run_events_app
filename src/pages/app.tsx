import React from 'react'
import { Layout } from '../components/Common/Layout'

const App = () => {
    return (
        <Layout authenticatedRoute={true}>
            <div>
                <h1>APP</h1>
            </div>
        </Layout>
    )
}

export default App
