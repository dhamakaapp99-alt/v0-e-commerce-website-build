export default function Logo({ variant = "full" }) {
  if (variant === "icon") {
    return (
      <div className="flex flex-col items-center gap-1">
        <div className="text-2xl font-bold tracking-widest text-gray-900">MAYRA</div>
        <div className="text-xs italic text-gray-700 tracking-wide">collection</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="text-xs tracking-widest text-gray-600 font-medium">EST. 2023</div>
      <div className="text-3xl font-bold tracking-widest text-gray-900 leading-tight">MAYRA</div>
      <div className="text-sm italic font-light text-gray-700 tracking-wider">collection</div>
    </div>
  )
}
