import React, { useEffect } from 'react';
import { UserDocument } from '../lib/generated/graphql-frontend';
import { initializeApollo } from '../lib/graphql/apollo';

interface EventsProps {
    data: { email: string; id: string } | null;
}

const Events = ({ data }: EventsProps) => {
    if (!data) return null;
    const { email } = data;
    return (
        <div>
            <div>EVENTS</div>
            <div>{email}</div>
        </div>
    );
};

export async function getStaticProps() {
    const apolloClient = initializeApollo();

    const { data } = await apolloClient.query({
        query: UserDocument,
    });
    return {
        props: {
            data: data.user,
        },
    };
}

export default Events;
