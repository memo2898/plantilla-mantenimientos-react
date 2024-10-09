/* eslint-disable react/prop-types */
import './CircularLoader.css'; // Asegúrate de crear o actualizar el archivo CSS

function CircularLoader({ size = 100, strokeWidth = 10, color = "#3498db" , className}) {
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Mantén el progreso al 75% para que la barra se vea incompleta y "gire"
  const strokeDashoffset = circumference * 0.25;

  className = className + " circular-progress"
  return (
    <svg width={size} height={size} className={className}>
      <circle
        className="circular-progress-background"
        stroke="#e6e6e6"
        strokeWidth={strokeWidth}
        fill="none"
        cx={center}
        cy={center}
        r={radius}
      />
      <circle
        className="circular-progress-bar"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
        cx={center}
        cy={center}
        r={radius}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
      />
    </svg>
  );
}

export default CircularLoader;
