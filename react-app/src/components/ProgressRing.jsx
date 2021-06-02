export const ProgressRing = props => {
  const { radius, strokeWidth, progress, stroke = "white" } = props;

  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke={stroke}
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
        style={{ strokeDashoffset }}
        stroke-width={strokeWidth}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
};
