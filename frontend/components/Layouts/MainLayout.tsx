"use client";

import Footer from "./Footer";
import Navbar from "./Navbar";
import { Provider } from 'react-redux'
import { store, useAppDispatch, useAppSelector } from '../../store'
import { useContext, useEffect, useMemo, useRef } from "react";
import { fetchUserMe, hydrateFromStorage } from "../../store/slices/auth";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import TransitionContext from '../../context/TransitionContext';
import FallingRain from "../../components/Layouts/Seasons/FallingRain";
import AutumnLeaves from "../../components/Layouts/Seasons/AutumnLeaves";
import WinterSnow from "../../components/Layouts/Seasons/WinterSnow";
import SpringBlossoms from "../../components/Layouts/Seasons/SpringBlossoms";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, ScrollToPlugin, useGSAP);

export default function Layout({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const main = useRef<HTMLElement>(null);
    const { completed } = useContext(TransitionContext);
    const scrollTween = useRef<any>(null);
    const snapTriggers = useRef<ScrollTrigger[]>([]);
    const season = useAppSelector((state) => state.season.currentSeason);
    const { contextSafe } = useGSAP(
        () => {
            if (!completed) return;
            let panels = gsap.utils.toArray('.section-panel'),
                scrollStarts = [0],
                snapScroll = (value: number) => value; // for converting a pixel-based scroll value to the closest panel scroll position

            // create a ScrollTrigger for each panel that's only concerned about figuring out when its top hits the top of the viewport. We'll use the "start" of that ScrollTrigger to figure out snapping positions.
            panels.forEach((panel, i) => {
                snapTriggers.current[i] = ScrollTrigger.create({
                    trigger: panel as HTMLElement,
                    start: "top top"
                });
            });

            // once all the triggers have calculated their start/end, create the snap function that'll accept an overall progress value for the overall page, and then return the closest panel snapping spot based on the direction of scroll
            ScrollTrigger.addEventListener("refresh", () => {
                scrollStarts = snapTriggers.current.map(trigger => trigger.start); // build an Array with just the starting positions where each panel hits the top of the viewport
                snapScroll = ScrollTrigger.snapDirectional(scrollStarts); // get a function that we can feed a pixel-based scroll value to and a direction, and then it'll spit back the closest snap position (in pixels)
            });

            ScrollTrigger.observe({
                type: "wheel,touch",
                onChangeY(self) {
                    if (!scrollTween.current) {
                        // find the closest snapping spot based on the direction of scroll
                        let scroll = snapScroll(self.scrollY() + self.deltaY);
                        goToSection(scrollStarts.indexOf(scroll)); // scroll to the index of the associated panel
                    }
                }
            })

            ScrollTrigger.refresh();
        },
        {
            dependencies: [completed],
            scope: main,
            revertOnUpdate: true,
        }
    );

    const goToSection = contextSafe((i: number) => {
        console.log("scroll to", i);
        scrollTween.current = gsap.to(window, {
            scrollTo: { y: snapTriggers.current[i].start, autoKill: false },
            duration: 1,
            onComplete: () => (scrollTween.current = null),
            overwrite: true
        });
    });

    useEffect(() => {
        if (!user && localStorage.getItem('auth')) {
            dispatch(hydrateFromStorage());
        }
    }, [user, dispatch]);

    useEffect(() => {
        dispatch(fetchUserMe())
    }, [dispatch]);

    const seasonLayout = useMemo(() => {
        switch (season) {
            case 'summer':
                return <FallingRain count={80} />;
            case 'autumn':
                return <AutumnLeaves />;
            case 'winter':
                return <WinterSnow />;
            case 'spring':
                return <SpringBlossoms />;
            default:
        }
    }, [season]);

    return (
        <Provider store={store}>
            {/* Season Layout */}
            {seasonLayout}
            <Navbar />
            <div className="bg-coffee/10">
                <main ref={main}>{children}</main>
            </div>
            <Footer />
        </Provider>
    );
}
