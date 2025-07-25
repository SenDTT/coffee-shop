'use client';

import { JSX, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { Season, setSeason } from '../../../store/slices/seasonSlide';

import { Leaf, Snowflake, Flower, Coffee } from 'lucide-react';
import { FaCloudRain } from 'react-icons/fa';

export const seasonIcons: Record<Season, JSX.Element> = {
    spring: <Flower className="w-5 h-5 text-pink-400" />,
    summer: <FaCloudRain className="w-5 h-5 text-white" />,
    autumn: <Leaf className="w-5 h-5 text-orange-500" />,
    winter: <Snowflake className="w-5 h-5 text-blue-400" />,
};

const seasons: Season[] = ['spring', 'summer', 'autumn', 'winter'];

export default function SeasonSwitcher({ mobile = false }: { mobile?: boolean }) {
    const dispatch = useAppDispatch();
    const currentSeason = useAppSelector((state) => state.season.currentSeason);
    const [isOpen, setIsOpen] = useState(false);

    if (mobile) {
        return (
            <ul className="relative inline-flex mt-2 bg-cabin-800 border rounded-xl shadow z-10">
                <li
                    onClick={() => {
                        dispatch(setSeason(""));
                        setIsOpen(false);
                    }}
                    className={`${currentSeason === "" ? 'bg-cabin-700' : ''} w-10 h-10 flex items-center justify-center gap-2 cursor-pointer hover:bg-cabin-700 rounded-full`}
                >
                    <Coffee className="w-5 h-5 text-latte-300" />
                </li>
                {seasons.map((season) => (
                    <li
                        key={season}
                        onClick={() => {
                            dispatch(setSeason(season));
                            setIsOpen(false);
                        }}
                        className={`${currentSeason === season ? 'bg-cabin-700' : ''} w-10 h-10 flex items-center justify-center gap-2 cursor-pointer hover:bg-cabin-700 rounded-full`}
                    >
                        {seasonIcons[season]}
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <div className="relative inline-block">
            <button
                className="p-2 rounded-full hover:bg-cabin-800/10 border border-latte-100"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label="Toggle season menu"
            >
                {currentSeason ? seasonIcons[currentSeason] : (<Coffee className="w-5 h-5 text-latte-300" />)}
            </button>

            {isOpen && (
                <ul className="absolute mt-2 bg-cabin-800 border rounded-xl shadow z-10">
                    <li
                        onClick={() => {
                            dispatch(setSeason(""));
                            setIsOpen(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-cabin-700 rounded-xl"
                    >
                        <Coffee className="w-5 h-5 text-latte-300" />
                    </li>
                    {seasons.map((season) => (
                        <li
                            key={season}
                            onClick={() => {
                                dispatch(setSeason(season));
                                setIsOpen(false);
                            }}
                            className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-cabin-700 rounded-xl"
                        >
                            {seasonIcons[season]}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
