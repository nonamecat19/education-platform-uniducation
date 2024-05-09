"use client";
import { CompleteUnit } from "@/lib/db/schema/units";
import { trpc } from "@/lib/trpc/client";
import UnitModal from "./UnitModal";


export default function UnitList({ units }: { units: CompleteUnit[] }) {
  const { data: u } = trpc.units.getUnits.useQuery(undefined, {
    initialData: { units },
    refetchOnMount: false,
  });

  if (u.units.length === 0) {
    return <EmptyState />;
  }

  return (
    <ul>
      {u.units.map((unit) => (
        <Unit unit={unit} key={unit.unit.id} />
      ))}
    </ul>
  );
}

const Unit = ({ unit }: { unit: CompleteUnit }) => {
  return (
    <li className="flex justify-between my-2">
      <div className="w-full">
        <div>{unit.unit.courseId}</div>
      </div>
      <UnitModal unit={unit.unit} />
    </li>
  );
};

const EmptyState = () => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No units
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new unit.
      </p>
      <div className="mt-6">
        <UnitModal emptyState={true} />
      </div>
    </div>
  );
};

