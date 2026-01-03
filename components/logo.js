export default function Logo({ variant = "full" }) {
  if (variant === "icon") {
    return (
      <div className="flex flex-col items-center leading-none select-none">
        <span className="text-[17px] font-medium tracking-[0.5em] text-[#111]">
          MAYRA
        </span>
        <span className="mt-0.5 text-[8px] font-light tracking-[0.45em] text-[#777] uppercase">
          collection
        </span>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center leading-none select-none">
      <span className="text-[30px] md:text-[34px] font-medium tracking-[0.6em] text-[#111]">
        MAYRA
      </span>
      <span className="mt-1 text-[10px] font-light tracking-[0.45em] text-[#777] uppercase">
        collection
      </span>
    </div>
  )
}
