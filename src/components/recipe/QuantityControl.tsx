import { Minus, Plus } from "lucide-react";

interface QuantityControlProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function QuantityControl({
  quantity,
  onIncrement,
  onDecrement,
}: QuantityControlProps) {
  return (
    <div className="flex items-center border border-input rounded-md overflow-hidden">
      <button
        onClick={onDecrement}
        disabled={quantity <= 1}
        className="p-2 hover:bg-muted transition-colors disabled:opacity-50"
        aria-label="Decrease quantity"
      >
        <Minus size={16} />
      </button>
      <span className="px-4 py-1 border-x border-input">{quantity}</span>
      <button
        onClick={onIncrement}
        className="p-2 hover:bg-muted transition-colors"
        aria-label="Increase quantity"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
