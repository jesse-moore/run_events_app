import React from 'react';
import { EditButton } from './EditButton';
const assetURL = process.env.NEXT_PUBLIC_ASSETS_URL;
interface ViewHeroImage {
    heroImg: string;
    editClickHandler: React.MouseEventHandler;
}

export const ViewHeroImage = ({ heroImg, editClickHandler }: ViewHeroImage) => {
    const src = heroImg ? `${assetURL}${heroImg}` : undefined;
    return (
        <div>
            <div className="w-full max-h-56 overflow-y-auto">
                {src ? <HeroImg src={src} /> : <NoHeroImg />}
            </div>
            <EditButton onClick={editClickHandler} />
        </div>
    );
};

const HeroImg = ({ src }: { src: string }) => {
    return <img src={src} alt="hero image" />;
};

const NoHeroImg = () => {
    return <div className="text-center">---- No Hero Image Selected ----</div>;
};
