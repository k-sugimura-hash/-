import React from 'react';

export const RadarChart = ({ data }) => {
    const size = 320;
    const center = size / 2;
    const radius = 90;
    const angleSlice = (Math.PI * 2) / data.length;

    const getPoint = (value, index, max) => {
        const r = (value / max) * radius;
        const angle = index * angleSlice - Math.PI / 2;
        return {
            x: center + r * Math.cos(angle),
            y: center + r * Math.sin(angle)
        };
    };

    const points = data.map((d, i) => getPoint(d.value, i, 100)).map(p => `${p.x},${p.y}`).join(' ');
    const bgPoints = data.map((d, i) => getPoint(100, i, 100)).map(p => `${p.x},${p.y}`).join(' ');
    const midPoints = data.map((d, i) => getPoint(50, i, 100)).map(p => `${p.x},${p.y}`).join(' ');

    return (
        <div className="flex flex-col items-center w-full overflow-visible">
            <div className="relative w-full max-w-[320px] aspect-square">
                <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`}>
                    {/* Background Web */}
                    <polygon points={bgPoints} fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
                    <polygon points={midPoints} fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />

                    {/* Axis Lines */}
                    {data.map((d, i) => {
                        const p = getPoint(100, i, 100);
                        return <line key={i} x1={center} y1={center} x2={p.x} y2={p.y} stroke="#e2e8f0" strokeWidth="1" />;
                    })}

                    {/* Data Shape */}
                    <polygon points={points} fill="rgba(99, 102, 241, 0.2)" stroke="#6366f1" strokeWidth="2" />

                    {/* Data Points */}
                    {data.map((d, i) => {
                        const p = getPoint(d.value, i, 100);
                        return <circle key={i} cx={p.x} cy={p.y} r="4" fill="#6366f1" />;
                    })}

                    {/* Labels */}
                    {data.map((d, i) => {
                        const p = getPoint(130, i, 100);
                        return (
                            <text
                                key={i}
                                x={p.x}
                                y={p.y}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="text-sm fill-gray-700 font-bold"
                                style={{ fontSize: '13px' }}
                            >
                                {d.label}
                            </text>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
};
