import LocomotiveScroll from 'locomotive-scroll';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Animations from './animations/animations';
import BgColorChange from './animations/bgColorChange';

console.log('Hello');

const main = () => {
    window.addEventListener('load', () => {
        gsap.registerPlugin(ScrollTrigger);

        const pageContainer = document.querySelector('.container');
        pageContainer.setAttribute('data-scroll-container', '');

        const scroller = new LocomotiveScroll({
            el: pageContainer,
            smooth: true,
            getDirection: true,
            lerp: 0.05,
            mobile: {
                smooth: true,
            },
            tablet: {
                smooth: true,
            },
        });

        scroller.on('scroll', function (t) {
            document.documentElement.setAttribute(
                'data-direction',
                t.direction
            );
        });

        scroller.on('scroll', ScrollTrigger.update);

        ScrollTrigger.scrollerProxy(pageContainer, {
            scrollTop(value) {
                return arguments.length
                    ? scroller.scrollTo(value, 0, 0)
                    : scroller.scroll.instance.scroll.y;
            },
            getBoundingClientRect() {
                return {
                    left: 0,
                    top: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
            pinType: pageContainer.style.transform ? 'transform' : 'fixed',
        });

        let targetScrollY = 0;
        let currentScrollY = 0;
        let scrollOffset = 0;

        const lerp = (start, end, multiplier) => {
            return (1 - multiplier) * start + multiplier * end;
        };

        // const updateScroll = () => {
        //     scroller.on('scroll', function (e) {
        //         targetScrollY = e.delta.y;
        //         currentScrollY = e.scroll.y;
        //         currentScrollY = lerp(currentScrollY, targetScrollY, 0.1);

        //         scrollOffset = targetScrollY - currentScrollY;
        //     });
        // };

        /* ANIMATIONS */
        new Animations();

        /* COLOR CHANGER */
        new BgColorChange();

        ScrollTrigger.addEventListener('refresh', () => scroller.update());
        ScrollTrigger.refresh();
        // updateScroll();
    });
};
main();
