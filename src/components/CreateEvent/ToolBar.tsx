import React, { ReactEventHandler } from 'react';
import { useRouter } from 'next/router';
import { Button } from '../Common/Button';
import Link from 'next/link';
import { ButtonLink } from '../Common/ButtonLink';

interface ToolBarProps {
    handleDiscard: ReactEventHandler<Element>;
}

export const ToolBar = ({ handleDiscard }: ToolBarProps) => {
    const router = useRouter();
    return (
        <div className="py-2 px-4 bg-blueGray-200 sticky top-0 z-30">
            <div className="flex flex-row">
                <div className="mr-auto">
                    <Button color="red" name="Back" onClick={router.back} />
                </div>
                <div>
                    <Button
                        color="orange"
                        name="Discard"
                        onClick={handleDiscard}
                    />
                    <a target="_blank" href="/preview-local">
                        <Button color="blue" name="Live Preview" />
                    </a>
                    <Link href="/editor/race">
                        <ButtonLink color="green" name="Next" />
                    </Link>
                </div>
            </div>
        </div>
    );
};
