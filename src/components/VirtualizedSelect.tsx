import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Virtuoso } from "react-virtuoso";
import { SelectOption } from "@/types";
import { ControllerRenderProps } from "react-hook-form";

interface VirtualizedSelectProps {
  options: SelectOption[];
  formField: ControllerRenderProps<{ alertValue: string; stock: string }>;
}

export default function VirtualizedSelect({
  options,
  formField,
}: VirtualizedSelectProps) {
  console.log("💥✨💫🪛🔨💣☕️🧉 ~ formField:", formField);
  return (
    <Select
      {...formField}
      onValueChange={formField.onChange}
      value={formField.value ?? ""}
    >
      <SelectTrigger className="w-full">
        {formField.value ? (
          <span className="capitalize">{formField.value}</span>
        ) : (
          <SelectValue placeholder="Select a stock" />
        )}
      </SelectTrigger>
      <SelectContent className="h-[200px]">
        <Virtuoso
          style={{ height: "100%" }}
          data={options}
          totalCount={options.length}
          itemContent={(_, { value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          )}
        />
        {/* <SelectItem value={"Hola"}>{"Hola"}</SelectItem>
        <SelectItem value={"Mundo"}>{"Mundo"}</SelectItem> */}
      </SelectContent>
    </Select>
  );
}
