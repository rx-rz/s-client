type Props = {
  title: string;
  value: string | undefined;
};
export const DashboardCell = ({ title, value }: Props) => {
  return (
    <div>
      <p className="text-sm font-bold opacity-60 mb-">{title}</p>
      <p className="text-lg font-medium">{value}</p>
    </div>
  );
};
