interface ProcessImageResult {
    src: string;
    name: string;
    size: number;
    file: File;
}

export const imageToDataURL = (
    input: FileList | null
): Promise<ProcessImageResult> => {
    return new Promise((resolve, reject) => {
        if (!input) reject({ error: 'Invalid input' });
        try {
            if (input && input[0]) {
                if (input[0].size > 4000000) {
                    const fileSize = Math.round(input[0].size / 10000) / 100;
                    reject({
                        error: `File must be smaller than 4MB, file size is ${fileSize}MB.`,
                    });
                }
                const reader = new FileReader();
                reader.onload = function ({ target }) {
                    if (target) {
                        const result = target?.result as string;
                        resolve({
                            src: result,
                            name: input[0].name,
                            size: input[0].size,
                            file: input[0],
                        });
                    } else {
                        reject({ error: 'Could not read image file' });
                    }
                };
                reader.readAsDataURL(input[0]);
            }
        } catch (error) {
            reject({ error: error.message });
        }
    });
};
