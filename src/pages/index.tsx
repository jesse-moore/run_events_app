import React from 'react'
import { Layout } from '../components/Common/Layout'
import { Hero } from '../components/Hero'
import { FeatureSection } from '../components/FeatureSection'
import { Feature } from '../components/Feature'

const Index = () => {
    return (
        <Layout>
            <div className="relative">
                <Hero />
                <FeatureSection>
                    <Feature>App Feature</Feature>
                    <Feature>App Feature</Feature>
                    <Feature>App Feature</Feature>
                    <Feature>App Feature</Feature>
                </FeatureSection>
            </div>
        </Layout>
    )
}

export default Index
