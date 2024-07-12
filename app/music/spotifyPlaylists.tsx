'use client'

import React from 'react';
import IFrame from "@/app/components/review/iframe";

interface SpotifyEmbedProps {
    srcList: string[];
}

const SpotifyEmbed: React.FC<SpotifyEmbedProps> = ({ srcList }) => {
    return (
        <>
            I have wide range of music taste, here are some of my playlists I have created on Spotify:
            <br />
            听歌听的蛮多，类别上不算挑剔，什么好听就听什么，以下是我在Spotify上创建的一些歌单:
            <br/>
            (使用Iframe内嵌，国内用户不一定能加载，抱歉)
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {srcList.map((src, index) => (
                    <IFrame
                        key={index}
                        style={{borderRadius: '12px'}}
                        src={src}
                        width="100%"
                        height="352"
                        allowFullScreen
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                    ></IFrame>
                ))}
            </div>
        </>

    );
};

export default SpotifyEmbed;
