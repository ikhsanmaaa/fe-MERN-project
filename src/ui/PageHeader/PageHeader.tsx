interface PageHeaderProps {
  title: string;
  description?: string;
}
const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold leading-tight text-default-900">
          {title}
        </h1>

        {description && (
          <p className="mt-1 mb-4 text-lg leading-relaxed text-default-500">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};
export default PageHeader;
