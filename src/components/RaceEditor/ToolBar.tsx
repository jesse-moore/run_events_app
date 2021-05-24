import React, { ReactEventHandler } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../../lib/redux/reducers';
import { Button } from '../Common/Button';

interface ToolBarProps {
    handleDiscard: ReactEventHandler<Element>;
}

export const ToolBar = ({ handleDiscard }: ToolBarProps) => {
    const { user } = useSelector((state: RootState) => state.user);
    const router = useRouter();
    return (
        <div className="py-2 px-4 bg-blueGray-200 sticky top-0 z-30">
            <div className="flex flex-row">
                <div className="mr-auto">
                    <Button type="red" name="Back" onClick={router.back} />
                </div>
                <div>
                    <Button
                        type="orange"
                        name="Discard"
                        onClick={handleDiscard}
                    />
                    <a target="_blank" href="/preview-local">
                        <Button type="blue" name="Live Preview" />
                    </a>
                    {user && <Button type="green" name="Next" />}
                </div>
            </div>
        </div>
    );
};
