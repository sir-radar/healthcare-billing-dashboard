import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface ProbabilitySliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export function ProbabilitySlider({ label, value, onChange, disabled = false }: ProbabilitySliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium text-neutral-700">{label}</Label>
        <span className="text-sm font-semibold text-neutral-900">{value}%</span>
      </div>
      <Slider
        value={[value]}
        min={0}
        max={100}
        step={1}
        onValueChange={(values) => onChange(values[0])}
        disabled={disabled}
        className="[&_[role=slider]]:bg-primary"
      />
    </div>
  );
}
