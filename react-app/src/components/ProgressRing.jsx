export const ProgressRing = props => {
  const {
    radius,
    strokeWidth,
    progress,
    stroke = "white",
    trackStroke = "black",
  } = props;

  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke={trackStroke}
        fill="transparent"
        style={{ strokeWidth }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke={stroke}
        fill="transparent"
        strokeDasharray={`${circumference} ${circumference}`}
        style={{ strokeDashoffset, strokeWidth }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
};
