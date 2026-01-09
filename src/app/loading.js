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

        </div>
    );
}
