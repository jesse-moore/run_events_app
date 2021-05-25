import React from 'react';
import { rootState } from '../lib/redux/reducers';
import { Layout } from '../components/Common/Layout';
import { Hero } from '../components/Hero';
import { FeatureSection } from '../components/FeatureSection';
import { Feature } from '../components/Feature';

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
    );
};

// If you build and start the app, the date returned here will have the same
// value for all requests, as this method gets executed at build time.
export function getStaticProps() {
    // Note that in this case we're returning the state directly, without creating
    // the store first (like in /pages/ssr.js), this approach can be better and easier
    return {
        props: {
            initialReduxState: rootState,
        },
    };
}

export default Index;
