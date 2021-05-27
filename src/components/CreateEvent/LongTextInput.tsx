import React, { useEffect, useState } from 'react';
import marked from 'marked';
import DOMPurify from 'dompurify';
import { EventActionInterface } from '../../types';

interface LongTextInputInterface {
    value: string;
    dispatch: React.Dispatch<EventActionInterface>;
}

export const LongTextInput = ({ value, dispatch }: LongTextInputInterface) => {
    const [markdown, setMarkdown] = useState('');

    useEffect(() => {
        const html = marked(value);
        const sanitizedHTML = DOMPurify.sanitize(html);
        setMarkdown(sanitizedHTML);
    }, [value]);

    return (
        <div>
            <div>
                <label>
                    <div>Event Details</div>
                    <textarea
                        className="h-300 resize-none rounded"
                        rows={15}
                        cols={55}
                        value={value}
                        onChange={({ target }) =>
                            dispatch({
                                type: 'updateEventDetails',
                                payload: target.value,
                            })
                        }
                    />
                </label>
            </div>
            <div className="h-300">
                <h3>Preview</h3>
                <div dangerouslySetInnerHTML={{ __html: markdown }}></div>
            </div>
        </div>
    );
};
