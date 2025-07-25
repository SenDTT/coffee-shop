'use client';

import { Coffee, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const fullContent = `
Brewing Vietnamese coffee with a phin filter is a relaxing and rewarding process.
Start by adding 25g of medium-fine ground coffee into the phin filter.
Slowly pour in 30ml of hot water (about 95°C) and let the coffee bloom for 30 seconds.

This blooming stage is important as it allows the coffee to release trapped gases, enhancing the flavor.
After that, pour in 70ml more hot water and let it drip through slowly — this should take about 4–5 minutes.

Once the dripping has stopped, you can enjoy it as is, or add ice for a refreshing drink or condensed milk for a traditional cà phê sữa đá.

Tip: Always pre-warm your cup to maintain temperature and stir gently before drinking.
`;

export default function HowToBrewDescription() {
    const [expanded, setExpanded] = useState(false);

    const shortContent = fullContent.split('\n').slice(0, 2).join('\n');

    return (
        <section className='section-full-width border-b border-cabin-500'>
            <div className="container mx-auto px-4 py-12 text-cabin-800">
                <div className="flex items-center gap-2 mb-4">
                    <Coffee className="w-5 h-5 text-cabin-800" />
                    <h2 className="text-2xl font-bold">How to Brew</h2>
                </div>

                <p className="whitespace-pre-line text-base leading-relaxed">
                    {expanded ? fullContent : shortContent}
                </p>

                <button
                    onClick={() => setExpanded(!expanded)}
                    className="mt-4 flex items-center gap-1 text-sm font-medium text-cabin-800 hover:underline"
                >
                    {expanded ? (
                        <>
                            See less <ChevronUp className="w-4 h-4" />
                        </>
                    ) : (
                        <>
                            See more <ChevronDown className="w-4 h-4" />
                        </>
                    )}
                </button>
            </div>
        </section>
    );
}
