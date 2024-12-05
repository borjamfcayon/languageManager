interface Window {
    confetti: (options: {
        particleCount: number;
        spread: number;
        origin: { y: number; };
    }) => void;
}