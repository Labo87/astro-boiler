import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

export default class Animations {
    constructor() {
        gsap.registerPlugin(ScrollTrigger);
        let typeSplit = new SplitType('[text-split]', {
            types: 'words, chars',
            tagName: 'span',
        });

        const tl = gsap.timeline({
            defaults: { ease: 'Power3.easeInOut' },
        });

        // tl.fromTo(
        //     'h2',
        //     {
        //         xPercent: 0,
        //     },
        //     {
        //         xPercent: 200,

        //         duration: 1,

        //         scrollTrigger: {
        //             scroller: '[data-scroll-container]',
        //             trigger: '.test2',
        //             start: 'top 75%',
        //             end: 'bottom center',

        //             scrub: 1,
        //         },
        //     }
        // );

        const slideUp = document.querySelectorAll('[words-slide-up]');

        slideUp.forEach((element) => {
            const word = element.getElementsByClassName('word');

            gsap.from(word, {
                opacity: 0,
                duration: 1,
                yPercent: 120,
                stagger: { amount: 1 },

                scrollTrigger: {
                    scroller: '[data-scroll-container]',
                    trigger: word,
                    start: 'top 75%',
                    end: 'bottom center',

                    scrub: 1,
                },
            });
        });
        // ScrollTrigger.create({
        //     scroller: '[data-scroll-container]',
        //     trigger: word,
        //     start: 'top 50%',
        //     // onEnter: tl.play(),
        //     // onLeave: tl.reverse(),
        // });
    }
}
