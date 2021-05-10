import React from 'react'
import { Layout } from '../components/Layout'

const Create_event = () => {
    return (
        <Layout redirectAuthenticated={'/app'}>
            <div>
                <h1>Create Event</h1>
            </div>
        </Layout>
    )
}

export default Create_event
