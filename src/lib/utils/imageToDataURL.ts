interface ProcessImageResult {
    name: string;
    size: number;
    dataURL: string | null;
    src: string | null;
    error: string | null;
}

export const imageToDataURL = (
    input: File | null
): Promise<ProcessImageResult> => {
    return new Promise((resolve, reject) => {
        if (!input) reject({ error: 'Invalid input' });
        try {
            if (input) {
                if (input.size > 4000000) {
                    const fileSize = Math.round(input.size / 10000) / 100;
                    reject({
                        error: `File must be smaller than 4MB, file size is ${fileSize}MB.`,
                    });
                }
                const reader = new FileReader();
                reader.onload = function ({ target }) {
                    if (target) {
                        const result = target?.result as string;
                        resolve({
                            name: input.name,
                            size: input.size,
                            dataURL: result,
                            src: null,
                            error: null,
                        });
                    } else {
                        reject({ error: 'Could not read image file' });
                    }
                };
                reader.readAsDataURL(input);
            }
        } catch (error) {
            reject({ error: error.message });
        }
    });
};
