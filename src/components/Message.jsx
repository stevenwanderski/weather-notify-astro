export default function Message({ text, onClose }) {
  return (
    <div className="relative bg-green-50 text-sm p-4 mb-10 rounded max-w-[400px]">
      {text}

      <button
        type="button"
        className="absolute top-4 right-4 cursor-pointer"
        onClick={() => onClose()}
      >
        X
      </button>
    </div>
  )
}