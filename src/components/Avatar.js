export default function Avatar({ userName }) {
  const arr = userName.split(" ");
  const initials = arr
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div className="avatar">
      {initials}
      <div className="online" />
    </div>
  );
}
