"use client";

export default function Loading() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            backgroundColor: '#ffffff',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 9999,
        }}>
            <div className="loader"></div>
            <style jsx>{`
                .loader {
                    width: 48px;
                    height: 48px;
                    border: 3px solid #000;
                    border-bottom-color: transparent;
                    border-radius: 50%;
                    display: inline-block;
                    box-sizing: border-box;
                    animation: rotation 1s linear infinite;
                }
                @keyframes rotation {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
}
