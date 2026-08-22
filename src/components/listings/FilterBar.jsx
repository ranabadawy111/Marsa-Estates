import { Search } from "lucide-react";
import Input from "../ui/Input";
import Select from "../ui/Select";
import { allNeighborhoods, allTypes } from "../../data/mockDb";

const purposeOptions = [
  { value: "all", label: "For sale or rent" },
  { value: "sale", label: "For sale" },
  { value: "rent", label: "For rent" },
];

const typeOptions = [
  { value: "all", label: "All types" },
  ...allTypes.map((t) => ({ value: t, label: t })),
];

const neighborhoodOptions = [
  { value: "all", label: "All neighborhoods" },
  ...allNeighborhoods.map((n) => ({ value: n, label: n })),
];

const sortOptions = [
  { value: "newest", label: "Newest first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

export default function FilterBar({ filters, onChange }) {
  function update(key, value) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <div className="flex flex-col lg:flex-row gap-3">
      <div className="flex-1 min-w-[200px]">
        <Input
          icon={Search}
          placeholder="Search by name or neighborhood…"
          value={filters.search}
          onChange={(e) => update("search", e.target.value)}
        />
      </div>
      <Select
        options={purposeOptions}
        value={filters.purpose}
        onChange={(e) => update("purpose", e.target.value)}
      />
      <Select
        options={typeOptions}
        value={filters.type}
        onChange={(e) => update("type", e.target.value)}
      />
      <Select
        options={neighborhoodOptions}
        value={filters.neighborhood}
        onChange={(e) => update("neighborhood", e.target.value)}
      />
      <Select
        options={sortOptions}
        value={filters.sort}
        onChange={(e) => update("sort", e.target.value)}
      />
    </div>
  );
}
