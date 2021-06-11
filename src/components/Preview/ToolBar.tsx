import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '../Common/Button';
import Link from 'next/link';
import { ButtonLink } from '../Common/ButtonLink';

export const ToolBar = () => {
    const router = useRouter();
    return (
        <div className="py-2 px-4 bg-blueGray-200 sticky top-0 z-30">
            <div className="flex flex-row justify-end">
                <div className="mr-auto">
                    <Button
                        name="Back"
                        color="red"
                        onClick={() => router.back()}
                    />
                </div>
                <div>
                    <a target="_blank" href="/preview/view">
                        <Button color="blue" name="Live Preview" />
                    </a>
                    {router.pathname.endsWith('create-event') && (
                        <Button
                            color="green"
                            name="Next"
                            type="submit"
                            form="eventForm"
                        />
                    )}
                    {router.pathname.endsWith('create-race') && (
                        <Link href="/" passHref>
                            <ButtonLink color="green" name="Home" />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};
