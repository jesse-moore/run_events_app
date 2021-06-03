import DOMPurify from 'dompurify';
import Markdown from 'markdown-to-jsx';
import React from 'react';
import { EditButton } from './EditButton';

interface ViewEventDescription {
    description: string;
    editClickHandler: React.MouseEventHandler;
}

export const ViewEventDescription = ({
    description,
    editClickHandler,
}: ViewEventDescription) => {
    const descriptionSanitized = DOMPurify.sanitize(description);
    return (
        <div>
            <Markdown children={descriptionSanitized} />
            <EditButton onClick={editClickHandler} />
        </div>
    );
};
